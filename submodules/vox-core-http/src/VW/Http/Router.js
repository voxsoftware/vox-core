
var express= require("express");
var Server = core.VW.Http.Server;
var methods;


try{
	methods= require("methods");
}catch(e){
	methods= require("express/node_modules/methods");
}

var Router= module.exports=function(server){
	this.$server= server;
	this.$router= express.Router();
}


Router.prototype.handle= function(args){
	return this.$router.handle(args.request,args.response)
}


Router.prototype.use= function(prefix,callback){
	var call= callback||prefix;
	if(!callback){
		prefix=undefined;
	}


	this.$router.use(prefix, function(req,res,next){
		var args
		if(call){
			args=req[Server.requestSymbol];
			//vw.log("aaaaaarggggs",args)
			args.continue= next;
			try{
				var result= call(args);
				args.returnValue= result
				if(result && (typeof result.catch =="function")){
					// PROMISE ...
					result.catch(function(er){
						res.emit("error", er)
					})
				}
			}
			catch(e){
				res.emit("error", e)
			}
		}
	})
}

Router.prototype.all= function(prefix, callback){
	var call= callback||prefix;
	if(!callback){
		prefix=undefined;
	}

	this.$router.all(prefix, function(req,res,next){
		if(callback){
			var args=req[Server.requestSymbol];
			args.continue= next;
			try{
				var result= callback(args);
				if(result && (typeof result.catch =="function")){
					// PROMISE ...
					result.catch(function(er){
						res.emit("error", er)
					})
				}
			}
			catch(e){
				res.emit("error", e)
			}
		}
	})
}


methods.forEach(function(method){
	Router.prototype[method]= function(prefix, callback){
		var call= callback||prefix;
		if(!callback){
			prefix=undefined;
		}

		this.$router[method](prefix, function(req,res,next){
			var args
			if(call){
				args=req[Server.requestSymbol];
				//vw.info("argggggggs:",args)
				args.continue= next;
				try{
					var result= call(args)
					args.returnValue= result
					if(result && (typeof result.catch =="function")){
						// PROMISE ...
						result.catch(function(er){
							res.emit("error", er)
						})
					}
				}
				catch(e){
					res.emit("error", e)
				}
			}
		})
	}
})
