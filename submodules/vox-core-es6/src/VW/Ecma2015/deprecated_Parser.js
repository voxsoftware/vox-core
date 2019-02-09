global.regeneratorRuntime= require("./runtime")

var esprima= core.VW.Ecma2015.Regenerator["esprima-fb"];//require("esprima");
var generator= require("escodegen");


var Parser= module.exports= function(){
}

Parser.generator=generator;
Parser.esprima=Parser.ecmaParser= esprima;
Parser.plugins=[
	new core.VW.Ecma2015.ClassPlugin(),
	new core.VW.Ecma2015.ExtendedParametersPlugin(),
	new core.VW.Ecma2015.VariablePlugin(),
	new core.VW.Ecma2015.ArrowFunctionPlugin(),

	new core.VW.Ecma2015.TemplateLiteralPlugin(),
	new core.VW.Ecma2015.EnhancedObjectPropertiesPlugin(),
	new core.VW.Ecma2015.DestructuringAssignmentPlugin(),
	new core.VW.Ecma2015.IteratorPlugin(),
	new core.VW.Ecma2015.ModulePlugin()
	,new core.VW.Ecma2015.AsyncPlugin()
	/**/
]

require("./_parser.js").createParser({
	Parser:Parser,
	esprima:esprima,
	generator:generator
})