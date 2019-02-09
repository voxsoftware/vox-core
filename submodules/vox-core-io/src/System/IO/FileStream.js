//var Stream=require("./Stream.js");
var System=core.System;
var Stream= System.IO.Stream
var FileStream;
var fs= require("fs");
var Path= require("path");



FileStream=module.exports=function(/* string */file, /* FileMode */fileMode,  /* FileAccess */ fileAccess){
	Stream.call(this);
	if(arguments.length<3){
		fileAccess=fileMode==6?2:3
	}

	var append


	append= fileMode==6;
	if(fileMode==2 || fileMode==1){
		fs.closeSync(fs.openSync(file,"wx"));
	}
	else if(fileMode==4 || fileMode==5){
		if(fileMode==5 || !fs.existsSync(file)){
			fs.closeSync(fs.openSync(file,"w+"));
		}
	}

	if(fileAccess==1){
		this.$fd= fs.openSync(file,"r");
		this.$read=true;
	}
	else if(fileAccess==2||fileAccess==3){
		this.$fd= fs.openSync(file,"r+");
		this.$read=true;
		this.$write=true;
		if(fileAccess==2){
			this.$read=false;
		}
	}

	this.$position=0;
	this.$seek=true;
	this.$file=file;

	if(fileMode==5){
		fs.truncateSync(this.$fd);
	}
}


FileStream.prototype = Object.create(Stream.prototype)
Object.setPrototypeOf ? Object.setPrototypeOf(FileStream, Stream) :
	FileStream.__proto__ = Stream;
//FileStream.prototype.__proto__=Stream.prototype

FileStream.prototype.close= function(){

	fs.closeSync(this.$fd);
	this.$read=false;
	this.$write=false;
	this.$seek=false;
	this.$disposed= true;
	this.$fd=undefined;
}


var locks={}
var locktimerefresh= 2000

var finalizeLock= function(lock, task, err){

	if(err){
		task.exception= err
		task.finish()

		while(task= lock.pending.shift()){
			task.exception= err
			task.finish()
		}
		return
	}

	lock.toLock=lock.toLock||[]
	var d= new Date()

	fs.futimes(lock.fd, d,d,function(err){
		if(err){
			return finalizeLock(lock, task, err)
		}
		lock.lasttime= d.getTime()

		var l=lock.pending.length
		for(var i=0;i<l;i++){
			lock.toLock.push(lock.pending.shift())
		}

		lock.adquired= true
		lock.adquiring= false

		if(lock.timeout){
			clearTimeout(lock.timeout)
			lock.timeout=undefined
		}

		var j

		if(!lock.update){
			lock.update= function(){
				d= new Date()
				fs.futimes(lock.fd, d,d,function(err){
					lock.lasttime= d.getTime()
					j()
				})
			}
		}


		j= function(){
			lock.timeout= setTimeout(function(){
				lock.update()
			}, 1000)
			lock.timeout.unref()
		}
		j()

		task.finish()

	})

}

FileStream.prototype.lock= function(){
	throw new core.System.NotImplementedException()
}

FileStream.prototype.lockAsync= function(){

	if(!this.$rfile)
		this.$rfile= Path.normalize(this.$file)

	var l= locks[this.$rfile],self= this
	var file2= this.$file +".lock"
	if(!l){
		l=locks[this.$rfile]= {
			adquired:false,
			file: this.$rfile,
			lockfile: file2,
			pending: []
		}
	}

	var task= new core.VW.Task()
	if(l.adquiring){
		l.pending.push(task)
		return task
	}

	if(l.adquired){
		l.toLock.push(task)
		return task
	}

	l.adquiring= true
	l.fd= this.$fd

	if(l.deleting){

		// Mientras l.deleting sea diferente de undefined ...
		// Otro proceso no cogerá el bloqueo porque
		// el atime del archivo sigue siendo reciente ....
		// por lo tanto se puede asumir que este proceso continúa con el bloqueo
		clearTimeout(l.deleting)
		l.deleting= undefined
		l.adquiring=false
		l.adquired= true
		setImmediate(function(){
			task.finish()
		})
		return task
	}



	fs.mkdir(file2, function(err){
		if (!err) {
            return finalizeLock(l, task)
        }
        // If error is not EEXIST then some other error occurred while locking
        if (err.code !== 'EEXIST') {
            return finalizeLock(l, task, new core.System.IO.IOException(err.message||err.toString(), err))
        }
        var retry= 150
        var wait= function(){
        	fs.fstat(l.fd, function(err, stat){
        		var time= stat.atime.getTime()
        		if(time>= (new Date().getTime() - locktimerefresh)){
        			retry--
        			if(retry<0)
        				return finalizeLock(l, task, new core.System.IO.IOException("El archivo está bloqueado"))

        			setTimeout(wait, 100)
        		}
        		else{

        			try{
        				fs.mkdirSync(file2)
        			}catch(e){
        				if (e.code !== 'EEXIST') {
				            return finalizeLock(l, task, new core.System.IO.IOException(e.message||e.toString(), e))
				        }
        			}
        			return  finalizeLock(l, task)
        		}
        	})
        }
        wait()
	})
	return task

}

