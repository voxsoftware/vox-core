//global.regeneratorRuntime= require("./runtime")
var esprima= require("./Esprima.js") // core.VW.Ecma2015.Regenerator["esprima-fb"];//require("esprima");
var generator= require("escodegen");


core.VW.Ecma2015.ClassPlugin= require("./ClassPlugin")
core.VW.Ecma2015.VariablePlugin= require("./VariablePlugin")
core.VW.Ecma2015.ExtendedParametersPlugin= require("./ExtendedParametersPlugin")
core.VW.Ecma2015.ArrowFunctionPlugin= require("./ArrowFunctionPlugin")
core.VW.Ecma2015.TemplateLiteralPlugin= require("./TemplateLiteralPlugin")
core.VW.Ecma2015.EnhancedObjectPropertiesPlugin= require("./EnhancedObjectPropertiesPlugin")
core.VW.Ecma2015.DestructuringAssignmentPlugin= require("./DestructuringAssignmentPlugin")
core.VW.Ecma2015.IteratorPlugin= require("./IteratorPlugin")
core.VW.Ecma2015.ModulePlugin= require("./ModulePlugin")

var Parser= module.exports= function(){
}

Parser.generator=generator;
Parser.esprima=Parser.ecmaParser= esprima;
Parser.plugins=[
	new core.VW.Ecma2015.ClassPlugin(),
	new core.VW.Ecma2015.VariablePlugin(),
	new core.VW.Ecma2015.ExtendedParametersPlugin(),
	new core.VW.Ecma2015.ArrowFunctionPlugin(),

	new core.VW.Ecma2015.TemplateLiteralPlugin(),
	new core.VW.Ecma2015.EnhancedObjectPropertiesPlugin(),
	new core.VW.Ecma2015.DestructuringAssignmentPlugin(),
	new core.VW.Ecma2015.IteratorPlugin(),
	new core.VW.Ecma2015.ModulePlugin()
]


require("./_parser.js").createParser({
	Parser:Parser,
	esprima:esprima,
	generator:generator
})