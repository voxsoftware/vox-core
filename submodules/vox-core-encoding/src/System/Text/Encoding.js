

/* James Suárez */
/* 04-10-2016 */
// Este es un port de System.Text.Encoding de .NET
// Por ahora no soporta todos los métodos ..


var base64;
var Encoding;
var ArgumentNull=Error; //require("../System/ArgumentNull.js");
var iconv=require("iconv-lite");
var nativeEncodings=["ascii","utf8","utf16le","ucs2","base64","binary","hex"];

Encoding=module.exports=function(encoding){
	this.nativeEncoding=nativeEncodings.indexOf(encoding)>=0;
	this.$encoding=encoding;
	this.encodingName=encoding;

	if(!this.nativeEncoding){
		this.encoder= iconv.getEncoder(encoding);
		this.decoder= iconv.getDecoder(encoding);
	}
};



var unicodegetter=function(){
	if(!unicodegetter.enc){
		unicodegetter.enc=new Encoding('utf16le');
	}
	return unicodegetter.enc;
}
Encoding.__defineGetter__('utf16',unicodegetter);
Encoding.__defineGetter__('UTF16',unicodegetter);
Encoding.__defineGetter__('unicode',unicodegetter);


var utf7getter=function(){
	if(!utf7getter.enc){
		utf7getter.enc=new Encoding('utf7');
	}
	return utf7getter.enc;
}
Encoding.__defineGetter__('utf7',utf7getter);
Encoding.__defineGetter__('UTF7',utf7getter);


var utf32getter=function(){
	if(!utf32getter.enc){
		utf32getter.enc=new Encoding('utf32');
	}
	return utf32getter.enc;
}
Encoding.__defineGetter__('utf32',utf32getter);
Encoding.__defineGetter__('UTF32',utf32getter);

var utf8getter=function(){
	if(!utf8getter.enc){
		utf8getter.enc=new Encoding('utf8');
	}
	return utf8getter.enc;
}
Encoding.__defineGetter__('utf8',utf8getter);
Encoding.__defineGetter__('UTF8',utf8getter);


var asciigetter=function(){
	if(!asciigetter.enc){
		asciigetter.enc=new Encoding('ascii');
	}
	return asciigetter.enc;
}
Encoding.__defineGetter__('ascii',asciigetter);
Encoding.__defineGetter__('ANSI',asciigetter);
Encoding.__defineGetter__('ASCII',asciigetter);





Encoding.convert =function(/* Encoding */ src, /* Encoding */ dest, /* Buffer */ bytes, /* [optional] int*/index, /* [optional] int*/ count){
	if(arguments.length<=3){
		index=0;
		count=bytes.length;
	}
	return dest.getBytes(src.getString(bytes,index,count));
}



/* INTERNAL */
Encoding.prototype.encode= function(str,bytes,startindex){
	var buf=this.encoder.write(str);
	var buf2=this.encoder.end();
	if(buf2 && buf2.length>0){
		buf=Buffer.concat([buf,buf2]);
		buf2=undefined;
	}

	if(!bytes){
		return buf;
	}

	buf.copyTo(bytes,startindex,0,startindex+buf.length);
	buf=null;
	return bytes.length;
}


Encoding.prototype.decode= function(buf,index,count){
	if(index>0 || count>-1){
		buf=buf.slice(index,index+count);
	}
	var res = this.decoder.write(buf);
    var trail = this.decoder.end();
	return trail ? (res + trail) : res

}




Encoding.prototype.getByteCount=function(/* string */str, /* [optional] int*/ index, /* [optional] count*/ count){
	if(str==null){
		throw new ArgumentNull("str", "str no puede ser nulo")
	}
	str=str.toString();
	if(arguments.length>1){
		str=str.substring(index,index+count);
	}

	if(this.$encoding=="base64"){
		if(!base64){
			base64=require("../System/internal_base64.js");
		}
		str= base64.processstr(str);
	}
	
	if(this.nativeEncoding){
		return Buffer.byteLength(str);
	}

	// Por ahora no hay mejor manera de hacer esto ...
	//this.laststr=str;
	//this.lastbyte=
	this.getBytes(str,index,count).length;
}


/** @return Buffer */
Encoding.prototype.getBytes=function(/* string */str, /* [optional] int*/ index, /* [optional] count*/ count, /* [optional] buffer */ bytes,/* [optional] int */ startindex){


	if(str==null){
		throw new ArgumentNull("str", "str no puede ser nulo")
	}
	str=str.toString();
	if(arguments.length>1){
		str=str.substring(index|0,index+count|0);
	}


	if(this.$encoding=="base64"){
		if(!base64){
			base64=require("../System/internal_base64.js");
		}
		str= base64.processstr(str);
	}

	//this.laststr='';
	startindex=startindex|0;
	if(this.nativeEncoding){
		var ri=false;
		var len= Buffer.byteLength(str,this.$encoding);
		if(!bytes){
			bytes=new Buffer(len);
			ri=true;
		}
		bytes.write(str,startindex,bytes.length-startindex,this.$encoding);
		return ri?bytes:len;
	}

	// Por ahora no hay mejor manera de hacer esto ...
	return this.encode(str, bytes, startindex);
}



Encoding.prototype.getString=function(/* Buffer */bytes, /* [optional] int*/ index, /* [optional] count*/ count){
	if(arguments.length==1){
		index=0;
		count=bytes.length;
	}
	if(this.nativeEncoding){
		return bytes.toString(this.$encoding,index,index+count);
	}
	return this.decode(bytes,index,count);
}
