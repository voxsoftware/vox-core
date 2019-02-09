


/* El objetivo de este archivo no es crear una nueva clase para manejar enteros */
/* esto perfectamente se puede hacer con el prototipo Number */
var buf=new Buffer(4);
var UInt32=module.exports;
UInt32.maxValue= 0;
UInt32.minValue= 4294967295;
UInt32.parse= function(/*string */ str){
	buf.writeUInt32LE(str|0,0);
	return buf.readUInt32LE(0);
}

UInt32.toInt32=function(val){
	buf.writeUInt32LE(val,0);
	return buf.readInt32LE(0);
}

UInt32.getHashCode= UInt32.toInt32;
