

var ClassPreset= module.exports= function(){
}


ClassPreset.prototype.MethodDefinition= function(ev){

	var classdef= this.getClassDef(ev);
	if(!classdef){
		return;
	}

	var id;
	if(ev.ast.key.name=="constructor"){
		id=classdef.id;
        ev.ast.key.name="$constructor"
	}
	else{

        if(ev.ast.static){
            
            id= classdef.id;
        }
        else{
    		id={
                "type": "MemberExpression",
                "computed": false,
                "object": classdef.id,
                "property": {
                    "type": "Identifier",
                    "name": "prototype"
                }
            }
        }
	}

    var exp;
    if(ev.ast.kind=="get" || ev.ast.kind=="set"){
        exp= {
            "type": "ExpressionStatement",
            "expression": {
                "type": "CallExpression",
                "callee": {
                    "type": "MemberExpression",
                    "computed": false,
                    "object": id,
                    "property": {
                        "type": "Identifier",
                        "name": (ev.ast.kind=="get") ? "__defineGetter__" : "__defineSetter__"
                    }
                },
                "arguments": [
					ev.ast.computed ?
						ev.ast.key
	                    : {
	                        "type":"Literal",
	                        "value": ev.ast.key.name,
	                        "raw": JSON.stringify(ev.ast.key.name)
	                    },
                    ev.ast.value
                ]
            }
        }
    }
    else{
    	exp={
            "type": "ExpressionStatement",
            "expression": {
                
                
                "type": "CallExpression",
                "callee": {
                    "type": "MemberExpression",
                    "computed": false,
                    "object": {
                        "type": "Identifier",
                        "name": "Object"
                    },
                    "property": {
                        "type": "Identifier",
                        "name": "defineProperty"
                    }
                },
                "arguments": [
                    id,
                    (ev.ast.computed ? ev.ast.key: {
                        "type": "Literal",
                        "value": ev.ast.key.name,
                        "raw":  JSON.stringify(ev.ast.key.name)
                    }),
                    //ev.ast.key,
                    {
                        "type": "ObjectExpression",
                        "properties": [
                            {
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "enumerable"
                                },
                                "computed": false,
                                "value": {
                                    "type": "Literal",
                                    "value": false,
                                    "raw": "false"
                                },
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                            },
                            {
                                "type": "Property",
                                "key": {
                                    "type": "Identifier",
                                    "name": "value"
                                },
                                "computed": false,
                                "value": ev.ast.value,
                                "kind": "init",
                                "method": false,
                                "shorthand": false
                            }
                        ]
                    }
                ]
                
                
                
                /*
                "type": "AssignmentExpression",
                "operator": "=",
                "left": {
                    "type": "MemberExpression",
                    "computed": ev.ast.computed,
                    "object": id,
                    "property": ev.ast.key
                },
                "right": ev.ast.value
                */
                /*{
                    "type": "FunctionExpression",
                    "id": null,
                    "params": ev.ast.value.params,
                    "defaults": [],
                    "body": {
                        "type": "BlockStatement",
                        "body": ev.ast.value.body.body
                    },
                    "generator": false,
                    "expression": false
                }*/
            }
        }
    }
    //ev.iteratorObject= exp.expression;//ev.ast.value.body.body;


    ev.replacement=exp;


}

ClassPreset.prototype._CallExpression=function(ev){
    var ast= ev.ast

    if(ast.callee.type=="MemberExpression"){
        if(ast.callee.object.type=="Super"){
            ast.callee= {
                type:"MemberExpression",
                "object":ast.callee,
                "property": {
                    "type": "Identifier",
                    "name": "call"
                }
            }
            ast.arguments=[ {
                "type": "ThisExpression"
            }].concat(ast.arguments)

            return true
        }
    }
}

ClassPreset.prototype.MemberExpression=function(ev){
    var classdef= this.getClassDef(ev);

    if(!classdef){
        return;
    }

    if(ev.ast.object&&ev.ast.object.type=="Super"){

        //var mdef=this.getMethodDef(ev);


        ev.ast.object={
            "type": "MemberExpression",
            "computed": false,
            "object": classdef.id,
            "property": {
                "type": "Identifier",
                "name": "$super"
            }
        }

    }
}