FileStream.prototype.unlockAsync= function(){
	var task=new core.VW.Task(),self=this
	setImmediate(function(){
		self.unlock()
		task.finish()
	})
	return task

}

FileStream.prototype.unlock= function(){
	var l= locks[this.$rfile]
	if(!l || !l.adquired)
		return


	if(l.adquired){
		var task2= l.toLock.shift()

		if(task2){
			setImmediate(function(){
				task2.finish()
			})
		}
		else{
			l.adquired= false

			// Actualizar a un tiempo bajo ...
			//var d= (Date.now() - 4000) /1000
			//fs.futimesSync(l.fd, d,d)
			//fs.rmdirSync(l.lockfile)

			l.deleting= setTimeout(function(){
				clearTimeout(l.timeout)
				l.timeout= undefined
				l.deleting=undefined
				try{
					fs.rmdirSync(l.lockfile)
				}catch(e){}
			},10)



		}
	}
}



/** @return int */
FileStream.prototype.read=function(/* Buffer */ bytes, /* int */offset, /* int */count){
	if(!this.$read){
		return new Error("No se puede leer sobre este Stream");
	}
	offset=offset|0;
	count=count|0;
	var num= fs.readSync(this.$fd,bytes,offset,count,this.$position);
	this.$position+= num;
	return num;
}



FileStream.prototype.readAsync=function(/* Buffer */ bytes, /* int */offset, /* int */count,/* function */ callback){
	if(!this.$read){
		throw  new Error("No se puede leer sobre este Stream");
	}
	offset=offset|0;
	count=count|0;
	var task= new core.VW.Task()
	var self= this
	fs.read(this.$fd,bytes,offset,count,this.$position,function(er, bytesreaded){


		if(er)
			task.exception=er
		else{
			self.$position+=bytesreaded;
			task.result= bytesreaded
		}
		task.finish()

	});
	return task
}


/** @return int */
FileStream.prototype.write=function(/* Buffer */ bytes, /* int */offset, /* int */count){
	if(!this.$write){
		return new Error("No se puede escribir sobre este Stream");
	}
	offset=offset|0;
	count=count|0;

	var num= fs.writeSync(this.$fd,bytes,offset,count,this.$position);
	this.$position+= num;
	return num;
}



FileStream.prototype.writeAsync=function(/* Buffer */ bytes, /* int */offset, /* int */count,/* function */ callback){
	if(!this.$write){
		throw new Error("No se puede escribir sobre este flujo");
	}
	offset=offset|0;
	count=count|0;
	var task= new core.VW.Task()
	var self= this
	fs.write(this.$fd,bytes,offset,count,this.$position,function(er, writed){


		if(er)
			task.exception=er
		else{
			self.$position+=writed;
			task.result= writed
		}
		task.finish()


	});
	return task
}


FileStream.prototype.seek=function(/* long */ offset, /* SeekOrigin */origin){
	origin=origin|0;
	return this.$position= origin==0?offset:(origin==1?this.$position+offset: (origin==2 ? this.length-offset: this.$position));
}


FileStream.prototype.setLength= function(/*  long */length){
	if(!this.$seek){
		throw new Error("El flujo no soporta posiciones");
	}
	//throw new Error("No implementado aún");

	fs.ftruncateSync(this.$fd, length)
}


FileStream.prototype.__defineGetter__("canRead",function(){
	return this.$read;
});

FileStream.prototype.__defineGetter__("canWrite",function(){
	return this.$write;
});

FileStream.prototype.__defineGetter__("canSeek",function(){
	return this.$seek;
});

FileStream.prototype.__defineGetter__("length",function(){
	var stat=fs.fstatSync(this.$fd);
	return stat.size;
});

FileStream.prototype.__defineGetter__("position",function(){
	return this.$position;
});
FileStream.prototype.__defineSetter__("position",function(val){
	//vw.log(typeof val);
	if(typeof val!="number"){
		throw new System.ArgumentException("Debe ser un número");
	}
	this.$position=val;
});
;
