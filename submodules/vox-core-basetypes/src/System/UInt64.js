var big= require("../bn");
var UInt64;
var maxU64Big;
var toArrayLike= big.prototype.toArrayLike;
var U1;


big.prototype.inspect= function(){
	return this.toString()
}
UInt64=module.exports=function(){
	big.apply(this,arguments);

	
}

UInt64.prototype = Object.create(big.prototype);
UInt64.prototype.__constructor= UInt64;


UInt64._get= function(number){
	var str= number.toString()
	if(!this._int64){
		this._int64=new UInt64(null);
	}

	this._int64._init(str,10);
	return this._int64;
}
UInt64.prototype.validate=function(){
	if(!this.words){
		return;
	}
	if(this.bitLength()>64){
		throw new core.System.OverflowException("La operación produjo una excepción de desbordamiento");
	}

	
	if(this.negative!==0){
		throw new core.System.OverflowException("La operación produjo una excepción de desbordamiento");			
	}
	if(this.words.length>=3){
		if(this.words[2]>4095){
			throw new core.System.OverflowException("La operación produjo una excepción de desbordamiento");			
		}
	}
}
UInt64.prototype.toInt64= function(){

	if(this.words.length>=3 && this.words[2]>=2048){
		var ln= maxU64Big.clone();
		ln.isub(this);
		ln.iadd(U1);
		ln.negative=1;
		return ln;
	}
	return new core.System.Int64();
}




UInt64.prototype.toArrayLike= function(){
	if(arguments[1]==undefined){
		arguments[1]='le';
	}
	if(arguments[2]==undefined){
		arguments[2]=8;
	}

	return toArrayLike.apply(this, arguments);
}


UInt64.prototype.shiftLeft= this.shln;
/*function(bits){
	return this.shln(bits);
}*/

UInt64.prototype.shiftRight= this.shrn;
/*function(bits){
	return this.shrn(bits);
}*/



U1= new UInt64(1);
maxU64Big= UInt64.maxValue= new UInt64("18446744073709551615"); // [ 67108863, 67108863, 4095 ]
UInt64.minValue= new UInt64(0);// [ 0, 0, 0 ]
