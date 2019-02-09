
/** 
* @author James Suárez
* VcfStream es una clase diseñada para la lectura de archivos comprimidos en el formato Vcf
* Debido a que Vcf no es un formato optimizado para la rápida escritura, más bien
* es un formato optimizado para ocupar poco espacio 
* VcfStream es un Stream de solo lectura
*
* Se utilizará para implementar Resources más adelante
*
*/



var IO= core.System.IO;
var VcfStream= module.exports= function(/* Vcf*/ vcf, /* string */file){
	
	this.$vcf= vcf;
	file.update();
	var file= this.$filedef= vcf.$files[file]; 
	this.$offset= file.dataoffset;
	this.$stream= this.$vcf.stream;
	this.$stream.position= this.$offset;
	var compression=this.$stream.readByte();
	if(compression+0==0){
		this.$offset+=1;
		this.$length= file.datalength-1;
		this.$withparent=true;
	}
	else{
		// tiene que leer todo el archivo
		this.$stream=null;
		this.$stream= new IO.MemoryStream(vcf.read(file));
		this.$offset=0;
		this.$length=this.$stream.length;
	}

}


VcfStream.prototype = Object.create(IO.Stream.prototype);
VcfStream.prototype.__proto__=IO.Stream.prototype


VcfStream.prototype.close= function(){
	if(!this.$withparent){
		this.$stream.close();
	}

	this.$stream=null;
	this.$filedef=null;
	this.$vcf=null;
}






/** @return int */
VcfStream.prototype.read=function(/* Buffer */ bytes, /* int */offset, /* int */count){
	this.$stream.position= this.$offset+this.$position;
	return this.$stream.read(bytes, offset, count);
}



VcfStream.prototype.readAsync=function(/* Buffer */ bytes, /* int */offset, /* int */count,/* function */ callback){
	setImmediate(function(){
		try{
			callback(undefined,this.read(bytes,offset,count));
		}
		catch(e){
			callback(e);
		}
	});
}




/** @return int */
VcfStream.prototype.write=function(/* Buffer */ bytes, /* int */offset, /* int */count){
	throw new core.System.IO.IOException("La sequencia no admite escritura");
}




VcfStream.prototype.writeAsync=function(/* Buffer */ bytes, /* int */offset, /* int */count,/* function */ callback){
	setImmediate(function(){
		try{

			callback(undefined,this.write(bytes,offset,count));
		}
		catch(e){
			callback(e);
		}
	});
}


VcfStream.prototype.seek=function(/* long */ offset, /* SeekOrigin */origin){
	origin=origin|0;
	return this.$position= origin==0?offset:(origin==1?this.$position+offset: (origin==2 ? this.$length-offset: this.$position));
}






VcfStream.prototype.writeTo= function(/* Stream */stream){

	if(!(stream instanceof Stream)){
		throw new Error("ArgumentError");
	}
	this.$stream.writeTo(stream);
}


VcfStream.prototype.setLength= function(/*  long */length){
	throw new core.System.IO.IOException("La sequencia no admite escritura");
}


VcfStream.prototype.__defineGetter__("canRead",function(){
	return true;
});

VcfStream.prototype.__defineGetter__("canWrite",function(){
	return false;
});

VcfStream.prototype.__defineGetter__("canSeek",function(){
	return true;
});

VcfStream.prototype.__defineGetter__("length",function(){
	return this.$length;
});





VcfStream.prototype.__defineGetter__("position",function(){
	return this.$position;
});
VcfStream.prototype.__defineSetter__("position",function(val){
	return this.seek(val,0);
});


