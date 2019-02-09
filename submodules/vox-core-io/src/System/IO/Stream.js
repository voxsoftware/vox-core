var Stream;
var notSuported=Error;
var oneBuffer=Buffer.allocUnsafe(1);

// Abstract class
Stream=module.exports=function(){
}

Stream.prototype.close= function(){
}


Stream.prototype.__defineGetter__("canRead",function(){
	return false;
});

Stream.prototype.__defineGetter__("canWrite",function(){
	return false;
});

Stream.prototype.__defineGetter__("canSeek",function(){
	return false;
});

Stream.prototype.__defineGetter__("length",function(){
	return 0;
});

Stream.prototype.__defineGetter__("position",function(){
	return 0;
});
Stream.prototype.__defineSetter__("position",function(val){

});



Stream.prototype.copyTo =function(/* Stream */ dest, /* [optional] int */ bufferSize){
	bufferSize=bufferSize|0;
	if(!bufferSize){
		bufferSize=81920;
	}
	if(!dest.canWrite){
		throw new notSuported("El stream destino no soporta escritura");
	}
	this._internalCopy(dest,bufferSize);
}

Stream.prototype.copyToAsync =function(/* Stream */ dest, /* [optional] int */ bufferSize){
	bufferSize=bufferSize|0;
	if(!bufferSize){
		bufferSize=4096*12;
	}
	if(!dest.canWrite){
		throw new notSuported("El stream destino no soporta escritura");
	}
	return this._internalCopyAsync(dest,bufferSize);
}

Stream.prototype._internalCopy=function(dest,bufferSize){
	var buffer=new Buffer(bufferSize);
	var readed=0
	while((readed=this.read(buffer, 0, bufferSize))>0){
		dest.write(buffer,0,readed)
	}
}

Stream.prototype._internalCopyAsync=function(dest,bufferSize){
	var buffer=new Buffer(bufferSize);
	var readed=0
	/*while((readed=this.read(buffer, 0, bufferSize))>0){
		dest.write(buffer,0,readed)
	}*/

	var context= {
		task: null,
		step:0
	}
	var src= this, call, readed
	var awaitTask= function(task){
		if(!task)
			call()
		else{
			//task.oncomplete= call
			if(task instanceof core.VW.Task)
				task.oncomplete= call
			else{
				task.then(function(d){
					task.result= d
					call()
				})
				task.catch(function(er){
					task.exception= er
					call()
				})
			}

		}
	}

	var task= new core.VW.Task()
	call= function(){

		if(context.task && context.task.exception){
			task.exception= context.task.exception
			task.finish()
			return
		}

		if(context.task){
			context.value= context.task.result
			context.task=undefined
		}

		switch(context.step){
			case 0:
				context.task= src.readAsync(buffer,0,bufferSize)
				context.step=1
				awaitTask(context.task)
				break
			case 1:
				readed= context.value
				if(readed<=0)
					context.step=-1
				else{
					context.task= dest.writeAsync(buffer,0,readed)
					context.step=0
				}
				awaitTask(context.task)
				break
			case -1:
				task.finish()
				break

		}
	}

	call()
	return task

}


Stream.prototype.flush =function(){
}


/** @return int */
Stream.prototype.read=function(/* Buffer */ bytes, /* int */offset, /* int */count){
	return 0;
}


Stream.prototype.readAsync=function(/* Buffer */ bytes, /* int */offset, /* int */count){
}



/** @return int */
Stream.prototype.readByte=function(){
	if(this.read(oneBuffer,0,1)==0){
		return -1;
	}
	return oneBuffer[0]|0;
}


Stream.prototype.seek =function(/* long */offset, /* SeekOrigin */ origin){
}


Stream.prototype.setLength=function(/* long */value){
}

Stream.prototype.write =function(/* Buffer */ bytes, /* int */offset, /* int */ count){
}

Stream.prototype.writeAsync=function(/* Buffer */ bytes, /* int */offset, /* int */count){
}


Stream.prototype.writeByte =function(/* int (byte) */ value){
	oneBuffer.writeUInt8(value,0);
	this.write(oneBuffer, 0,1);
}

Stream.prototype.writeByteAsync =function(/* int (byte) */ value){
	oneBuffer.writeUInt8(value,0);
	return this.writeAsync(oneBuffer, 0,1);
}
