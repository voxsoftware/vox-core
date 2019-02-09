var ierror=require("./internal_error.js");
var construct= module.exports= ierror("System.ArgumentException", false, function(Msg/*Paramname or Exception*/){
	if(arguments.length<=1){
		construct.$constructor.call(this,Msg||"ArgumentException")
	}
	else if(arguments.length==2){
		if(typeof arguments[1]=="string"){
			construct.$constructor.call(this,Msg||"ArgumentException")
			this.paramName= arguments[1]		
		}
		else{
			construct.$constructor.call(this,Msg||"ArgumentException", arguments[1])
		}
	}
	else{
		construct.$constructor.call(this,Msg||"ArgumentException", arguments[2])
		this.paramName= arguments[1]		
	}
})
