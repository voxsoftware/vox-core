

/*
VCF
VW Compressed Format
*/


var zeroBuffer= new Buffer(0)
var b1= new Buffer(48 * 1024);
var tStream=function(stream){
	this.$buf=b1;
	this.$stream= stream;
	this.$offset=0;
}
tStream.prototype.writeByte=function(value){
	this.$buf[this.$offset]=value;
	this.$offset++;
	if(this.$offset>=this.$buf.length){
		this.flush();
	}
}
tStream.prototype.flush=function(){
	if(this.$offset<1){
		return;
	}
	this.$stream.write(this.$buf,0,this.$offset);
	this.$offset=0;
}



//var lzma= require("lzma-purejs")
var Compress= require("compressjs");
// lzma=lzma.Bzip2;
//var admzip= require("adm-zip")




var Path= require("path");
var System=core.System;
var VW=core.VW;
var Vcf=module.exports=function(/* Stream*/ stream, /* VcfCompression*/compression){
	this.$stream= stream;
	this.$tstream=new tStream(stream);
	this.$breader=new System.IO.BinaryReader(stream);
	this.$bwriter=new System.IO.BinaryWriter(stream);

	this.$compression=compression|| Vcf.defaultCompression;
	this.$alg= this.getAlgorithm(this.$compression);

	if(this.$stream.length>0){
		var buf=this.$breader.readBytes(3)
		if(buf.toString()!="vcf"){
			throw new System.FormatException("El archivo no tiene el formato correcto");
		}

		var version=this.$breader.readInt32();
		if(version>Vcf.currentVersion){
			throw new System.FormatException("La versión del archivo no está soportado");
		}
	}
	if(this.$stream.length<15){
		this.writeHeader();
	}
}


/* Constantes */
Vcf.offsetVersion= 0;
Vcf.currentVersion= 1;
Vcf.offsetFiles= 4096;

// La compresión por defecto es Bzip2
Vcf.defaultCompression= VW.VcfCompression.Bzip2


/* Definición del formato */
/**

3 bytes vcf string
4 bytes Versión int
8 bytes Date int (seconds)
4 bytes int offset to start files ....


**/


var vcfbuf=new Buffer("vcf");
var empty=new Buffer(10);
empty.fill(0);

Vcf.prototype.writeHeader= function(){
	this.$stream.position=0;
	this.$bwriter.writeBytes(vcfbuf);

	this.$bwriter.writeInt32(Vcf.currentVersion);
	//this.$time=(new Date()).getTime();
	//this.$bwriter.writeInt32(this.$time);
	this.setLastTime();

	this.$index=0;
	this.$files= {};
	this.$bwriter.writeInt32(19+empty.length);
	this.$bwriter.writeBytes(empty);

}

Vcf.prototype.__defineSetter__("compression", function(val){
	this.$compression=val|| Vcf.defaultCompression;
	this.$alg= this.getAlgorithm(this.$compression);
})

Vcf.prototype.__defineGetter__("compression", function(){
	return this.$compression;
});


Vcf.prototype.getVersion= function(){
	this.$stream.position=3;
	return this.$breader.readInt32();
}


Vcf.prototype.setVersion= function(value){
	this.$stream.position=3;
	this.$bwriter.writeInt32(value);
}

Vcf.prototype.getLastTime=function(){
	this.$stream.position=7;
	var uno= this.$breader.readInt32();
	var dos= this.$breader.readInt32();
	return Number(uno.toString()+dos.toString());
}
Vcf.prototype.setLastTime=function(/*int */value){
	if(value==undefined){
		value=(new Date()).getTime();
	}
	this.$stream.position=7;



	var uno= (value/1000)|0;
	var dos= (value%1000)|0;
	this.$time= Number(uno.toString()+dos.toString());
	/*
	if(this.$time!=value){
		vw.warning(this.$time, value)
	}
	*/
	this.$bwriter.writeInt32(uno);
	this.$bwriter.writeInt32(dos);

}

Vcf.prototype.getOffsetFileDefinition= function(){
	this.$stream.position=15;
	return this.$breader.readInt32();
}

