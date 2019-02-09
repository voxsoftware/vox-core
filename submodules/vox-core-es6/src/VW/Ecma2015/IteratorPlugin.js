

var IteratorPlugin= module.exports=function(){
	this.$id=0;
}

IteratorPlugin.prototype.ForOfStatement= function(ev){

	// ForOfStatement
	// for(var id of variable1) ....
	var body;

	var id= this.$id++;

	var iterator= {
        "type": "Identifier",
        "name": "$_iterator" + id
    };
    var normal= {
        "type": "Identifier",
        "name": "$_normal"+id
    };
    var err={
        "type": "Identifier",
        "name": "$_err"+id
    }
    var step={
		"type": "Identifier",
		"name": "$_step"+id
	}


	var right= ev.ast.right;
	var block= ev.ast.body;

    var async=false;
    if(block.body[0] && block.body[0].type=="ExpressionStatement"){

        var iexp=block.body[0].expression;
        if(iexp.type=="Literal" && iexp.value=="use async"){
            async=true;
            block.body.shift();
        }
    }



	block.$noscoped=true;


    var valueexp= {
        "type": "MemberExpression",
        "computed": false,
        "object": step,
        "property": {
            "type": "Identifier",
            "name": "value"
        }
    };

    var stepexp= {
        "type": "CallExpression",
        "callee": {
            "type": "MemberExpression",
            "computed": false,
            "object": iterator,
            "property": {
                "type": "Identifier",
                "name": "next"
            }
        },
        "arguments": []
    }

    if(async){
        // Soporte para AsyncIterators
        stepexp={
            "type": "CallExpression",
            "callee": {
                "type": "Identifier",
                "name": "await"
            },
            "arguments": [
                stepexp
            ]
        };
    }

	//vw.warning(ev.ast.left)
	block.body= [{
        "type": "ExpressionStatement",
        "expression": {
            "type": "AssignmentExpression",
            "operator": "=",
            "left": ev.ast.left.declarations?ev.ast.left.declarations[0].id:ev.ast.left,
            "right": valueexp
        }
    }].concat(block.body);



	body=[
	    
	    
	    {
            "type": "ExpressionStatement",
            "expression": {
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
            }
        },
		ev.ast.left.declarations?ev.ast.left:null,
        {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": iterator,
                    "init": {
                        "type": "CallExpression",
                        "callee": {

                            "type": "MemberExpression",
                            "computed": false,
                            "object": {
                                "type": "Identifier",
                                "name": "regeneratorRuntime"
                            },
                            "property": {
                                "type": "Identifier",
                                "name": "values"
                            }

                        },
                        "arguments": [
                            right
                        ]
                    }
                },
                {
                    "type": "VariableDeclarator",
                    "id": normal,
                    "init": {
                        "type": "Literal",
                        "value": false,
                        "raw": "false"
                    }
                },
                {
                    "type": "VariableDeclarator",
                    "id": err,
                    "init": null
                }
            ],
            "kind": "var"
        },
        {

            "type": "TryStatement",
            "block": {
                "type": "BlockStatement",
                "body": [
                    {
                        "type": "WhileStatement",
                        "test": {
                            "type": "Literal",
                            "value": true,
                            "raw": "true"
                        },
                        "body": {
                            "type": "BlockStatement",
                            "body": [
                                {
                                    "type": "VariableDeclaration",
                                    "declarations": [
                                        {
                                            "type": "VariableDeclarator",
                                            "id": step,
                                            "init": stepexp
                                        }
                                    ],
                                    "kind": "var"
                                },
                                {
                                    "type": "IfStatement",
                                    "test": {
                                        "type": "MemberExpression",
                                        "computed": false,
                                        "object": step,
                                        "property": {
                                            "type": "Identifier",
                                            "name": "done"
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
                                                    "left": normal,
                                                    "right": {
                                                        "type": "Literal",
                                                        "value": true,
                                                        "raw": "true"
                                                    }
                                                }
                                            },
                                            {
                                                "type": "BreakStatement",
                                                "label": null
                                            }
                                        ]
                                    },
                                    "alternate": null
                                },
                                block
                            ]
                        }
                    }
                ]
            },
            "guardedHandlers": [],
            "handlers": [
                {
                    "type": "CatchClause",
                    "param": {
                        "type": "Identifier",
                        "name": "e"
                    },
                    "body": {
                        "type": "BlockStatement",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "AssignmentExpression",
                                    "operator": "=",
                                    "left": normal,
                                    "right": {
                                        "type": "Literal",
                                        "value": false,
                                        "raw": "false"
                                    }
                                }
                            },
                            {
                                "type": "ExpressionStatement",
                                "expression": {
                                    "type": "AssignmentExpression",
                                    "operator": "=",
                                    "left": err,
                                    "right": {
                                        "type": "Identifier",
                                        "name": "e"
                                    }
                                }
                            }
                        ]
                    }
                }
            ],
            "handler": {
                "type": "CatchClause",
                "param": {
                    "type": "Identifier",
                    "name": "e"
                },
                "body": {
                    "type": "BlockStatement",
                    "body": [
                        {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "AssignmentExpression",
                                "operator": "=",
                                "left": normal,
                                "right": {
                                    "type": "Literal",
                                    "value": false,
                                    "raw": "false"
                                }
                            }
                        },
                        {
                            "type": "ExpressionStatement",
                            "expression": {
                                "type": "AssignmentExpression",
                                "operator": "=",
                                "left": err,
                                "right": {
                                    "type": "Identifier",
                                    "name": "e"
                                }
                            }
                        }
                    ]
                }
            },
            "finalizer": null
        },
        {
            "type": "TryStatement",
            "block": {
                "type": "BlockStatement",
                "body": [
                    {
                        "type": "IfStatement",
                        "test": {
                            "type": "LogicalExpression",
                            "operator": "&&",
                            "left": {
                                "type": "UnaryExpression",
                                "operator": "!",
                                "argument": normal,
                                "prefix": true
                            },
                            "right": {
                                "type": "MemberExpression",
                                "computed": true,
                                "object": iterator,
                                "property": {
                                    "type": "Literal",
                                    "value": "return",
                                    "raw": "\"return\""
                                }
                            }
                        },
                        "consequent": {
                            "type": "BlockStatement",
                            "body": [
                                {
                                    "type": "ExpressionStatement",
                                    "expression": {
                                        "type": "CallExpression",
                                        "callee": {
                                            "type": "MemberExpression",
                                            "computed": true,
                                            "object": iterator,
                                            "property": {
                                                "type": "Literal",
                                                "value": "return",
                                                "raw": "\"return\""
                                            }
                                        },
                                        "arguments": []
                                    }
                                }
                            ]
                        },
                        "alternate": null
                    }
                ]
            },
            "guardedHandlers": [],
            "handlers": [
                {
                    "type": "CatchClause",
                    "param": {
                        "type": "Identifier",
                        "name": "e"
                    },
                    "body": {
                        "type": "BlockStatement",
                        "body": []
                    }
                }
            ],
            "handler": {
                "type": "CatchClause",
                "param": {
                    "type": "Identifier",
                    "name": "e"
                },
                "body": {
                    "type": "BlockStatement",
                    "body": []
                }
            },
            "finalizer": null
        },
        {
            "type": "IfStatement",
            "test": err,
            "consequent": {
                "type": "BlockStatement",
                "body": [
                    {
                        "type": "ThrowStatement",
                        "argument": err
                    }
                ]
            },
            "alternate": null
        }
	];
	body=body.filter(function(a){return !!a})


	ev.replacement= {
        "type": "BlockStatement",
        "body": body
    }
    ev.iteratorObject=block.body;

}