ClassPreset.prototype.CallExpression=function(ev){
    var classdef= this.getClassDef(ev);

    if(!classdef){
        return;
    }

    if(this._CallExpression(ev))
        return

    if(ev.ast.callee&&ev.ast.callee.type=="Super"){

        //var mdef=this.getMethodDef(ev);
        ev.ast.arguments=[{
            "type": "ThisExpression"
        }].concat(ev.ast.arguments);
        ev.ast.callee={
            "type": "MemberExpression",
            "computed": false,
            "object": /*{
                "type": "MemberExpression",
                "computed": false,
                "object": */{
                    "type": "MemberExpression",
                    "computed": false,
                    "object": classdef.id,
                    "property": {
                        "type": "Identifier",
                        "name": "$superClass"
                    }
                }/*,
                "property": {
                    "type": "Identifier",
                    "name": "constructor"
                }
            }*/,
            "property": {
                "type": "Identifier",
                "name": "call"
            }
        }

    }
}




/*
ClassPreset.prototype.ExpressionStatement= function(ev){

	var classdef= this.getClassDef(ev);
	if(!classdef){
		return;
	}


	if(ev.ast.expression&&ev.ast.expression.callee&&ev.ast.expression.callee.type=="Super"){
		var args=[{
            "type": "ThisExpression"
        }];

        for(var i=0;i<ev.ast.expression.arguments.length;i++){
        	args.push(ev.ast.expression.arguments[i]);
        }


		var exp= {
            "type": "ExpressionStatement",
            "expression": {
                "type": "CallExpression",
                "callee":  {
                    "type": "MemberExpression",
                    "computed": false,
                    "object": {
                        "type": "MemberExpression",
                        "computed": false,
                        "object": {
                            "type": "MemberExpression",
                            "computed": false,
                            "object": classdef.id,
                            "property": {
                                "type": "Identifier",
                                "name": "$super"
                            }
                        },
                        "property": {
                            "type": "Identifier",
                            "name": "constructor"
                        }
                    },
                    "property": {
                        "type": "Identifier",
                        "name": "call"
                    }
                },
                "arguments": args
            }
        }
        ev.replacement= exp;


	}
}
*/

ClassPreset.prototype.getClassDef= function(ev){
    while(ev.parent){
        if(ev.parent.type=="ClassDeclaration"){
            return ev.parent.ast;
        }
        ev=ev.parent;
    }
    return null;
}

ClassPreset.prototype.getMethodDef= function(ev){
    while(ev.parent){
        if(ev.parent.type=="MethodDefinition"){
            return ev.parent.ast;
        }
        ev=ev.parent;
    }
    return null;
}