Vcf.prototype.update=function(/*ref bool*/optmized){
	var time= this.getLastTime();


	if(time!=this.$time){
		//vw.info("UPDATING");
		this.$files={};
		this.$index=0;
		this.$afiles=null;

		this.$stream.position=19;
		if(this.$stream.readByte()==1){
			if(optmized){
				optmized.ref=true;
			}

			//var buf=this._read(this.$breader.readInt32(), this.$breader.readInt32());
			//var data=new Buffer(buf).toString()

			var $ms=new System.IO.MemoryStream();
			this._read(this.$breader.readInt32(), this.$breader.readInt32(), $ms);
			var data= $ms.getBuffer().toString();

			this.$files=JSON.parse(data);
			for(var id in this.$files){
				this.$index++;
				this.$last=this.$files[id];
			}
		}
		else{

			var offset= this.getOffsetFileDefinition();
			while(true){
				//vw.log(offset,">>", this.$stream.length);


				if(offset>=this.$stream.length){
					break;
				}

				this.$stream.seek(offset);
				var byte=this.$breader.readByte();
				//vw.log(byte);
				if(byte!=1){
					//vw.info("here");
					offset+= this.$breader.readInt32(); // len of file registry
				}
				else{
					var len= this.$breader.readInt32(); // len of file registry
					//this.$stream.position+=4;
					var file= this.$breader.readString();
					var tipo= this.$breader.readByte();


					this.$last= this.$files[file]= {
						"name": file,
						"tipo":tipo,
						"index": this.$index,
						"offset": offset,
						"reglength": len, // Len of total registry
						"datalength": this.$breader.readInt32(),
						"dataoffset": this.$stream.position,

					};

					if(tipo!=2){
						this.$index++;
					}
					offset+=len;
				}

			}
		}
	}

	this.$time= time;
}


Vcf.prototype.delete= function(/*string*/path){
	this.update();

	path= Path.normalize(path);
	while(path.indexOf("\\")>=0){
		path =path.replace("\\","/");
	}
	var file=this.$files[path];
	if(!file){
		return;
	}

	this.$stream.position=file.offset;
	this.$stream.writeByte(0);
}

Vcf.prototype.read= function(/*string */path, /*Stream*/out){ // Return bytes ...
	this.update();
	var file;

	path= Path.normalize(path);
	while(path.indexOf("\\")>=0){
		path =path.replace("\\","/");
	}

	if(! (file=this.$files[path])) {
		throw new System.IO.FileNotFoundException(path);
	}

	return this._read(file.dataoffset, file.datalength,out);
}

Vcf.prototype._read=function(/*int */offset, /*int*/length, out){

	this.$stream.position=offset;


	var alg1= this.$breader.readByte();
	var alg= this.getAlgorithm(alg1);
	var data=this.$breader.readBytes(length-1);


	try{
		if(out instanceof System.IO.Stream){
			out=new tStream(out);
		}
		if(alg){
			if(out){
				alg.decompressFile(data,out);
			}
			else{
				/*var $ms=new System.IO.MemoryStream();
				alg.decompressFile(data,$ms);
				data= $ms.getBuffer();	*/
				data=new Buffer(alg.decompressFile(data));
			}
		}
		if(out){
			data=undefined;
		}
		if(out&&out.flush){
			out.flush();
		}
		return data;
	}
	catch(e){
		throw new System.FormatException("Error al leer archivo", e);
	}
}


Vcf.prototype.createDirectory= function(/*string*/path){
	return this.write(path,null,null,1);
}
Vcf.prototype.close= function(){
	this.$stream.close();
	this.$bwriter=null;
	this.$breader=null;
	this.$stream=null;
	this.$tstream=null;
}

Vcf.prototype.getAlgorithm=function(/*VcfCompression*/type){
	type=type+0;
	if(type==0){
		return null;
	}

	else if(type==1){
		return Compress.Bzip2;
	}
	else if(type==3){
		return Compress.Lzp3;
	}
	else if(type==2){
		return lzma;
	}
}



Vcf.prototype.getFilesFromFolder=function(/*string*/folder){
	var path= Path.normalize(folder);
	while(path.indexOf("\\")>=0){
		path =path.replace("\\","/");
	}
	if(path[path.length-1]!='/'){
		path+="/";
	}


	this.update();
	var files=[];
	for(var id in this.$files){
		var file=this.$files[id];
		if(file.name.substring(0,path.length)==path){
			files.push(file.name);
		}
	}
	return files;
}

