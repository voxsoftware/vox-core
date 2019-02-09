
var RequestArgs=module.exports=function(req,res,next){
	if(arguments.length>0){
		this.request=req;
		this.response=res;
		this.continue=next;
	}

	this.continueAsync=this._continueAsync.bind(this)
}




RequestArgs.fromSocket= function(req, socket, head, next){
	var r= new RequestArgs()
	r.request= req
	r.socket= socket
	r.response= socket
	r.head= head
	r.continue= next
	return r
}

RequestArgs.fromHttp= function(req, res, next){
	return new RequestArgs(req, res, next)
}


RequestArgs.prototype.asyncFromCallback= function(delegate){
	return function(){
		var task= new core.VW.Task()
		var args= Array.prototype.slice.call(arguments,0,arguments.length)
		args.push(function(){
			task.finish()
		})
		delegate.apply(delegate, args)
		return task
	}
}

RequestArgs.prototype._continueAsync= function(){
	this.continue &&this.continue()
	return this.returnValue
}

RequestArgs.prototype.dispose= function(){
	delete this.request[core.VW.Http.Server.requestSymbol]
	/*for(var id in this){
		delete this[id]
	}
	delete this
	*/
}


RequestArgs.prototype.rehandle= function(){
	if(this.httpServer)
		this.httpServer.handle(this)
}

RequestArgs.prototype.catch= function(callback){
	this.beginCatch(callback);
	return this.endCatch();
}


RequestArgs.prototype.beginCatch= function(callback){
	var task= core.VW.Task.get(arguments);
	var res= this.response;
	task.data=this;
	var self= this;

	res.on("finish", function(){
		if(self.$yet){
			return;
		}
		self.$yet=true;
		self.$catchfinish= true;
		self.$catched&& task.finish();
	});

	res.on("timeout", function(){
		if(self.$yet){
			return;
		}
		self.$yet=true;
		task.exception= new core.VW.TimeoutException("Se acabó el tiempo de espera");
		self.$catchfinish= true;
		self.$catched&& task.finish();
	});

	res.on("error", function(er){
		if(self.$yet){
			return;
		}
		self.$yet=true;
		if(er instanceof Error)
			task.exception= er
		else
			task.exception= new core.System.Exception(er.message||er, er instanceof Error ? er : null);
		self.$catchfinish= true;
		self.$catched&& task.finish();
	})
	self.$catch= task;

	if(callback){
		try{
			callback();
		}
		catch(e){
			res.emit("error", e);
		}
	}
}

RequestArgs.prototype.endCatch= function(){

	var task= this.$catch;
	if(this.$catchfinish){
		setImmediate(function(){
			task.finish();
		});
	}
	this.$catched=true;
	return task;
}
