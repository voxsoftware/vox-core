var E6HtmlFolder= core.VW.E6Html.E6HtmlFolder;
var ViewManager= module.exports= function(/*Server*/server, /*string */folder){
	this.$server= server;
	E6HtmlFolder.call(this,folder);
}

ViewManager.prototype= Object.create(E6HtmlFolder.prototype);
ViewManager.prototype.constructor= ViewManager;


ViewManager.prototype.render= function(section,args,viewargs){
	return this.include(section,args,viewargs?{arguments:viewargs}:undefined).then(function(){
		var response= args.response;
		if(response.end){
			response.end();
		}
	});
}


ViewManager.prototype.include= function(section, args, options){
	if(!args.request || !args.response){
		throw new core.System.Exception("Se debe especificar la propiedad 'request' y 'response' en el argumento args" );
	}
	options= options|| {};
	var context= this.$server.createContext(args.request,args.response,args.continue);
	context.viewManager= this;
	context.arguments= options.arguments;
	if(options.context){
		context.parent= options.context;
	}
	context.name= section;

	var file= this.get(section);
	file.compile();
	return file.invoke(context);
}

