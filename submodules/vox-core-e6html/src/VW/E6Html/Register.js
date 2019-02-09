
var fs= require("fs");

/** Este archivo registra la extensión .es6.js */
var Register=module.exports= function(){
}


Register.extensions= [
	".html"
]



Register.register= function(){
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
		p=Register.parser= new core.VW.E6Html.Parser();
	}
	var raw = fs.readFileSync(filename, 'utf8');
	raw = (raw.charCodeAt(0) === 0xFEFF) ? raw.substring(1) : raw
	var answer = p.parse(raw)
	//sourceMaps[filename] = answer.sourceMap
	module._compile("module.exports= " + answer.code, filename);


	var func=module.exports(core.VW.E6Html.E6Html.createConsoleContext());
	module.exports={};
	return func();
}