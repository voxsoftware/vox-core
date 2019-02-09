

System=require("../System.js");
/* El objetivo de este archivo no es crear una nueva clase para manejar Single */
/* esto perfectamente se puede hacer con el prototipo Number */
var buf=new Buffer(4);
var Single=module.exports;
Single.maxValue= 3.40282347E+38;
Single.minValue= -3.40282347E+38;
Single.parse= function(/*string */ str){
	buf.writeFloatLE(Number(str),0);
	return buf.readFloatLE(0);
}

Single.toInt32=function(val){
	buf.writeFloatLE(val,0);
	val=buf.readFloatLE(0);
	val=val|0;
	if(val>System.Int32.maxValue||val<System.Int32.minValue){
		return buf.readInt32LE(0);
	}
	else{
		return val;
	}
}

Single.getHashCode= Single.toInt32;
