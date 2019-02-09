
var System=core.System


class BinaryWriter{
  constructor(/* Stream */stream, /* Encoding */ encoding){
  	if(!(stream instanceof System.IO.Stream)){
  		throw new Error("El argumento stream debe ser del tipo System.IO.Stream");
  	}
  	this.$stream=stream
  	this.baseStream=stream
  	this.$fbuf=new Buffer(16)

  	if(!encoding){
  		encoding= System.Text.Encoding.utf8
  	}
  	this.$encoding=this.encoding=encoding
  }

  writeBoolean(/* bool */value){
	   this.writeByte(value?1:0)
  }

  writeBooleanAsync(/* bool */value){
	   return this.writeByteAsync(value?1:0)
  }



  writeByte(/* int */byte){
  	this.$stream.writeByte(byte)
  }

  writeByteAsync(/* int */byte){
  	return this.$stream.writeByteAsync(byte)
  }

  writeSbyte(/* int */sbyte){
  	this.$fbuf.writeInt8(sbyte,0);
  	this.$stream.write(this.$fbuf, 0, 1)
  }

  writeSbyteAsync(/* int */sbyte){
  	this.$fbuf.writeInt8(sbyte,0);
  	return this.$stream.writeAsync(this.$fbuf, 0, 1)
  }

  writeBytes(/* Buffer */ bytes, /* [optional] int*/ count){
  	count=arguments.length>=2?count|0:bytes.length;
  	this.$stream.write(bytes,0, count);
  }


  writeBytesAsync(/* Buffer */ bytes, /* [optional] int*/ count){
  	count=arguments.length>=2?count|0:bytes.length;
  	return this.$stream.writeAsync(bytes,0, count);
  }


  writeDouble(/* double*/value){
  	this.$fbuf.writeDoubleLE(value,0);
  	this.$stream.write(this.$fbuf, 0, 8)
  }

  writeDoubleAsync(/* double*/value){
  	this.$fbuf.writeDoubleLE(value,0);
  	return this.$stream.writeAsync(this.$fbuf, 0, 8)
  }


  writeInt16(/* int16 */value){
  	this.$fbuf.writeInt16LE(value,0);
  	this.$stream.write(this.$fbuf, 0, 2)
  }

  writeInt16Async(/* int16 */value){
  	this.$fbuf.writeInt16LE(value,0);
  	return this.$stream.writeAsync(this.$fbuf, 0, 2)
  }

  writeUInt16(/* uint16 */ value){
  	this.$fbuf.writeUInt16LE(value,0);
  	this.$stream.write(this.$fbuf, 0, 2)
  }

  writeUInt16Async(/* uint16 */ value){
  	this.$fbuf.writeUInt16LE(value,0);
  	return this.$stream.writeAsync(this.$fbuf, 0, 2)
  }


  writeInt32(/* int */ value){
  	this.$fbuf.writeInt32LE(value,0);
  	this.$stream.write(this.$fbuf, 0, 4)
  }


  writeInt32Async(/* int */ value){
  	this.$fbuf.writeInt32LE(value,0);
  	return this.$stream.writeAsync(this.$fbuf, 0, 4)
  }


  writeUInt32(/* uint */ value){
  	this.$fbuf.writeUInt32LE(value,0);
  	this.$stream.write(this.$fbuf, 0, 4)
  }


  writeUInt32Async(/* uint */ value){
  	this.$fbuf.writeUInt32LE(value,0);
  	return this.$stream.writeAsync(this.$fbuf, 0, 4)
  }

  /* writeNUmber es especial para números grandes, pero sin la sobrecarga que exige
  usar el tipo int64 */
  writeUIntSafe(value, fixedLength){
    // Cuando es fixed length escrie 3 bytes puesto que no son necesarios los 4
    var num= (value/4294967295)|0
    var num2= value%4294967295
    if(fixedLength){
      this.$fbuf.writeUInt32LE(num)
      this.$stream.write(this.$fbuf, 0, 3)
    }
    else{
      this.write7BitEncodedInt(num)
    }
    this.writeUInt32(num2)

  }

  async writeUIntSafeAsync(value,fixedLength){
    var num= (value/4294967295)|0
    var num2= value%4294967295
    if(fixedLength){
      this.$fbuf.writeUInt32LE(num)
      await this.$stream.writeAsync(this.$fbuf, 0, 3)
    }
    else{
      this.write7BitEncodedInt(num)
    }
    await this.writeUInt32Async(num2)
  }


