

String.prototype.padLeft= function(/*int*/size, /*char*/c){
	c=c[0];
	var str= this,ret;
	if(str.length<size){
		ret='';
		for(var i=0;i<size-str.length;i++){
			ret+= c;
		}
		ret+= str;
		return ret;
	}
	return str;
}

if(!String.prototype.endsWith){
	String.prototype.endsWith= function(/*string */str){
		str= (str||"").toString()
		return this.substring(this.length- str.length, this.length)===str
	}
}
if(!String.prototype.startsWith){
	String.prototype.startsWith= function(/*string */str){
		str= (str||"").toString()
		return this.substring(0, str.length)===str
	}
}

String.prototype.padRight= function(/*int*/size, /*char*/c){
	c=c[0];
	var str= this;
	if(str.length<size){
		var l= str.length;
		for(var i=0;i<size-l;i++){
			str+= c;
		}
	}
	return str;
}