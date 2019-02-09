var big= require("../bn");
var Int64;
var maxU64Big=core.System.UInt64.maxValue;
var toArrayLike= big.prototype.toArrayLike;
var U1;


Int64=module.exports=function(){
	big.apply(this,arguments);
	this.validate();	

}



Int64.prototype = Object.create(big.prototype);
Int64.prototype.__constructor= Int64; 


Int64._get= function(number){
	var str= number.toString()
	if(!this._int64){
		this._int64=new Int64(null);
	}

	this._int64._init(str,10);
	return this._int64;
}


Int64.prototype.validate= function(){
	if(!this.words){
		return;
	}
	if(this.bitLength()>64){
		throw new core.System.OverflowException("La operación produjo una excepción de desbordamiento");
	}


	if(this.words.length>=3){
		if(this.negative!==0){
			if(this.words[2]>2048){
				throw new core.System.OverflowException("La operación produjo una excepción de desbordamiento");			
			}
			else if(this.words[2]==2048 && (this.words[0]>0||this.words[1]>0)){
				throw new core.System.OverflowException("La operación produjo una excepción de desbordamiento");				
			}
		}
		else{
			if(this.words[2]>=2048){
				throw new core.System.OverflowException("La operación produjo una excepción de desbordamiento");			
			}
		}
	}
}

Int64.prototype.toUInt64= function(){
	var ln= this.clone();
	ln.iadd(U1);
	ln.negative=0;
	ln= maxU64Big.sub(ln);
	return ln;
}



Int64.prototype.toArrayLike= function(){
	if(arguments[1]==undefined){
		arguments[1]='le';
	}
	if(arguments[2]==undefined){
		arguments[2]=8;
	}

	if(this.negative!==0){
		// Transformar a número positivo ...
		var ln= this.toUInt64();
		return toArrayLike.apply(ln, arguments);
	}
	return toArrayLike.apply(this, arguments);
}


Int64.prototype.shiftLeft= function(bits){
	if(this.words.length==2){
		var w2= this.words[1];
		var w1= this.words[0];
		var wi=false;
		if(this.negative!==0 && (w2==32 && w1==0)){
			wi= true;
		}
		else if(w2<=31){
			wi=true;
		}

		if(wi){
			return new Int64((67108864*w2 + w1)<<bits);
		}
	}

	if(this.negative!==0){
		var res=this.ushln(bits);
		res.iadd(U1);
		res.negative=1;
		return res;
	}

	return this.shln(bits);
}

Int64.prototype.shiftRight= function(bits){
	if(this.words.length==2){
		var w2= this.words[1];
		var w1= this.words[0];
		var wi=false;
		if(this.negative!==0 && (w2==32 && w1==0)){
			wi= true;
		}
		else if(w2<=31){
			wi=true;
		}

		if(wi){
			return new Int64((67108864*w2 + w1) >>bits);
		}
	}

	if(this.negative!==0){
		this.negative=0;
		var res=this.ushrn(bits);
		res.negative=0;
		res.iadd(U1);
		res.negative=1;
		return res;
	}

	return this.shrn(bits);
}



U1=new Int64(1);
Int64.maxValue= new Int64("9223372036854775807"); // [ 67108863, 67108863, 2047 ]
Int64.minValue= new Int64("-9223372036854775808");// [ 0, 0, 2048 ]

// 2147483647 int.maxvalue [ 67108863, 31 ]
// -2147483648 int.minvalue [0, 32]