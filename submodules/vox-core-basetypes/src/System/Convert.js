

var Convert;
var base64=require("./internal_base64");
//var TypeCode=require("./TypeCode.js");
//var iconvert=require("./internal-converts");
Convert=module.exports=function(){
}


var DBNullClass=function(){}
Convert.DBNull= new DBNullClass();

Convert.isDBNull=function(val){
	return val instanceof DBNullClass;
}
Convert.changeType=function(/* object*/value, /* TypeCode*/ typeCode, /* [optional] TypeCode */ destTypeCode){

	if(arguments.length<3){
		destTypeCode=typeCode;
		typeCode= undefined; //Convert.internal_gettypecode(value);
	}

	if(typeCode!=undefined){
		typeCode=TypeCode.internalConverts[typeCode];
	}

	if(value==null && (destTypeCode==TypeCode.Empty||destTypeCode==TypeCode.String||destTypeCode==TypeCode.Object)){
		return null;
	}

	if(destTypeCode==TypeCode.Object){
		return value;
	}
	if(destTypeCode==TypeCode.String){
		return String(value);
	}
	if(destTypeCode==TypeCode.Boolean){
		return Convert.toBoolean(value);
	}

	if(destTypeCode==TypeCode.Char){
		return String(value)[0];
	}
	if(destTypeCode==TypeCode.DateTime||destTypeCode==TypeCode.DBNull){
		throw new Error("No ha sido implementado todavía");
	}
	return iconvert.convert(value, typeCode, TypeCode.internalConverts[destTypeCode]);
}


Convert.fromBase64String= function(/* string */ str){
	str=base64.processstr(str);
	return new Buffer(str,'base64');
}

Convert.toBoolean=function(/* variant */ val){
	if(typeof val=="boolean"){
		return val;
	}
	if(typeof val=="number"){
		return val!=0;
	}
	if(typeof val=="string"){
		val=val.toLowerCase()=="true"?true: (val.toLowerCase()=="false"?false: null);
		if(val==null){
			throw new Error("El valor no se puede convertir a boolean");
		}
		return val;
	}

	if(val instanceof Date){
		if(isNaN(val.getYear())){
			return false;
		}
		return true;
	}

	if(val instanceof System.Int64 || val instanceof System.Int32){
		return val.toString()!=0;
	}

	return !!val;
}


Convert.toByte= function(val){
	return iconvert.convert(val,undefined,1);
}

Convert.toDouble= function(val){
	return iconvert.convert(val,7,7);
}

Convert.toInt16= function(val){
	return iconvert.convert(val,undefined,3);
}


Convert.toInt32= function(val){
	return iconvert.convert(val,undefined,5);
}

Convert.toInt64= function(val){
	return iconvert.convert(val,undefined,8);
}

Convert.toSByte= function(val){
	return iconvert.convert(val,undefined,0);
}


Convert.toSingle= function(val){
	return iconvert.convert(val,undefined,6);
}


Convert.toString= function(val){
	return String(val);
}


Convert.toUInt16= function(val){
	return iconvert.convert(val,undefined,2);
}

Convert.toUInt32= function(val){
	return iconvert.convert(val,undefined,4);
}

Convert.toUInt64= function(val){
	return iconvert.convert(val,undefined,9);
}





Convert.toBase64String= function(/* buffer */ bytes, /* [optional] int*/offset,/*[optional] int*/ count, /* [optional] Base64FormattingOptions */ options){
	//var base64='';
	var insertLine=false;
	if(typeof offset =="object" ){
		insertLine=offset.value==1;
	}
	else{
		if(options){
			insertLine=options.value==1;
		}
	}

	offset=offset|0;
	count=count|0;
	if(count==0){
		count=bytes.length;
	}

	if(insertLine){
		return base64.encode(bytes, offset, count, true);
	}
	else{
		return bytes.toString('base64',offset,count+offset);
	}
}