  writeInt64(/* long */ value){

  	if(!(value instanceof System.Int64)){
  		throw new Error("El argumento value no es del tipo System.Int64");
  	}

  	//this.$fbuf.writeInt64LE(value,0);
  	this.$stream.write(value.toBuffer('le'), 0, 8)

  }

  writeInt64Async(/* long */ value){

  	if(!(value instanceof System.Int64)){
  		throw new Error("El argumento value no es del tipo System.Int64");
  	}

  	//this.$fbuf.writeInt64LE(value,0);
  	return this.$stream.writeAsync(value.toBuffer('le'), 0, 8)

  }

  writeUInt64(/* ulong */value){

  	if(!(value instanceof System.UInt64)){
  		throw new Error("El argumento value no es del tipo System.UInt64");
  	}


  	//this.$fbuf.writeUInt64LE(value,0);
  	this.$stream.write(value.toBuffer('le'), 0, 8)
  }


  async writeUInt64Async(/* ulong */value){

  	if(!(value instanceof System.UInt64)){
  		throw new Error("El argumento value no es del tipo System.UInt64");
  	}


  	//this.$fbuf.writeUInt64LE(value,0);
  	return this.$stream.writeAsync(value.toBuffer('le'), 0, 8)
  }



  writeSingle(/* float */ value){
  	this.$fbuf.writeFloatLE(value,0);
  	this.$stream.write(this.$fbuf, 0, 4)
  }

  writeSingleAsync(/* float */ value){
  	this.$fbuf.writeFloatLE(value,0);
  	return this.$stream.writeAsync(this.$fbuf, 0, 4)
  }

  writeDecimal(/* Decimal */ value){
	   System.Decimal.getBytes(value,this.$fbuf);
     this.$stream.write(this.$fbuf, 0, 16)
  }


  writeDecimalAsync(/* Decimal */ value){
	   System.Decimal.getBytes(value,this.$fbuf);
     return this.$stream.writeAsync(this.$fbuf, 0, 16)
  }


  writeString(/*string */value){
  	var buf=this.$encoding.getBytes(value)
  	this.write7BitEncodedInt(buf.length)
  	this.writeBytes(buf)

  }

  writeStringAsync(/*string */value){
  	var buf=this.$encoding.getBytes(value)
  	this.write7BitEncodedInt(buf.length)
  	return this.writeBytesAsync(buf)

  }


  write7BitEncodedInt(/* int */ value){
  	var num
  	for(num=value;num>=128; num = num>>7){
  		this.writeByte((num|128)&255)
  	}
  	this.writeByte(num&255)
  }


  writeAsync(){
    return this.write(arguments[0], arguments[1], true)
  }
  write(/* variant */ value, /* string */ type, aSync){

  	if(type==undefined){
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
  		return aSync?this.writeBooleanAsync(value):  this.writeBoolean(value);
  	}
  	else if(type=="byte"){
  		return  aSync?this.writeByteAsync(value):this.writeByte(value);
  	}
  	else if(type=="bytes"){
  		return  aSync?this.writeBytes(value):this.writeBytes(value);
  	}
  	else if(type=="double"){
  		return  aSync?this.writeDoubleAsync(value):this.writeBouble(value);
  	}
  	else if(type=="int16"){
  		return  aSync?this.writeInt16Async(value):this.writeInt16(value);
  	}
  	else if(type=="uint16"){
  		return  aSync?this.writeUInt16Async(value):this.writeUInt16(value);
  	}
  	else if(type=="int32"){
  		return  aSync?this.writeInt32Async(value):this.writeInt32(value);
  	}
  	else if(type=="uint32"){
  		return  aSync?this.writeUInt32Async(value): this.writeUInt32(value);
  	}
  	else if(type=="int64"){
  		return  aSync?this.writeInt64Async(value):this.writeInt64(value);
  	}
  	else if(type=="uint64"){
  		return  aSync?this.writeUInt64Async(value):this.writeUInt64(value);
  	}
  	else if(type=="float"||type=="single"){
  		return  aSync?this.writeSingleAsync(value):this.writeSingle(value);
  	}
  	else if(type=="string"){
  		return  aSync?this.writeStringAsync(value):this.writeString(value);
  	}
  }

  close(){
	   this.$stream.close()
  }
}

export default BinaryWriter
