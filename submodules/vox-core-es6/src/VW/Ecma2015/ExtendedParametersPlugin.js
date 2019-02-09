


// FEATURES:
/**
Extended Parameter Handling

* Default Parameter Values -> soportado
* Rest Parameter -> soportado
* Spread Operator -> no soportado

**/


var ExtendedParametersPlugin= module.exports= function(){
}


ExtendedParametersPlugin.prototype.FunctionExpression=
ExtendedParametersPlugin.prototype.ArrowFunctionExpression= function(ev){
    
	var defaults= ev.ast.defaults= ev.ast.defaults||[];
	var body=[];

	for(var i=0;i<Math.max(defaults.length,ev.ast.params.length);i++){
		var par=ev.ast.params[i];

        if(par.type=="AssignmentPattern"){
            defaults[i]= par.right
            par= ev.ast.params[i]=par.left
        }

        var def= defaults[i];		
		if(def || par.type=="RestElement"){
			
            
			var exp= this.generateDefault(def,par,i);
			body.push(exp);

			if(par.type=="RestElement"){
				ev.ast.params[i]=par.argument;
			}
		}
	}

	ev.ast.defaults=null;
	if(body.length==0){
		return;
	}

	var rbody= ev.ast.body.body;
	if(!rbody){
		throw new core.System.Exception("Debe usarse el plugin ArrowFunctionPlugin junto con este");
	}

	ev.iteratorIndex=ev.iteratorIndex|0;
	ev.iteratorIndex+= body.length;

	for(var i=rbody.length-1;i>=0;i--){
		rbody[i+body.length]=rbody[i];
	}
	for(var i=0;i<body.length;i++){
		rbody[i]=body[i];
	}

}


ExtendedParametersPlugin.prototype.generateDefault= function(def,par,index){

	if(par.type=="RestElement"){
		return {
            "type": "ExpressionStatement",
            "expression": {
                "type": "AssignmentExpression",
                "operator": "=",
                "left": par.argument,
                "right": {
                    "type": "CallExpression",
                    "callee": {
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
                                    "name": "Array"
                                },
                                "property": {
                                    "type": "Identifier",
                                    "name": "prototype"
                                }
                            },
                            "property": {
                                "type": "Identifier",
                                "name": "slice"
                            }
                        },
                        "property": {
                            "type": "Identifier",
                            "name": "call"
                        }
                    },
                    "arguments": [
                        {
                            "type": "Identifier",
                            "name": "arguments"
                        },
                        {
                            "type": "Literal",
                            "value": index,
                            "raw": index.toString()
                        }
                    ]
                }
            }
        }

	}


	return {
        "type": "IfStatement",
        "test": {
            "type": "BinaryExpression",
            "operator": "===",
            "left": par,
            "right": {
                "type": "Identifier",
                "name": "undefined"
            }
        },
        "consequent": {
            "type": "BlockStatement",
            "body": [
                {
                    "type": "ExpressionStatement",
                    "expression": {
                        "type": "AssignmentExpression",
                        "operator": "=",
                        "left": par,
                        "right": def
                    }
                }
            ]
        },
        "alternate": null
    }

}