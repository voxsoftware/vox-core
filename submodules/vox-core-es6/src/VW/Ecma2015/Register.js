
var fs= require("fs");

/** Este archivo registra la extensión .es6.js */
var Register=module.exports= function(){
}


Register.extensions= [
	".es6.js",
	".es6",
	".vw6"
]

Register.init= function(){
	//global.Symbol= Symbol
	//global.Symbol.iterator= new Symbol();
	var iterator= core.VW.Ecma2015.ArrayIterator;
	Array.prototype[Symbol.iterator]= function(){
		return new iterator(this);
	}
	Register.inited=true;
}

Register.register= function(){

	if(!Register.inited){
		Register.init();
	}


 	
	if(require.extensions){
		for(var i=0;i<Register.extensions.length;i++){
			var ext= Register.extensions[i];
			require.extensions[ext]= Register.loadFile;
		}
	}
	
}


Register.loadFile= function(module,filename){
	var p=Register.parser;
	if(!p){
		p=Register.parser= new core.VW.Ecma2015.Parser();
	}
	var raw = fs.readFileSync(filename, 'utf8');
	raw = (raw.charCodeAt(0) === 0xFEFF) ? raw.substring(1) : raw
	try{
		var answer = p.parse(raw)
		return module._compile(answer.code, filename);
	}
	catch(e){
		if(e instanceof core.VW.Ecma2015.ParseException)
			throw e

		var er= new core.VW.Ecma2015.ParseException("Error al compilar " + filename + ". " + e.message, e)
		for(var id in e){
			er[id]= e[id]
		}
		throw er
	}
}