ClassPreset.prototype.ClassDeclaration= function(ev){

	var exp= {
        "type": "BlockStatement",
        "body": [
            {
                "kind":"var",
                "type": "VariableDeclaration",
                "declarations": [
                    {
                        "type": "VariableDeclarator",
                        "id": ev.ast.id,
                        "init": {

                            "type": "FunctionExpression",
                            "id": ev.ast.id,
                            "params": [],
                            "defaults": [],
                            "body": {
                                "type": "BlockStatement",
                                "body": [
                                    {
                                        "type": "ExpressionStatement",
                                        "expression": {
                                            "type": "ConditionalExpression",
                                            "test": {
                                                "type": "MemberExpression",
                                                "computed": false,
                                                "object": ev.ast.id,
                                                "property": {
                                                    "type": "Identifier",
                                                    "name": "$constructor"
                                                }
                                            },
                                            "consequent": {
                                                "type": "CallExpression",
                                                "callee": {
                                                    "type": "MemberExpression",
                                                    "computed": false,
                                                    "object": {
                                                        "type": "MemberExpression",
                                                        "computed": false,
                                                        "object": ev.ast.id,
                                                        "property": {
                                                            "type": "Identifier",
                                                            "name": "$constructor"
                                                        }
                                                    },
                                                    "property": {
                                                        "type": "Identifier",
                                                        "name": "apply"
                                                    }
                                                },
                                                "arguments": [
                                                    {
                                                        "type": "ThisExpression"
                                                    },
                                                    {
                                                        "type": "Identifier",
                                                        "name": "arguments"
                                                    }
                                                ]
                                            },
                                            "alternate": {
                                                "type": "LogicalExpression",
                                                "operator": "&&",
                                                "left": {
                                                    "type": "MemberExpression",
                                                    "computed": false,
                                                    "object": ev.ast.id,
                                                    "property": {
                                                        "type": "Identifier",
                                                        "name": "$superClass"
                                                    }
                                                },
                                                "right": {
                                                    "type": "CallExpression",
                                                    "callee": {
                                                        "type": "MemberExpression",
                                                        "computed": false,
                                                        "object": /*{
                                                            "type": "MemberExpression",
                                                            "computed": false,
                                                            "object": */{
                                                                "type": "MemberExpression",
                                                                "computed": false,
                                                                "object": ev.ast.id,
                                                                "property": {
                                                                    "type": "Identifier",
                                                                    "name": "$superClass"
                                                                }
                                                            }/*,
                                                            "property": {
                                                                "type": "Identifier",
                                                                "name": "constructor"
                                                            }
                                                        }*/,
                                                        "property": {
                                                            "type": "Identifier",
                                                            "name": "apply"
                                                        }
                                                    },
                                                    "arguments": [
                                                        {
                                                            "type": "ThisExpression"
                                                        },
                                                        {
                                                            "type": "Identifier",
                                                            "name": "arguments"
                                                        }
                                                    ]
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    }
                ],
                "generator": false,
                "expression": false
            }
        ]
    }


    if(ev.ast.superClass){

        var inh={
            "type": "ExpressionStatement",
            "expression": {
                "type": "AssignmentExpression",
                "operator": "=",
                "left": {
                    "type": "MemberExpression",
                    "computed": false,
                    "object": ev.ast.id,
                    "property": {
                        "type": "Identifier",
                        "name": "prototype"
                    }
                },
                "right": {
                    "type": "CallExpression",
                    "callee": {
                        "type": "MemberExpression",
                        "computed": false,
                        "object": {
                            "type": "Identifier",
                            "name": "Object"
                        },
                        "property": {
                            "type": "Identifier",
                            "name": "create"
                        }
                    },
                    "arguments": [
                        {
                            "type": "MemberExpression",
                            "computed": false,
                            "object": ev.ast.superClass,
                            "property": {
                                "type": "Identifier",
                                "name": "prototype"
                            }
                        }
                    ]
                }
            }
        };
        exp.body.push(inh);


        inh={
            "type": "ExpressionStatement",
            "expression": {
                "type": "ConditionalExpression",
                "test": {
                    "type": "MemberExpression",
                    "computed": false,
                    "object": {
                        "type": "Identifier",
                        "name": "Object"
                    },
                    "property": {
                        "type": "Identifier",
                        "name": "setPrototypeOf"
                    }
                },
                "consequent": {
                    "type": "CallExpression",
                    "callee": {
                        "type": "MemberExpression",
                        "computed": false,
                        "object": {
                            "type": "Identifier",
                            "name": "Object"
                        },
                        "property": {
                            "type": "Identifier",
                            "name": "setPrototypeOf"
                        }
                    },
                    "arguments": [
                        ev.ast.id,
                        ev.ast.superClass
                    ]
                },
                "alternate": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "MemberExpression",
                        "computed": false,
                        "object": ev.ast.id,
                        "property": {
                            "type": "Identifier",
                            "name": "__proto__"
                        }
                    },
                    "right": ev.ast.superClass
                }
            }
        }
        exp.body.push(inh)


        inh= {
            "type": "ExpressionStatement",
            "expression": {
                "type": "AssignmentExpression",
                "operator": "=",
                "left": {
                    "type": "MemberExpression",
                    "computed": false,
                    "object": {
                        "type": "MemberExpression",
                        "computed": false,
                        "object": ev.ast.id,
                        "property": {
                            "type": "Identifier",
                            "name": "prototype"
                        }
                    },
                    "property": {
                        "type": "Identifier",
                        "name": "constructor"
                    }
                },
                "right": ev.ast.id
            }
        }
        exp.body.push(inh);
        inh= {
            "type": "ExpressionStatement",
            "expression": {
                "type": "AssignmentExpression",
                "operator": "=",
                "left": {
                    "type": "MemberExpression",
                    "computed": false,
                    "object": ev.ast.id,
                    "property": {
                        "type": "Identifier",
                        "name": "$super"
                    }
                },
                "right": {
                    "type": "MemberExpression",
                    "computed": false,
                    "object": ev.ast.superClass,
                    "property": {
                        "type": "Identifier",
                        "name": "prototype"
                    }
                }
            }
        }
        exp.body.push(inh);


        inh= {
            "type": "ExpressionStatement",
            "expression": {
                "type": "AssignmentExpression",
                "operator": "=",
                "left": {
                    "type": "MemberExpression",
                    "computed": false,
                    "object": ev.ast.id,
                    "property": {
                        "type": "Identifier",
                        "name": "$superClass"
                    }
                },
                "right": ev.ast.superClass
            }
        }
        exp.body.push(inh);

    }


    var body= exp.body;
    //ev.iteratorObject= body;
    //ev.iteratorIndex= body.length;
    ev.replacement= exp;
    // Colocar lo del body de ClassDeclaration dentro del nuevo body ...
    ev.ast.body.body.forEach(function(exp){
    	body.push(exp);
    });


}
