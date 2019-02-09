global.regeneratorRuntime= require("./runtime")
var Parser= module.exports= function(ast){
	this.ast= ast 
}

//Parser.generator=generator;
Parser.esprima=Parser.ecmaParser= new Parser(true)
Parser.plugins=[
]


var Babel 

Parser.prototype.parseASTAndGenerate= function(ast,options){
	if(!Babel)
		Babel= require("@babel/core")
	var preset= require.resolve("@babel/preset-env")
	
	if(!options){
		options={
			presets: [preset],
			sourceMaps: true,
			comments: false
		}
	}
	return Babel.transformFromAst(ast, options)
}


Parser.prototype.parse= function(code, options){
	if(!Babel)
		Babel= require("@babel/core")
	
	var preset= require.resolve("@babel/preset-env")
	
	if(this.ast)
		return Babel.parse(code, options)
	
	if(!options){
		options={
			presets: [preset],
			sourceMaps: true,
			comments: false
		}
	}
	var cmp=Babel.transform(code, options)
	if(this.ast)
		return cmp.ast 
	return cmp
	
}