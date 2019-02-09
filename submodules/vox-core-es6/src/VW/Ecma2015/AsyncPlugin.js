
var AsyncPlugin= module.exports=function(){
}

var regenerator,recast;
AsyncPlugin.prototype.getFunctionExpression=function(ev){
	while(ev.parent){
		ev= ev.parent;
		if(ev.type.indexOf("FunctionExpression")>=0){
			return ev;
		}
	}
}


AsyncPlugin.prototype.load= function(){
	regenerator=core.VW.Ecma2015.Regenerator;
	recast= regenerator.recast;
	regenerator=regenerator.regenerator;
}

AsyncPlugin.prototype.FunctionExpression=
AsyncPlugin.prototype.ArrowFunctionExpression= function(ev){
	

	var body= ev.ast.body.body;
	if(!body){
		ev.ast.body= {
			"type": "BlockStatement",
			"body":[ev.ast.body]
		}
		body= ev.ast.body.body;
	}
	var exp= body[0];
	if(!ev.ast.async){
		
		if(exp && exp.type=="ExpressionStatement"){
			if(exp.expression.type=="Literal" && exp.expression.value=="use async"){
				body.shift();
				ev.ast.async= true;
			}
		}
	}

	if(ev.ast.async || ev.ast.generator){

		if(ev.ast.$processed){
			return;
		}

		ev.ast.$processed= true;
		ev.next= true;

		// Procesar el contenido ...
		
		var more= ev.parser.more;
		ev.parser.more=[];

		try{
			
			
			var prog= {
				"type":"Program",
				"body":[ev.ast]
			}
			for(var id in ev.ast){

			}

			ev.parser.parseProgram(prog, ev);




			ev.parser.more=more;

			// Convertir con regenerator ...
			if(!regenerator){
				this.load();
			}
			
			/*
			if(!ev.parser.after){
				ev.parser.after=[];
				ev.parser.postFuncs.push(AsyncPlugin.procesarAsync);
			}
			ev.parser.after.push(ev)
			*/
			var cd= core.VW.Ecma2015.Parser.generator.generate(ev.ast)
			var ll=regenerator.transform(recast.parse("("+cd+")"));
			//ev.replacement= ll.program.body[0].expression;

			ev.replacement={
				"type": "SequenceExpression",
	            "expressions": [
	                {
	                    "type": "ConditionalExpression",
	                    "test": {
	                        "type": "BinaryExpression",
	                        "operator": "!=",
	                        "left": {
	                            "type": "UnaryExpression",
	                            "operator": "typeof",
	                            "argument": {
	                                "type": "Identifier",
	                                "name": "regeneratorRuntime"
	                            },
	                            "prefix": true
	                        },
	                        "right": {
	                            "type": "Literal",
	                            "value": "object",
	                            "raw": "\"object\""
	                        }
	                    },
	                    "consequent": {
	                        "type": "MemberExpression",
	                        "computed": false,
	                        "object": {
	                            "type": "MemberExpression",
	                            "computed": false,
	                            "object": {
	                                "type": "MemberExpression",
	                                "computed": false,
	                                "object": {
	                                    "type": "Identifier",
	                                    "name": "core"
	                                },
	                                "property": {
	                                    "type": "Identifier",
	                                    "name": "VW"
	                                }
	                            },
	                            "property": {
	                                "type": "Identifier",
	                                "name": "Ecma2015"
	                            }
	                        },
	                        "property": {
	                            "type": "Identifier",
	                            "name": "Parser"
	                        }
	                    },
	                    "alternate": {
	                        "type": "Identifier",
	                        "name": "undefined"
	                    }
	                },
	                ll.program.body[0].expression
	            ]

			}

		}
		catch(e){
			throw new core.VW.Ecma2015.ParseException("Función asíncrona generó error ("+cd+"): " + e.message, e)
		}
	}

}

/*
AsyncPlugin.procesarAsync= function(parser){
	for(var i=0;i<parser.postFuncs.length;i++){
		var ev=parser.after[i];
		regenerator.transform(recast.parse("("+core.VW.Ecma2015.Parser.generator.generate(ev.ast)+")"))		
	}
}
*/


AsyncPlugin.prototype.CallExpression= function(ev){
	var callee= ev.ast.callee;
	if(callee.type!="Identifier" || callee.name!="_await"){
		return;
	}


	if(ev.ast.$processed){
		return;
	}
	ev.ast.$processed=true;
	var func= this.getFunctionExpression(ev);
	if(func && func.ast.async){
		callee.name="await";
	}
}