Vcf.prototype.__defineGetter__("files", function(){
	this.update();
	if(this.$afiles){
		return this.$afiles;
	}
	var files=[];
	for(var id in this.$files){
		var file=this.$files[id];
		if(file.tipo==0){
			files.push(file.name);
		}
	}
	return this.$afiles=files;
});


Vcf.prototype.__defineGetter__("emptyDirectories", function(){
	this.update();
	var folders=[];
	for(var id in this.$files){
		var file=this.$files[id];
		if(file.tipo==1){
			folders.push(file.name);
		}
	}
	return folders;
});



Vcf.prototype.write= function(/*string */path, /* Buffer*/bytes, /*callback*/progress, /* INT*/ tipo){
	this.update();
	return this._write(path,bytes,progress,tipo);
}

Vcf.prototype.optimizeForRead= function(){

	var optimized={ref:false}
	this.update();
	if(this.$index==0 || optimized.ref){
		return;
	}


	var buf=new Buffer(JSON.stringify(this.$files));
	this._write("$$",buf, null, 2);


	this.$stream.position=19;
	this.$stream.writeByte(1);
	this.$bwriter.writeInt32(this.$last.dataoffset);
	this.$bwriter.writeInt32(this.$last.datalength);

}

Vcf.prototype._write= function(/*string */path, /* Buffer*/bytes, /*callback*/progress, /* INT*/ tipo){


	var pro=progress;
	// this.update();
	path= Path.normalize(path);
	while(path.indexOf("\\")>=0){
		path =path.replace("\\","/");
	}

	tipo=tipo|0;
	var data;
	/*
	var data= lzma.compressFile(bytes,null,5,function(ev){
		vw.log(ev);
	});

	*/


	var file= this.$files[path];
	var offset,writeOnlyData;
	if(this.$index==0){
		offset= this.getOffsetFileDefinition();
	}
	else if(file){
		/*if(data.length<=file.datalength){
			offset= file.offset;
			writeOnlyData= true;
		}
		else{
			*/

		//this.$stream.length; //
		offset= this.$last.offset+this.$last.reglength;
		this.$stream.position=file.offset;
		this.$stream.writeByte(0); // eliminado ...
		//}
	}
	else{
		//this.$stream.length; //
		offset= this.$last.offset+this.$last.reglength;
	}
	//vw.log("--",offset);


	var off1,off2;
	if(!writeOnlyData){
		this.$stream.position=offset;
		this.$stream.writeByte(1);
		off1=this.$stream.position;

		this.$stream.position=off1+4;
		this.$bwriter.writeString(path);
		this.$stream.writeByte(tipo);
	}
	else{
		offset=file.dataoffset-4;
		this.$stream.position=offset;
	}


	/*
	this.$bwriter.writeInt32(data.length);
	off2=this.$stream.position;
	this.$bwriter.writeBytes(data);
	*/
	off2= (this.$stream.position+=4);

	if(!bytes){
		bytes= zeroBuffer;
	}

	if(!this.$alg){
		this.$stream.writeByte(0);
		this.$stream.write(bytes,0,bytes.length);
	}
	else{

		this.$stream.writeByte(this.$compression+0);
		this.$alg.compressFile(bytes,this.$tstream,8,pro);
		//var data=this.$alg.compressFile(bytes);

		this.$tstream.flush();
	}


	var finalPos= this.$stream.position;
	var len=this.$stream.position-off2;
	//vw.info("Length:", len);
	this.$stream.position=off2-4;
	this.$bwriter.writeInt32(len);

	if(!file){
		file={
			"name": path,
			"tipo": tipo,
			"index": this.$index,
			"offset": offset,
			/*"datalength": data.length,*/
			"dataoffset": off2
		}
		this.$index++;
	}
	else{
		if(!writeOnlyData){
			file.index=this.$index;
			this.$index++;
		}
	}
	file.datalength=len;
	if(!writeOnlyData){

		this.$stream.position=19;
		this.$stream.writeByte(0);

		var totallen=finalPos-offset;
		this.$stream.position= off1;
		this.$bwriter.writeInt32(totallen);
		file.reglength= totallen;

		this.$last=file;



	}


	this.$files[path]=file;
	this.setLastTime();

}
