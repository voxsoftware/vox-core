
var System= core.System
// ESto se hizo para reescribir el código de la clase BinaryReader
// quitar validaciones no necesarioas y añadir soporte asíncrono

class BinaryReader/* extends System.IO.Stream*/{


  constructor(stream, encoding){
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

  readByte(){
    if(this.$stream.read(this.$fbuf, 0, 1)<1){
  		throw new Error("Se intentó leer más allá de la longitud")
  	}
  	return this.$fbuf[0]
  }

  async readByteAsync(){
    if((await this.$stream.readAsync(this.$fbuf, 0, 1))<1){
  		throw new Error("Se intentó leer más allá de la longitud")
  	}
  	return this.$fbuf[0]
  }



  readBoolean(){
    return !!this.readByte()
  }

  async readBooleanAsync(){
    return !!(await this.readByte())
  }


  readSbyte(){
    if(this.$stream.read(this.$fbuf, 0, 1)<1){
  		throw new Error("Se intentó leer más allá de la longitud")
  	}
  	return this.$fbuf.readInt8(0)
  }


  async readSbyteAsync(){
    if((await this.$stream.readAsync(this.$fbuf, 0, 1))<1){
  		throw new Error("Se intentó leer más allá de la longitud")
  	}
  	return this.$fbuf.readInt8(0)
  }


  readBytes(count){
    var buf=new Buffer(count)
  	if(this.$stream.read(buf, 0, count)<count){
  		throw new Error("Se intentó leer más allá de la longitud")
  	}
  	return buf
  }

  async readBytesAsync(count){
    var buf=new Buffer(count)
  	if((await this.$stream.readAsync(buf, 0, count))<count){
  		throw new Error("Se intentó leer más allá de la longitud")
  	}
  	return buf
  }

  readUIntSafe(fixedLength){
    var num1, num2
    if(fixedLength){
      if(this.$stream.read(this.$fbuf, 0, 7)<7){
    		throw new Error("Se intentó leer más allá de la longitud");
    	}
      this.$fbuf[7]= this.$fbuf[3]
      this.$fbuf[3]= 0
      num1= this.$fbuf.readUInt32LE(0)
      this.$fbuf[3]= this.$fbuf[7]
      num2= this.$fbuf.readUInt32LE(3)


    }
    else{
      num1= this.read7BitEncodedInt()
      num2= this.readUInt32()
    }
    return (num1*4294967295)+num2

  }

  async readUIntSafeAsync(fixedLength){
    var num1, num2
    if(fixedLength){
      if((await this.$stream.read(this.$fbuf, 0, 7))<7){
    		throw new Error("Se intentó leer más allá de la longitud");
    	}
      this.$fbuf[7]= this.$fbuf[3]
      this.$fbuf[3]= 0
      num1= this.$fbuf.readUInt32LE(0)
      this.$fbuf[3]= this.$fbuf[7]
      num2= this.$fbuf.readUInt32LE(3)


    }
    else{
      num1= this.read7BitEncodedInt()
      num2= await this.readUInt32Async()
    }
    return (num1*4294967295)+num2

  }



  readDouble(){
    if(this.$stream.read(this.$fbuf, 0, 8)<8){
  		throw new Error("Se intentó leer más allá de la longitud");
  	}
  	return this.$fbuf.readDoubleLE(0);
  }


  async readDoubleAsyn(){
    if((await this.$stream.readAsync(this.$fbuf, 0, 8))<8){
  		throw new Error("Se intentó leer más allá de la longitud")
  	}
  	return this.$fbuf.readDoubleLE(0)
  }


  readInt16(){
    if(this.$stream.read(this.$fbuf, 0, 2)<2){
  		throw new Error("Se intentó leer más allá de la longitud")
  	}
  	return this.$fbuf.readInt16LE(0);
  }


  async readInt16Async(){
    if((await this.$stream.readAsync(this.$fbuf, 0, 2))<2){
  		throw new Error("Se intentó leer más allá de la longitud")
  	}
  	return this.$fbuf.readInt16LE(0)
  }

  readUInt16(){
    if(this.$stream.read(this.$fbuf, 0, 2)<2){
  		throw new Error("Se intentó leer más allá de la longitud")
  	}
  	return this.$fbuf.readUInt16LE(0);
  }

  async readUInt16Async(){
    if((await this.$stream.readAsync(this.$fbuf, 0, 2))<2){
  		throw new Error("Se intentó leer más allá de la longitud")
  	}
  	return this.$fbuf.readUInt16LE(0);
  }

  readInt32(){
    if(this.$stream.read(this.$fbuf, 0, 4)<4){
  		throw new Error("Se intentó leer más allá de la longitud");
  	}
  	return this.$fbuf.readInt32LE(0)
  }

  async readInt32Async(){
    if((await this.$stream.readAsync(this.$fbuf, 0, 4))<4){
  		throw new Error("Se intentó leer más allá de la longitud");
  	}
  	return this.$fbuf.readInt32LE(0)
  }

  readUInt32(){
    if(this.$stream.read(this.$fbuf, 0, 4)<4){
  		throw new Error("Se intentó leer más allá de la longitud")
  	}
  	return this.$fbuf.readUInt32LE(0)
  }

  async readUInt32Async(){
    if((await this.$stream.read(this.$fbuf, 0, 4))<4){
  		throw new Error("Se intentó leer más allá de la longitud")
  	}
  	return this.$fbuf.readUInt32LE(0)
  }


  readInt64(){
    if(this.$stream.read(this.$fbuf, 0, 8)<8){
  		throw new Error("Se intentó leer más allá de la longitud")
  	}
  	return new System.Int64(this.$fbuf,'le')
  }


  async readInt64Async(){
    if((await this.$stream.readAsync(this.$fbuf, 0, 8))<8){
  		throw new Error("Se intentó leer más allá de la longitud")
  	}
  	return new System.Int64(this.$fbuf,'le')
  }


  readUInt64(){
    if(this.$stream.read(this.$fbuf, 0, 8)<8){
  		throw new Error("Se intentó leer más allá de la longitud")
  	}
  	return new System.UInt64(this.$fbuf,'le')
  }


  async readUInt64Async(){
    if((await this.$stream.readAsync(this.$fbuf, 0, 8))<8){
  		throw new Error("Se intentó leer más allá de la longitud")
  	}
  	return new System.UInt64(this.$fbuf,'le')
  }


  readSingle(){
    if(this.$stream.read(this.$fbuf, 0, 4)<4){
  		throw new Error("Se intentó leer más allá de la longitud")
  	}
  	return this.$fbuf.readFloatLE(0)
  }

  async readSingleAsync(){
    if((await this.$stream.readAsync(this.$fbuf, 0, 4))<4){
      throw new Error("Se intentó leer más allá de la longitud")
    }
    return this.$fbuf.readFloatLE(0)
  }

  readDecimal(){
    if(this.$stream.read(this.$fbuf, 0, 16)<16){
  		throw new Error("Se intentó leer más allá de la longitud")
  	}
  	return System.Decimal.fromBytes(this.$fbuf)
  }


  async readDecimalAsync(){
    if((await this.$stream.readAsync(this.$fbuf, 0, 16))<16){
  		throw new Error("Se intentó leer más allá de la longitud")
  	}
  	return System.Decimal.fromBytes(this.$fbuf)
  }

  read7BitEncodedInt(){
    var num=0,num2=0
  	while(num2!=35){
  		var b=this.readByte()
  		num |= ((b&127)|0)<<num2
  		num2+=7
  		if((b&128) == 0){
  			return num
  		}
  	}
  	throw new Error("Se esperaba un número entero codificado en 7 bit.")
  }

  readString(){
    var len=this.read7BitEncodedInt();
  	return this.$encoding.getString(this.readBytes(len));
  }

  async readStringAsync(){
    var len=this.read7BitEncodedInt();
  	return this.$encoding.getString(await this.readBytes(len));
  }

  close(){
    this.$stream.close()
  }

}

export default BinaryReader
