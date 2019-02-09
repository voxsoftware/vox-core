
var System=core.System;
var BinaryWriter;
//var i_buf1=new Buffer(4);

BinaryWriter=module.exports=function(/* Stream */stream, /* Encoding */ encoding){
	if(!(stream instanceof System.IO.Stream)){
		throw new Error("El argumento stream debe ser del tipo System.IO.Stream");
	}
	this.$stream=stream;
	this.baseStream=stream;
	this.$fbuf=new Buffer(16);

	if(!encoding){
		encoding= System.Text.Encoding.utf8;
	}
	this.$encoding=this.encoding=encoding;
}

BinaryWriter.prototype.writeBoolean=function(/* bool */value){
	this.writeByte(value?1:0);
}

BinaryWriter.prototype.writeByte=function(/* int */byte){
	this.$stream.writeByte(byte);
}

BinaryWriter.prototype.writeSbyte=function(/* int */sbyte){
	this.$fbuf.writeInt8(sbyte,0);
	if(this.$stream.write(this.$fbuf, 0, 1)<1){
		throw new Error("Ocurrió un error al escribir el valor");
	}
}

BinaryWriter.prototype.writeBytes=function(/* Buffer */ bytes, /* [optional] int*/ count){
	count=arguments.length>=2?count|0:bytes.length;
	this.$stream.write(bytes,0, count);
}


BinaryWriter.prototype.writeDouble=function(/* double*/value){
	this.$fbuf.writeDoubleLE(value,0);
	if(this.$stream.write(this.$fbuf, 0, 8)<8){
		throw new Error("Ocurrió un error al escribir el valor");
	}
}


BinaryWriter.prototype.writeInt16=function(/* int16 */value){
	this.$fbuf.writeInt16LE(value,0);
	if(this.$stream.write(this.$fbuf, 0, 2)<2){
		throw new Error("Ocurrió un error al escribir el valor");
	}
}

BinaryWriter.prototype.writeUInt16=function(/* uint16 */ value){
	this.$fbuf.writeUInt16LE(value,0);
	if(this.$stream.write(this.$fbuf, 0, 2)<2){
		throw new Error("Ocurrió un error al escribir el valor");
	}
}


BinaryWriter.prototype.writeInt32=function(/* int */ value){
	this.$fbuf.writeInt32LE(value,0);
	if(this.$stream.write(this.$fbuf, 0, 4)<4){
		throw new Error("Ocurrió un error al escribir el valor");
	}
}

BinaryWriter.prototype.writeUInt32=function(/* uint */ value){
	this.$fbuf.writeUInt32LE(value,0);
	if(this.$stream.write(this.$fbuf, 0, 4)<4){
		throw new Error("Ocurrió un error al escribir el valor");
	}
}


BinaryWriter.prototype.writeInt64=function(/* long */ value){

	if(!(value instanceof System.Int64)){
		throw new Error("El argumento value no es del tipo System.Int64");
	}

	//this.$fbuf.writeInt64LE(value,0);
	if(this.$stream.write(value.toBuffer('le'), 0, 8)<8){
		throw new Error("Ocurrió un error al escribir el valor");
	}

}

BinaryWriter.prototype.writeUInt64=function(/* ulong */value){

	if(!(value instanceof System.UInt64)){
		throw new Error("El argumento value no es del tipo System.UInt64");
	}


	//this.$fbuf.writeUInt64LE(value,0);
	if(this.$stream.write(value.toBuffer('le'), 0, 8)<8){
		throw new Error("Ocurrió un error al escribir el valor");
	}
}



BinaryWriter.prototype.writeSingle=function(/* float */ value){
	this.$fbuf.writeFloatLE(value,0);
	if(this.$stream.write(this.$fbuf, 0, 4)<4){
		throw new Error("Ocurrió un error al escribir el valor");
	}
}

BinaryWriter.prototype.writeDecimal=function(/* Decimal */ value){
	System.Decimal.getBytes(value,this.$fbuf);
	if(this.$stream.write(this.$fbuf, 0, 16)<16){
		throw new Error("Ocurrió un error al escribir el valor");
	}
}


BinaryWriter.prototype.writeString=function(/*string */value){
	var buf=this.$encoding.getBytes(value);
	this.write7BitEncodedInt(buf.length);
	this.writeBytes(buf);
	return;


	var len= buf.length;
	var num;
	if(len<=31){
		this.writeByte(len);
	}
	else if(len<=255){
		//num=1<<4;
		this.writeByte(1<<5);
		this.writeByte(len);
	}
	else if(len<=65535){
		this.writeByte(2<<5);
		this.writeUInt16(len);
	}
	else if(len<=16777215){
		//this.writeByte(3<<4);
		//this.writeUInt24LE(len);
		this.$fbuf.writeUInt32LE(len,0);
		//this.$fbuf[0]=3<<4;
		this.writeByte(3<<5);
		this.writeBytes(this.$fbuf,3);
	}
	else{
		this.writeByte(4<<5);
		this.writeUInt32(len);
	}

	this.writeBytes(buf);
}


BinaryWriter.prototype.write7BitEncodedInt= function(/* int */ value){
	var num;
	for(num=value;num>=128; num = num>>7){
		this.writeByte((num|128)&255);
	}
	this.writeByte(num&255);
}



BinaryWriter.prototype.write= function(/* variant */ value, /* string */ type){

	if(arguments.length<2){
		var t= typeof value;
		if(t=="string"){
			type=t;
		}
		else if(t=="number"){
			if(value|0===value){
				if(value>2147483647){
					type="int64";
					value=new System.Int64(value);
				}
				else{
					type="int32";
				}
			}
			else{
				if(value>3.40282347e+38){
					type="double";
				}
				else{
					type="float";
				}
			}
		}
		else if(t=="boolean"){
			type="boolean";
		}
		else if(t instanceof System.Int64){
			type='int64';
		}
		else if(t instanceof System.UInt64){
			type='uint64';
		}
		else{
			throw new Error("No ha sido implementado aún la función write para tipo: " + t);
		}
	}


	if(type=="boolean"){
		return this.writeBoolean(value);
	}
	else if(type=="byte"){
		return this.writeByte(value);
	}
	else if(type=="bytes"){
		return this.writeBytes(value);
	}
	else if(type=="double"){
		return this.writeBouble(value);
	}
	else if(type=="int16"){
		return this.writeInt16(value);
	}
	else if(type=="uint16"){
		return this.writeUInt16(value);
	}
	else if(type=="int32"){
		return this.writeInt32(value);
	}
	else if(type=="uint32"){
		return this.writeUInt32(value);
	}
	else if(type=="int64"){
		return this.writeInt64(value);
	}
	else if(type=="uint64"){
		return this.writeUInt64(value);
	}
	else if(type=="float"||type=="single"){
		return this.writeSingle(value);
	}
	else if(type=="string"){
		return this.writeString(value);
	}
}

BinaryWriter.prototype.close=function(){
	this.$stream.close();
}
