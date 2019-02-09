
/*
    VWPointer es una clase para representar los diferentes tipos existentes en C#
    que son punteros tales como:

    byte*
    sbyte*
    char*
    int*
    short*
    uint*
    ushort*

*/


var System=core.System 
var translations=require("./type_translations.js");
var VWPointer= module.exports=function(){
}


var cbuf=new Buffer(16);
var cbuf2=cbuf.slice(0,8);

VWPointer.fromStream=function(/*Stream*/stream, /*string */type, /*int */ position, /*int */count){
    if(count==undefined){
        count=-1;
    }

    if(position==undefined){
        position=0;
    }



    var class1=VWPointer.get(type);
    return new class1(stream,null,position,count);
}

VWPointer.get= function(type){
    var t=translations.types[type]||type;
    var f= VWPointer["read"+t];
    if(!f){
        throw new System.ArgumentException("El tipo " + type + " no es válido");
    }
    var p;
    if(!(p=VWPointer[t])){
        p=VWPointer[t]=function(stream,buffer,position,count){
            this.$size= translations.sizes[t];
            this.$buf= buffer;
            this.$count= count;
            this.$position=position;
            this.$stream=stream;
            this.$type=type;
        }
        p.prototype= Object.create(VWPointer.prototype, { constructor: { value: p } });
        p.prototype.get= f;
        p.prototype.set= VWPointer["write"+t];

    }
    return p;
}

VWPointer.prototype.valueOf= function(){
    return this.$position;
}


VWPointer.prototype.setPtr= function(/* int*/position){
    this.$position=position;
}

VWPointer.prototype.castToType= function(/*string*/type, /*int [optional]*/ index){
    var class1= VWPointer.get(type);
    return new class1(this.$stream, this.$buf, this.$position+(index*this.$size|0), this.$count);
}


// Operaciones ...
VWPointer.prototype.addPtr= function(/* int */ value){
    return this+((value+0)*this.$size);
}
VWPointer.prototype.subPtr= function(/* int */ value){
    return this-((value+0)*this.$size);
}
VWPointer.prototype.add= function(/* int */ value){
    var b= this.clone();
    b.setPtr(this.addPtr(value));
    return b;
}
VWPointer.prototype.iadd= function(/*int*/value){
    this.$position+= ((value+0)*this.$size);
}

VWPointer.prototype.isub= function(/*int*/value){
    this.$position-= ((value+0)*this.$size);
}

VWPointer.prototype.sub= function(/* int */ value){
    var b= this.clone();
    b.setPtr(this.subPtr(value));
    return b;
}


VWPointer.prototype.clone= function(){
    return this.castToType(this.$type);
}




VWPointer.fromBytes=function(/*Buffer*/buffer, /*string */type, /*int */ position, /*int */count){
    if(count==undefined){
        count=-1;
    }

    if(position==undefined){
        position=0;
    }



    var class1=VWPointer.get(type);
    return new class1(null,buffer,position,count);
}

VWPointer.readInt8=function(/*int */index){
    var pos= index*this.$size;
    if(count>-1 && pos>count){
        throw new System.ArgumentOutOfRangeException("El índice está fuera del rango");
    }
    pos+= this.$position;
    if(this.$stream){
        this.$stream.position= pos;
        this.$stream.read(cbuf,0,this.$size);
        return cbuf.readInt8(0);
    }
    return this.$buf.readInt8(pos);
}

VWPointer.readUInt8=function(/*int */index){
    var pos= index*this.$size;
    if(this.$count>-1 && pos>this.$count){
        throw new System.ArgumentOutOfRangeException("El índice está fuera del rango");
    }
    pos+= this.$position;
    if(this.$stream){
        this.$stream.position= pos;
        return this.$stream.readByte();
    }
    return this.$buf[pos];
}


VWPointer.readInt16=function(/*int */index){
    var pos= index*this.$size;
    if(this.$count>-1 && pos>this.$count){
        throw new System.ArgumentOutOfRangeException("El índice está fuera del rango");
    }
    pos+= this.$position;
    if(this.$stream){
        this.$stream.position= pos;
        this.$stream.read(cbuf,0,this.$size);
        return cbuf.readInt16LE(0);
    }

    return this.$buf.readInt16LE(pos);
}

VWPointer.readUInt16=function(/*int */index){
    var pos= index*this.$size;
    if(this.$count>-1 && pos>this.$count){
        throw new System.ArgumentOutOfRangeException("El índice está fuera del rango");
    }
    pos+= this.$position;
    if(this.$stream){
        this.$stream.position= pos;
        this.$stream.read(cbuf,0,this.$size);
        return cbuf.readUInt16LE(0);
    }
    return this.$buf.readUInt16LE(pos);
}

VWPointer.readInt32=function(/*int */index){
    var pos= index*this.$size;
    if(this.$count>-1 && pos>this.$count){
        throw new System.ArgumentOutOfRangeException("El índice está fuera del rango");
    }
    pos+= this.$position;
    if(this.$stream){
        this.$stream.position= pos;
        this.$stream.read(cbuf,0,this.$size);
        return cbuf.readInt32LE(0);
    }
    return this.$buf.readInt32LE(pos);
}

