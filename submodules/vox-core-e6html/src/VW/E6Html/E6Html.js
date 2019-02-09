

/**
* James! (08-03-2016)
* Módulo para leer y usar archivos E6Html
*/

var fs= require("fs");
var he= require("./HtmlEncode.js")
var o= Symbol("E6Html");
var info;
var E6Html= module.exports=function(file){
	this.$file=file;
	//this.parser= new core.VW.E6Html.Parser();
	//this.compile();
	info[file]=this;
}
/*
for(var id in he){
	E6Html[id]= he[id];
}
*/
info= E6Html[o]= {};



E6Html.base64decode= function(/*string */text, context){
	if(context &&context.transform){
		text= context.transform(text);
	}
	return new Buffer(text,'base64');
}

E6Html.encode= function(/*string */text, context){
	if(context &&context.transform){
		text= context.transform(text);
	}
	return he.encode(text);
}




E6Html.get= function(file){

	if(!info[file]){
		info[file]= new E6Html(file);
	}
	return info[file];
}

E6Html.prototype.invoke= function(context){
	if(!this.$compiledTime ){
		this.compile()
	}
	else if(this.$compiledTime<= Date.now()-5*60000){
		this.compileAsync()
	}
	if(!context){
		// La salida va a la consola ...
		context= E6Html.createConsoleContext();
	}
	var e
	if(this.lastError){
		e= this.lastError
		this.lastError=null
		throw e
	}
	
	context.arguments= context.arguments||{}
	context.e6html= this;
	var func= this.$func(context);
	//context.response.write(func.toString())
	return func();
}

E6Html.createConsoleContext= function(){
	return new core.VW.E6Html.ConsoleContext()
}

E6Html.prototype.compile= function(){
	var time= this.$compiledTime;
	var stat= fs.statSync(this.$file);
	if(!time || stat.mtime.getTime()>time){
		this.$compiledTime= Date.now()
		this._compile();
	}
}


E6Html.prototype.compileAsync= function(){
	var time= this.$compiledTime,self= this
	self.$compiledTime= Date.now()
	var stat= fs.stat(this.$file, function(er, stat){
		if(er)
			return self.lastError= er
			
		if(!time || stat.mtime.getTime()>time){
			//self.$compiledTime= stat.mtime;
			self._compile();
		}
	})
	
}


E6Html.prototype._compile=function(){
	var parser= new core.VW.E6Html.Parser();
	var code= parser.parse(fs.readFileSync(this.$file));
	this.$compiled= code;
	//console.info(code.code)
	this.$func= eval(code.code);
	code= null;
}
