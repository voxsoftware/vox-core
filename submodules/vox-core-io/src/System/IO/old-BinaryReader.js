
var System=core.System;
var BinaryReader;

BinaryReader=module.exports=function(/* Stream */stream, /* Encoding */ encoding){
	if(!(stream instanceof System.IO.Stream)){
		return new Error("El argumento stream debe ser del tipo System.IO.Stream");
	}
	this.$stream=stream;
	this.baseStream=stream;
	this.$fbuf=new Buffer(16);

	if(!encoding){
		encoding= System.Text.Encoding.utf8;
	}
	this.$encoding=this.encoding=encoding;
}

BinaryReader.prototype.readBoolean=function(){
	
	return !!this.readByte();
}






BinaryReader.prototype.readByte=function(){
	if(this.$stream.read(this.$fbuf, 0, 1)<1){
		throw new Error("Se intentó leer más allá de la longitud");
	}
	return this.$fbuf[0];
}

BinaryReader.prototype.readSbyte=function(){
	if(this.$stream.read(this.$fbuf, 0, 1)<1){
		throw new Error("Se intentó leer más allá de la longitud");
	}
	return this.$fbuf.readInt8(0);
}

BinaryReader.prototype.readBytes=function(/* int */ count){
	var buf=new Buffer(count);
	if(this.$stream.read(buf, 0, count)<count){
		throw new Error("Se intentó leer más allá de la longitud");
	}
	return buf;
}


BinaryReader.prototype.readDouble=function(){
	if(this.$stream.read(this.$fbuf, 0, 8)<8){
		throw new Error("Se intentó leer más allá de la longitud");
	}
	return this.$fbuf.readDoubleLE(0);
}


BinaryReader.prototype.readInt16=function(){
	if(this.$stream.read(this.$fbuf, 0, 2)<2){
		throw new Error("Se intentó leer más allá de la longitud");
	}
	return this.$fbuf.readInt16LE(0);
}

BinaryReader.prototype.readUInt16=function(){
	if(this.$stream.read(this.$fbuf, 0, 2)<2){
		throw new Error("Se intentó leer más allá de la longitud");
	}
	return this.$fbuf.readUInt16LE(0);
}


BinaryReader.prototype.readInt32=function(){
	if(this.$stream.read(this.$fbuf, 0, 4)<4){
		throw new Error("Se intentó leer más allá de la longitud");
	}
	return this.$fbuf.readInt32LE(0);
}

BinaryReader.prototype.readUInt32=function(){
	if(this.$stream.read(this.$fbuf, 0, 4)<4){
		throw new Error("Se intentó leer más allá de la longitud");
	}
	return this.$fbuf.readUInt32LE(0);
}


BinaryReader.prototype.readInt64=function(){
	if(this.$stream.read(this.$fbuf, 0, 8)<8){
		throw new Error("Se intentó leer más allá de la longitud");
	}
	return new System.Int64(this.$fbuf,'le');
}

BinaryReader.prototype.readUInt64=function(){
	if(this.$stream.read(this.$fbuf, 0, 8)<8){
		throw new Error("Se intentó leer más allá de la longitud");
	}
	return new System.UInt64(this.$fbuf,'le');
}



BinaryReader.prototype.readSingle=function(){
	if(this.$stream.read(this.$fbuf, 0, 4)<4){
		throw new Error("Se intentó leer más allá de la longitud");
	}
	return this.$fbuf.readFloatLE(0);
}

BinaryReader.prototype.readDecimal=function(){
	if(this.$stream.read(this.$fbuf, 0, 16)<16){
		throw new Error("Se intentó leer más allá de la longitud");
	}
	return System.Decimal.fromBytes(this.$fbuf);
}


BinaryReader.prototype.read7BitEncodedInt= function(/* int */ value){
	var num=0,num2=0;
	while(num2!=35){
		var b=this.readByte();
		num |= ((b&127)|0)<<num2;
		num2+=7;
		if((b&128) == 0){
			return num;
		}
	}
	throw new Error("Se esperaba un número entero codificado en 7 bit.");
}

BinaryReader.prototype.readString=function(){
	var len=this.read7BitEncodedInt();
	return this.$encoding.getString(this.readBytes(len));


	var byte=this.readByte();
	var len;
	if(byte>>5==0){
		len=byte;
	}
	else if(byte>>5==1){
		len=this.readByte();
	}
	else if(byte>>5==2){
		len=this.readUInt16();
	}
	else if(byte>>5==3){
		this.$stream.read(this.$fbuf, 0, 3);
		this.$fbuf[3]= 0;
		len= this.$fbuf.readUInt32LE(0);
	}
	else{
		len= this.readUInt32();
	}


	return this.$encoding.getString(this.readBytes(len));
}

BinaryReader.prototype.close=function(){
	this.$stream.close();
}
