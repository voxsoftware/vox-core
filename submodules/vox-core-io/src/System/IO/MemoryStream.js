var Stream=require("./Stream.js");
var Memory;
var fs= require("fs");
var bufferSize=1024;
var zero=new Buffer(0);


// Esta implementación es diferente a la de C#
// En c# se crea un nuevo buffer y se copia el anterior
// cuando se expande la capacidad
// Acá en cambio se crean varios Buffers



Memory=module.exports=function(/* [optional] int capacity o , [optional] Buffer bytes, [optional] bool writable o [optional]int 		index, [optional] int count, [optional] bool writable, [optional] bool publiclyVisible*/){
	Stream.call(this);
	var bytes=null,index=0,count;

	
	if(arguments.length==1){
		if(Buffer.isBuffer(arguments[0])){
			bytes=arguments[0];
			count= bytes.length;
		}
		else{
			this.$capacity=arguments[0]|0;
			bytes= new Buffer(this.$capacity);
		}
	}
	else if(arguments.length>=1){
		if(Buffer.isBuffer(arguments[0])){
			bytes=arguments[0];
			count= bytes.length;
		}
		else{
			throw new Error("Los argumentos son inválidos");
		}
	}


	if(arguments.length>=2){
		if(typeof arguments[1]=="boolean"){
			this.$write=arguments[1];
		}
		else{
			index= arguments[1]|0;
			count= arguments[2]|0;

			if(arguments.length>=4){
				this.$write=!!arguments[3];
			}
			if(arguments.length>=5){
				this.$exposable=!!arguments[4];
			}
		}
	}

	if(this.$write==undefined){
		this.$write=true;
	}
	if(this.$exposable==undefined){
		this.$exposable=true;
	}

	this.$bytes=bytes;
	this.$position= index;
	if(this.$bytes){
		this.$bytes.$position=this.$position;
	}
	this.$origin= index;
	this.$capacity=this.$capacity|0;
	if(count!=undefined){
		this.$length= this.$capacity= index+count;
	}
	else{
		this.$length=index;
	}
	this.$seek= true;

}


Memory.prototype = Object.create(Stream.prototype);
Memory.prototype.__proto__=Stream.prototype


Memory.prototype.close= function(){

	//fs.closeSync(this.$fd);
	this.$read=false;
	this.$write=false;
	this.$seek=false;
	this.$disposed= true;
	//this.$fd=undefined;
	this.$bytes=null;
}



/** @return int */
Memory.prototype.read=function(/* Buffer */ bytes, /* int */offset, /* int */count){
	if(count==0){
		return;
	}


	if(!this.$bytes){
		throw new Error("La cantidad de bytes supera el límite del Stream");
	}

	if(this.$position + count > this.$length){
		count= this.$length-this.$position;
	}

	var num= this.$position+count;
	var target= this.$position-this.$bytes.$position;
	var cbytes,copied=0;
	while(count>0){
		if(!cbytes){
			cbytes=this.$bytes;
		}
		else{
			cbytes= this._getnext(cbytes, this.$position +copied, count);
			target=0;
		}
		var len= cbytes.length-target;
		var tocopy=Math.min(len, count);

		copied+= cbytes.copy(bytes, offset, target, target+tocopy);
		count-=tocopy;
		offset+=tocopy;
	}

	if(cbytes){
		this.$bytes= cbytes;
	}
	this.$position=num;
	return copied;

}



Memory.prototype.readAsync=function(/* Buffer */ bytes, /* int */offset, /* int */count,/* function */ callback){
	var task= new core.VW.Task()
	var self=this
	setImmediate(function(){
		try{
			task.result= self.read(bytes,offset,count)
		}
		catch(e){
			task.exception= e
		}
		task.finish()
	});
	return task
}


Memory.prototype._getnext= function(bytes,position,count){
	if(bytes.next){
		return bytes.next;
	}
	else{

		var len=Math.max(count,bufferSize);
		var cbyte= new Buffer(len);
		cbyte.$position= position;
		this.$capacity+=len;
		cbyte.prev= bytes;
		bytes.next=cbyte;
		return cbyte;

	}
}



/** @return int */
Memory.prototype.write=function(/* Buffer */ bytes, /* int */offset, /* int */count){
	var num= this.$position+count;
	if(!this.$bytes){
		var len=Math.max(count,bufferSize);
		this.$bytes= new Buffer(len);
		this.$bytes.$position=this.$position;
		this.$capacity+= len;
	}



	target= this.$position-this.$bytes.$position;
	var cbytes,copied=0;
	while(count>0){
		if(!cbytes){
			cbytes=this.$bytes;
		}
		else{

			cbytes= this._getnext(cbytes, this.$position +copied, count);
			target=0;
		}
		var len= cbytes.length-target;
		var tocopy=Math.min(len, count);


		copied+= bytes.copy(cbytes,target, offset, tocopy);
		count-=tocopy;

	}

	if(cbytes){
		this.$bytes= cbytes;
	}
	this.$position=num;
	if(num>this.$length){
		this.$length=this.$position;
	}

	return copied;
}




