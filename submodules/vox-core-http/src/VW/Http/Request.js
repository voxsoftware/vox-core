
var EventEmitter= require("events").EventEmitter
var request= core.VW.Http.LowLevelRequest//require("request");

var Util= core.VW.Util;
var Request= module.exports= function(/*Uri*/uri){
	EventEmitter.call(this)
	this.headers={};
	if(uri){
		this.set_address(uri);
	}

	this.$validateStatusCode= true
}

Request.prototype = Object.create(EventEmitter.prototype);
Request.prototype.__proto__=EventEmitter.prototype

Request.get_defaultCookie= function(){
	if(!Request.jar)
		Request.jar= request.jar()
	return Request.jar
}


Request.inBrowser= function(){
	/* Espécifico de browser */

	Request.prototype.set_withCredentials= function(val){
		this.$withCredentials= val
	}

	Request.prototype.set_form= function(/*jQuery */ Form){
		this.literal= false
		if(global.FormData && Form instanceof FormData){
			this.literal= true
			this.body= Form
			this.contentType= "multipart/form-data"
		}
		else if(Form.find("input[type=file]").length>0){
			var data= new FormData()
			// multipart ...
			this.literal= true

			Form.find("input[type=file]").each(function(){
				var tag= this
				for(var i=0;i<this.files.length;i++){
					data.append(this.name, this.files[i])
				}
			})

			var params= Form.serializeArray()
			params.forEach(function(val){
				data.append(val.name, val.value)
			})

			this.body= data
			this.contentType= "multipart/form-data"
		}
		else{
			var data={}
			var params= Form.serializeArray()
			params.forEach(function(val){
				data[val.name]= val.value
			})
			this.body= data
		}

		// Method.
		if(typeof Form.attr=="function"){
			var method= Form.attr("method")
			var action= Form.attr("action")
			if(method!==undefined)
				this.method= method
			if(action!=undefined)
				this.address= action
		}
	}
}

Request.prototype.get_innerRequest= function(){
	return this.originalReq
}

Request.prototype.getResponse= function(){
	throw new core.System.NotImplementedException("Utilice getResponseAsync");
}


Request.prototype.beginGetResponse= function(){
	if(this.$rtask)
		throw new core.System.Exception("Hay una respuesta pendiente. Ejecute `endGetResponse`")
	this.$rtask= this.getResponseAsync()
}

Request.prototype.endGetResponse= function(){
	var r= this.$rtask
	this.$rtask=undefined
	if(!r)
		throw new core.System.Exception("Debe llamar primero a `beginGetResponse`")
	return r
}
Request.prototype.get_followRedirect= function(val){
	return this.$redirect===undefined? true: this.$redirect
}

Request.prototype.set_followRedirect= function(val){
	this.$redirect= val
}

Request.prototype.get_cookie= function(){
	return this.$cookie
}
Request.prototype.set_cookie= function(val){
	return this.$cookie=val
}



Request.prototype.getResponseAsync= function(){

	if(this.$date){
		this.headers["Last-modified"]= this.$date.JSDate.toUTCString();
		this.headers["Date"]= this.$date.JSDate.toUTCString();
	}

	//vw.info("REDIRECT: ", this.$redirect)
	var options= {
		url: this.uri.toString(),
		"method":this.$method,
		"headers": this.headers,
		"timeout": this.$timeout,
		"followRedirect": this.$redirect
	}

	if(this.responseType)
		options.responseType= this.responseType

	options.events= this.events
	if(this.$auth){
		options.auth= this.$auth
	}

	if(this.$encoding){
		options.encoding= this.$encoding
	}

	if(this.literal){
		options.body= this.$body
	}
	else{

		if(this.contentType && this.contentType.indexOf("application/json")>=0)
			options.json= this.$body
		else if(this.contentType && this.contentType.indexOf("multipart/form-data")>=0)
			options.formData= this.$body
		else
			options.form= this.$body
	}

	if(this.$withCredentials!==undefined)
		options.withCredentials= this.$withCredentials

	if(this.$proxy)
		options.proxy=this.$proxy
	



	if(this.moreOptions){
		for(var id in this.moreOptions){
			options[id]= this.moreOptions[id]
		}
		
	}
	

	/*
	var jar= Request.defaultCookie
	var cookie= request.cookie(this.$cookie)
	vw.log(this.$cookie)
	jar.setCookie(cookie, options.url)
	options.jar= jar
	*/
	if(this.$cookie && this.$cookie.getJar)
		options.jar= this.$cookie.getJar(options.url)



	var task= core.VW.Task.get(arguments)
	var self= this

	var processResponse= function(response, body){
		var code=response?response.statusCode:undefined, e
		response.statusCode= core.VW.Http.HttpStatusCode.parse(response.statusCode);
		self.innerResponse= response
		if(!response.statusCode)
			response.statusCode= core.VW.Http.HttpStatusCode.create("Other", code)

		response.body= body
		task.result= response

		if(this.$validateStatusCode){
			if(code >=400 && code <600){
            	e= new core.VW.Http.RequestException("El servidor devolvió código de error " + code + ": " + response.statusCode.toString())
            	e.statusCode= response.statusCode
            	e.body= response.body
				task.exception= e
			}
		}

		self.emit("response", response)
	}
	var processFunction= function(err, response, body){


		if(err){
			e= new core.VW.Http.RequestException(err.message, err)
			e.code= err.code
			task.exception= e
			task.finish()
			return
		}


		processResponse(response, body)
		task.finish()
	}

	if(this.analizeResponse){
		this.originalReq= request(options, processFunction)
	}
	else{
		this.originalReq= request(options)
		this.originalReq.on("error", processFunction)
		this.originalReq.on("response", processResponse)
		this.originalReq.on("finish", task.finish.bind(task))
	}



	/*

	if(this.autosend)
		this.originalReq.end()
	*/
	return task;
}


