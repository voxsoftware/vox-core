

/* Módulo para crear Servidor */
var Util= core.VW.Util
var http= require("http")
var https= require("https")
var express= require("express")
var bodyParser = require("body-parser")
var Url= require("url")
var EventEmitter= require("events").EventEmitter
var Tls= require("tls")
var VW= core.VW

core.VW.Http.ServerResponseExtender

var Server = module.exports= function(){
	EventEmitter.call(this)
	//this.$bodyparser1= bodyParser.urlencoded({ extended: false });
	//this.$bodyparser2= bodyParser.json();
	this.$useBodyParser= true;
	this.$paths=[];
	this.$port=0;
	this.$tasks= [];
	this.$reqs= [];
	this.$router2= express();
}
Server.requestSymbol= Symbol("@@vw:request");
Server.prototype= Object.create(EventEmitter.prototype);
Server.prototype.constructor= Server;


Server.bodyParser=bodyParser
Server.prototype.get_timeout= function(){
	return this.$timeout|| 60000;
}

Server.prototype.set_timeout= function(value){
	return this.$timeout=value|0;
}


Server.prototype.addStaticFolder= function(/*string */ uri, /*string*/folder){
	if(arguments.length<2){
		folder=uri;
		uri='';
	}

	this.$paths.push({uri:uri,folder:folder});

	/*this.$router2.use(uri,express.static(folder, {
		cacheControl: true,
		maxAge: 60*60*1000
	}));
	*/

	this.$staticServes= this.$staticServes||{}
	var server= this.$staticServes[uri]
	if(!server){
		server= new VW.Http.StaticServe.Server()
		this.$staticServes[uri]= server
	}
	server.addPath(folder)
	this.fallbackRouter.use(uri, server.handle.bind(server))
}




Server.prototype.getUri= function(url){
	return url;
}


Server.prototype.acceptAsync= function(){
	var task= new core.VW.Task()
	this.$tasks.push(task)
	this._revise()
	return task;
}



Server.getBodyParser= function(args, jsonargs){
	
	if(jsonargs==undefined){
		jsonargs= args
	}
	if(args==undefined){
		args={
			limit:'50mb',
			extended: true
		}
	}
	if(jsonargs==undefined){
		jsonargs= {
			limit:'50mb'
		}
	}
	var $bodyparser1,$bodyparser2

	//vw.info("aqui babesss")

	$bodyparser1= bodyParser.urlencoded(args);
	$bodyparser2= bodyParser.json(jsonargs);

	return function(args){
		$bodyparser1(args.request,args.response,function(){
			$bodyparser2(args.request, args.response, args.continue);
		});
	}

}

Server.prototype._handle= function(){
	var self= this;
	
	if(self.$useBodyParser){
		return function(req,res,next){
			
			if(self.$useBodyParser){
				
				
				if(!this.$_bodyParser)
					this.$_bodyParser= Server.getBodyParser(self.bodyParserArgs, self.bodyParserJsonArgs)
	
	
				this.$_bodyParser({
					request:req,
					response:res,
					continue:next
				})
				
	
			}else{
				next&&next();
			}
	
		}
	}
}


Server.prototype.get_router=function(){
	if(!this.$orouter){
		this.$orouter=  new core.VW.Http.Router(this); // express.Router();
		this.$router= this.$orouter.$router;
	}
	return this.$orouter;
}

Server.prototype._handle3= function(){
	var self= this;
	return function(req, res, next){
		req.uri= Url.parse(req.url);

		if(self.timeout)
			res.setTimeout(self.timeout);


		var arg= new core.VW.Http.RequestArgs(req,res,next)
		if(req.headers && req.headers.cookie)
			req.cookie= core.VW.Http.ServerCookie.fromString(req.headers.cookie)
		req[Server.requestSymbol]= arg;
		arg.httpServer= self
		
		if(self.acceptDelegate){
			self.acceptDelegate(arg)
		}
		else{
			self.$reqs.push(arg);
			self._revise()
		}
	}
}

Server.prototype._revise= function(){
	for(var i=0;i<Math.min(this.$reqs.length, this.$tasks.length);i++){
		var task= this.$tasks.shift()
		task.result= this.$reqs.shift()
		task.finish()
	}
}




Server.prototype.uses= function(){
	
}


Server.prototype.handleAll= function(){
	var self= this;

	return function(req,res,next){

		if(self.$router){
			return self.$router(req,res,next);
		}
		next();
	}
}

Server.prototype.prepare= function(){
	if(this.$prepared){
		return;
	}
	var self= this
	this.$app= express();
	if(this.$secure){
		this.$server= https.createServer(this.$options, function(req, res){
			self.$app(req, res)
		})
	}
	else{
		this.$server= http.createServer(this.$app)
	}


	var f= this._handle()
	if(f)
		this.$app.use(f);
	this.$app.use(this._handle3());


	//this.$app.use(this.$router);
	// this.$app.use(this._handle2());
	this.$app.use(this.handleAll());
	this.uses();

	// Las carpetas estáticas es lo último que mira
	this.$app.use(this.fallbackRouter.$router);
	this.$prepared= false;

}


Server.prototype.handle= function(args){
	return this.$app.handle(args.request,args.response)
}




Server.prototype.get_fallbackRouter=function(){
	if(!this.$orouter2){
		this.$orouter2=  new core.VW.Http.Router(this); // express.Router();
		//this.$router this.$orouter.$router;
	}
	return this.$orouter2;
}

Server.prototype.listen=Server.prototype.listenAsync= function(){

	this.prepare();


	var task= core.VW.Task.get(arguments);
	var self= this;
	try{
		this.$server.on("error", function(er){
			task.exception= er;
			task.finish();
		})
		this.$server.listen(this.$port, function(er){
			if(er){
				task.exception=er;
			}
			else{
				self.$port= self.$server.address().port;
			}
			task.finish();
		});
	}
	catch(e){
		task.exception=e;
		task.finish();
	}
	return task;
}


Server.prototype.get_innerServer= function(){
	return this.$server
}


Server.prototype.stop= function(){
	var task= new core.VW.Task()
	this.$server.close(function(err){
		if(err)
			task.exception= err
		task.finish()
	})
	return task
}

Server.prototype.close=Server.prototype.stop


/*
Server.prototype.get_router= function(){
	return this.$router;
}
*/

Server.prototype.get_useBodyParser= function(){
	return this.$useBodyParser;
}

Server.prototype.set_useBodyParser= function(value){
	return this.$useBodyParser=value;
}

Server.prototype.get_port= function(){
	return this.$port;
}
Server.prototype.set_port= function(port){
	return this.$port=port;
}


Server.prototype.get_path= function(){
	return this.$path;
}

Server.prototype.set_path= function(path){
	if(this.$path==path){
		return;
	}

	this.$path= path;
	this.addStaticFolder(path);
}


Util.createProperties(Server, Server.prototype);