VWPointer.readUInt32=function(/*int */index){
    var pos= index*this.$size;
    if(this.$count>-1 && pos>this.$count){
        throw new System.ArgumentOutOfRangeException("El índice está fuera del rango");
    }
    pos+= this.$position;
    if(this.$stream){
        this.$stream.position= pos;
        this.$stream.read(cbuf,0,this.$size);
        return cbuf.readUInt32LE(0);
    }
    return this.$buf.readUInt32LE(pos);
}

VWPointer.readInt64=function(/*int */index){
    var pos= index*this.$size;
    if(this.$count>-1 && pos>this.$count){
        throw new System.ArgumentOutOfRangeException("El índice está fuera del rango");
    }
    pos+= this.$position;
    if(this.$stream){
        this.$stream.position= pos;
        this.$stream.read(cbuf2,0,this.$size);
        return new System.Int64(cbuf2,'le');
    }
    return new System.Int64(this.$buf.slice(pos,pos+8),'le');
}

VWPointer.readUInt64=function(/*int */index){
    var pos= index*this.$size;
    if(this.$count>-1 && pos>this.$count){
        throw new System.ArgumentOutOfRangeException("El índice está fuera del rango");
    }
    pos+= this.$position;
    if(this.$stream){
        this.$stream.position= pos;
        this.$stream.read(cbuf2,0,this.$size);
        return new System.UInt64(cbuf2,'le');
    }
    return new System.UInt64(this.$buf.slice(pos,pos+8),'le');
}



VWPointer.writeInt8=function(value, /*int */index){
    var pos= index*this.$size;
    if(this.$count>-1 && pos>this.$count){
        throw new System.ArgumentOutOfRangeException("El índice está fuera del rango");
    }
    pos+= this.$position;
    if(this.$stream){
        this.$stream.position= pos;
        cbuf.writeInt8(value,pos);
        this.$stream.write(cbuf,0,this.$size);
        return value;
    }
    this.$buf.writeInt8(value,pos);
    return value;
}

VWPointer.writeUInt8=function(value, /*int */index){
    var pos= index*this.$size;
    if(this.$count>-1 && pos>this.$count){
        throw new System.ArgumentOutOfRangeException("El índice está fuera del rango");
    }
    pos+= this.$position;
    if(this.$stream){
        this.$stream.position= pos;
        this.$stream.writeByte(value);
        return value;
    }
    return this.$buf[pos]=value;
}


VWPointer.writeInt16=function(value, /*int */index){
    var pos= index*this.$size;
    if(this.$count>-1 && pos>this.$count){
        throw new System.ArgumentOutOfRangeException("El índice está fuera del rango");
    }
    pos+= this.$position;
    if(this.$stream){
        this.$stream.position= pos;
        cbuf.writeInt16LE(0);
        this.$stream.write(cbuf,0,this.$size);
        return value;
    }
    this.$buf.writeInt16LE(value,pos);
    return value;
}

VWPointer.writeUInt16=function(value, /*int */index){
    var pos= index*this.$size;
    if(this.$count>-1 && pos>this.$count){
        throw new System.ArgumentOutOfRangeException("El índice está fuera del rango");
    }
    pos+= this.$position;
    if(this.$stream){
        this.$stream.position= pos;
        cbuf.writeUInt16LE(0);
        this.$stream.write(cbuf,0,this.$size);
        return value;
    }
    this.$buf.writeUInt16LE(pos);
    return value;
}

VWPointer.writeInt32=function(value, /*int */index){
    var pos= index*this.$size;
    if(this.$count>-1 && pos>this.$count){
        throw new System.ArgumentOutOfRangeException("El índice está fuera del rango");
    }
    pos+= this.$position;
    if(this.$stream){
        this.$stream.position= pos;
        cbuf.writeInt32LE(0);
        this.$stream.write(cbuf,0,this.$size);
        return value;
    }
    this.$buf.readInt32LE(pos);
    return value;
}

VWPointer.writeUInt32=function(value, /*int */index){
    var pos= index*this.$size;
    if(this.$count>-1 && pos>this.$count){
        throw new System.ArgumentOutOfRangeException("El índice está fuera del rango");
    }
    pos+= this.$position;
    if(this.$stream){
        this.$stream.position= pos;
        cbuf.writeUInt32LE(cbuf,0);
        this.$stream.write(cbuf,0,this.$size);
        return value;
    }
    this.$buf.writeUInt32LE(pos);
    return value;
}

VWPointer.writeInt64=VWPointer.writeUInt64=function(value, /*int */index){
    var pos= index*this.$size;
    if(this.$count>-1 && pos>this.$count){
        throw new System.ArgumentOutOfRangeException("El índice está fuera del rango");
    }
    pos+= this.$position;
    if(this.$stream){
        this.$stream.position= pos;

        this.$stream.write(value.toBuffer('le'),0,this.$size);
        return value;
    }
    value.toBuffer('le').copy(this.$buf, pos, 0, 8);
    return value;
}