Request.prototype.get_autosend= function(){
	return this.$autosend !== undefined ? this.$autosend:true;
}

Request.prototype.set_autosend= function(v){
	return this.$autosend = v
}


Request.prototype.get_analizeResponse= function(){
	return this.$analizeResponse !== undefined ? this.$analizeResponse:true;
}

Request.prototype.set_analizeResponse= function(v){
	return this.$analizeResponse = v
}

Request.prototype.get_auth= function(){
	return this.$auth;
}

Request.prototype.set_auth= function(val){
	return this.$auth=val;
}

Request.prototype.get_proxy= function(){
	return this.$proxy
}

Request.prototype.set_proxy=function(val){
	this.$proxy=val
}


Request.prototype.get_validateStatusCode= function(){
	return this.$validateStatusCode;
}

Request.prototype.set_validateStatusCode= function(val){
	return this.$validateStatusCode=val;
}


Request.prototype.get_encoding= function(){
	return this.$encoding;
}

Request.prototype.set_encoding= function(val){
	return this.$encoding=val;
}


Request.prototype.get_body= function(){
	return this.$body;
}

Request.prototype.set_body= function(val){
	return this.$body=val;
}



Request.prototype.get_accept= function(){
	return this.headers["accept"];
}

Request.prototype.set_accept= function(val){
	return this.headers["accept"]=val;
}


Request.prototype.get_address= function(){
	return this.uri;
}

Request.prototype.set_address= function(uri){
	return this.uri= uri;
}

Request.prototype.get_connection= function(){
	return this.headers["connection"];
}

Request.prototype.set_connection= function(val){
	return this.headers["connection"]=val;
}

Request.prototype.get_contentLength= function(){
	return this.headers["content-length"];
}

Request.prototype.set_contentLength= function(val){
	return this.headers["content-length"]=val;
}


Request.prototype.get_date= function(){
	return this.$date;
}

Request.prototype.set_date= function(val){
	return this.$date=val;
}

Request.prototype.get_expect= function(){
	return this.headers["expect"];
}

Request.prototype.set_expect= function(val){
	return this.headers["expect"]=val;
}


Request.prototype.get_contentType= function(){
	return this.headers["content-type"];
}

Request.prototype.set_contentType= function(val){
	return this.headers["content-type"]=val;
}

Request.prototype.get_host= function(){
	return this.headers["host"];
}

Request.prototype.set_host= function(val){
	return this.headers["host"]=val;
}


Request.prototype.get_ifModifiedSince= function(){
	return this.headers["if-modified-since"];
}

Request.prototype.set_ifModifiedSince= function(date){
	return this.headers["if-modified-since"]=date;
}

Request.prototype.get_forever= function(){
	return !!(this.moreOptions&&this.moreOptions.forever)
}

Request.prototype.set_forever= function(){
	this.moreOptions=this.moreOptions||{}
	this.moreOptions.forever= true
	//return !!(this.moreOptions&&this.moreOptions.forever)
}


Request.prototype.get_keepAlive= function(){
	return this.headers["keep-alive"]=="true";
}

Request.prototype.set_ifModifiedSince= function(val){
	return this.headers["keep-alive"]=val.toString();
}


Request.prototype.get_method= function(){
	return this.$method;
}

Request.prototype.set_method= function(val){
	return this.$method=val.toString();
}




Request.prototype.get_referer= function(){
	return this.headers["referer"];
}

Request.prototype.set_referer= function(val){
	return this.hyeaders["referer"]=val.toString();
}



Request.prototype.get_requestUri= function(){
	return this.uri;
}


Request.prototype.get_timeout= function(){
	return this.$timeout;
}

Request.prototype.set_timeout= function(val){
	return this.$timeout=parseInt(val)
}



Request.prototype.get_userAgent= function(){
	return this.headers["user-Agent"];
}

Request.prototype.set_userAgent= function(val){
	return this.headers["user-Agent"]=val.toString();
}

if(core.VW.Http._inbrowser){
	Request.inBrowser()
}

Util.createProperties(Request,Request.prototype);


// Crear métodos estáticos para ciertos métodos HTTP
var methodNameLookup = {
	'post'  : 'POST',
	'put'   : 'PUT',
	'patch' : 'PATCH',
	'head'  : 'HEAD',
	'del'   : 'DELETE',
	'get'   : 'GET'
}

for(var id in methodNameLookup){
	Request[id]= (function(method){
		return function(uri){
			var r= new Request(uri)
			r.method= method
			return r
		}
	})(methodNameLookup[id])
}