Memory.prototype.writeAsync=function(/* Buffer */ bytes, /* int */offset, /* int */count,/* function */ callback){
	


	var task= new core.VW.Task()
	var self= this
	setImmediate(function(){
		try{
			task.result= self.write(bytes,offset,count)
		}
		catch(e){
			task.exception= e
		}
		task.finish()
	});
	return task
}


Memory.prototype.seek=function(/* long */ offset, /* SeekOrigin */origin){
	origin=origin|0;
	var pos= origin==0?offset:(origin==1?this.$position+offset: (origin==2 ? this.$length-offset: this.$position));
	if(origin!=2){
		pos= this.$origin+pos;
	}

	if(pos>this.$capacity){
		if(!this.$write){
			throw new Error("La posición está más allá del límite del stream");
		}
		this._setcapacity(pos);
	}


	var last, next=this.$bytes;
	if(next.$position>pos){
		while(next && next.$position>pos){
			next= next.prev;
			last=next;
		}
	}
	else if(next.$position<pos){
		while(next && next.$position<pos){
			last=next;
			next= next.next;
		}
	}
	else{
		last=this.$bytes;
	}
	this.$bytes= last;
	this.$position= pos;
	return pos;
}

Memory.prototype._getbuffer=function(value){
	if(!this.$bytes){
		return;
	}

	var first= this.$bytes;
	if(!first.next && !first.prev){
		return;
	}
	var prev=first;
	while(prev=prev.prev){
		first=prev;
	}


	//vw.log(first);
	//var len= this.length;
	var buf= new Buffer(this.capacity);
	var pos=0;
	while(first){
		var endpos=first.length;
		if(!first.next){
			var ll=first.$position + first.length;
			endpos= Math.min(ll,this.$length)-first.$position;
		}
		pos+=first.copy(buf,pos, 0, endpos);
		first=first.next;
	}
	buf.$position=0;
	var ori= this.$origin;
	this.$bytes= buf;
	this.$origin= 0;
	this.$length-= ori;
	this.$position-= ori;
	this.$capacity= buf.length;
}


Memory.prototype.getBuffer=function(value){
	if(!this.$exposable){
		throw new Error("No se puede obtener el buffer de este Stream");
	}

	this._getbuffer();
	if(!this.$bytes){
		return zero;
	}

	return this.$bytes.slice(this.$origin, this.$length);
}


Memory.prototype.toArray=function(){

	if(!this.$bytes){
		return zero;
	}

	this._getbuffer();
	var buf= new Buffer(this.length);

	this.$bytes.copy(buf,0,this.$origin,this.$length);
	return buf;
}



Memory.prototype._setcapacity=function(value){
	var dif= this.$capacity-value;
	if(dif<=0){
		return;
	}

	if(!this.$bytes){
		var len=Math.max(dif,bufferSize);
		this.$bytes= new Buffer(len);
		this.$bytes.$position=this.$position;
	}
	else{
		var last=this.$bytes;
		var next;
		while(next=this.$bytes.next){
			last=next;
		}
		var len=Math.max(dif,bufferSize);
		cbytes= new Buffer(len);
		cbytes.$position=last.$position+last.length;
		cbytes.prev=last;
		last.next=cbytes;
	}

	return this.$capacity= value;
}

Memory.prototype.writeTo= function(/* Stream */stream){
	this._getbuffer();
	if(!this.$bytes){
		return;
	}
	if(!(stream instanceof Stream)){
		throw new Error("ArgumentError");
	}
	stream.write(this.$bytes,this.$origin, this.$length-this.$origin);
}


Memory.prototype.setLength= function(/*  long */length){
	if(!this.$seek){
		throw new Error("El flujo no soporta posiciones");
	}
	//throw new Error("No implementado aún");
	this.$bytes= new Buffer(bufferSize)
	this.$position=0
	this.$origin=0
	this.$length=0
}


Memory.prototype.__defineGetter__("canRead",function(){
	return this.$read;
});

Memory.prototype.__defineGetter__("canWrite",function(){
	return this.$write;
});

Memory.prototype.__defineGetter__("canSeek",function(){
	return this.$seek;
});

Memory.prototype.__defineGetter__("length",function(){
	return this.$length-this.$origin;
});

Memory.prototype.__defineGetter__("capacity",function(){
	return this.$capacity-this.$origin;
});

Memory.prototype.__defineSetter__("capacity",function(val){
	return this._setcapacity(val);
});



Memory.prototype.__defineGetter__("position",function(){
	return this.$position-this.$origin;
});
Memory.prototype.__defineSetter__("position",function(val){
	return this.seek(val,0);
});
