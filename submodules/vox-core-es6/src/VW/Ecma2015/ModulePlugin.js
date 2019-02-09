
var ModulePlugin= module.exports= function(){
	this.id=0;
}



ModulePlugin.prototype.getImport= function(modulename){
	var varname= {
        "type": "Identifier",
        "name": "$mod$" + (this.id++)
    }

	var importm= {
        "type": "VariableDeclaration",
        "declarations": [
            {
                "type": "VariableDeclarator",
                "id": varname,
                "init": {
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
                                "name": "Utils"
                            }
                        },
                        "property": {
                            "type": "Identifier",
                            "name": "module"
                        }
                    },
                    "arguments": [
                        {
                            "type": "CallExpression",
                            "callee": {
                                "type": "Identifier",
                                "name": "require"
                            },
                            "arguments": [
                                modulename
                            ]
                        }
                    ]
                }
            }
        ],
        "kind": "var"
    }

    return {
    	varname:varname,
    	importm:importm
    };
}



ModulePlugin.prototype.ExportDefaultDeclaration=function(ev){
	var decl= ev.ast.declaration;
	ev.replacement={
        "type": "ExpressionStatement",
        "expression": {
            "type": "AssignmentExpression",
            "operator": "=",
            "left": {
                "type": "MemberExpression",
                "computed": false,
                "object": {
                    "type": "Identifier",
                    "name": "exports"
                },
                "property": {
                	"type": "Identifier",
                	"name": "default"
                }
            },
            "right": decl
        }
    }
}

/*
ModulePlugin.prototype.getBlockStatement= function(ev){
	while(ev.parent!=null){
		ev=ev.parent;
		if(ev.type=="BlockStatement"){
			return ev;
		}
	}
	return null;
}*/

ModulePlugin.prototype.ExportNamedDeclaration= function(ev){
	var decl= ev.ast.declaration;
    var body=[];
    
    if(decl==null){
        
        var specifiers= ev.ast.specifiers,specifier
        for(var i=0;i<specifiers.length;i++){
            
            specifier=specifiers[i]
            body.push({
                "type": "ExpressionStatement",
                "expression": {
                    "type": "AssignmentExpression",
                    "operator": "=",
                    "left": {
                        "type": "MemberExpression",
                        "computed": false,
                        "object": {
                            "type": "Identifier",
                            "name": "exports"
                        },
                        "property": specifier.exported
                    },
                    "right": specifier.local
                }
            });
        }

    }
    else{
        var ddec= decl.declarations?decl.declarations[0]:decl
    	var id= ddec.id;
    	var oid={};
    	for(var i in id){
    		oid[i]=id[i];
    	}


        if(["toString","valueOf"].indexOf(id.name)>=0){
            id.name+='$'
            // Esto es temporal error de escodegen ...
        }
    	
    	body.push(decl);
    	body.push({
            "type": "ExpressionStatement",
            "expression": {
                "type": "AssignmentExpression",
                "operator": "=",
                "left": {
                    "type": "MemberExpression",
                    "computed": false,
                    "object": {
                        "type": "Identifier",
                        "name": "exports"
                    },
                    "property": oid
                },
                "right": id
            }
        });
    }

    /*
    ev.replacement={
    	type:"BlockStatement",
    	body: body
    }*/

    
    ev.replacement= body.shift()
    if(body.length>0){
        ev.parser.addition= body
    }
    

}


ModulePlugin.prototype.ExportAllDeclaration= function(ev){

	var $= this.getImport(ev.ast.source);
	ev.replacement= {
        "type": "ExpressionStatement",
        "expression": {
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
                        "name": "Utils"
                    }
                },
                "property": {
                    "type": "Identifier",
                    "name": "extend"
                }
            },
            "arguments": [
                {
                    "type": "Identifier",
                    "name": "exports"
                },
                $.importm.declarations[0].init
            ]
        }
    }
    ev.next=true;

}




ModulePlugin.prototype.ImportDeclaration= function(ev){
	var modulename= ev.ast.source;
	var especifiers= ev.ast.specifiers;

	var body=[];
	var $= this.getImport(modulename);
	var varname=$.varname, importm=$.importm;
	body.push(importm);
    var block


	for(var i=0;i< especifiers.length;i++){
		var especifier= especifiers[i];
		if(especifier.type=="ImportNamespaceSpecifier"){
			body.push({
	            "type": "VariableDeclaration",
	            "declarations": [
	                {
	                    "type": "VariableDeclarator",
	                    "id": especifier.local,
	                    "init": varname
	                }
	            ],
	            "kind": "var"
	        });
		}
		else if(especifier.type=="ImportDefaultSpecifier" || especifier.type=="ImportSpecifier"){

			var def= especifier.imported;
			if(especifier.type=="ImportDefaultSpecifier"){
				def= {
                    "type": "Identifier",
                    "name": "default"
                };
			}

            block= this.getBlockStatement(ev)
            block.ast.varnames= block.ast.varnames||{}
            block.ast.varnames[especifier.local.name]= varname.name + "." + def.name
            
            
            /*
		  	body.push({
	            "type": "VariableDeclaration",
	            "declarations": [
	                {
	                    "type": "VariableDeclarator",
	                    "id": especifier.local,
	                    "init": {
	                        "type": "MemberExpression",
	                        "computed": false,
	                        "object": varname,
	                        "property": def
	                    }
	                }
	            ],
	            "kind": "var"
	        });
            */
		}
	}

	/*ev.replacement= {
        "type": "BlockStatement",
        "body": body
    }*/
    ev.replacement= body.shift()
    if(body.length>0){
        ev.parser.addition= body
    }
    ev.next=true;
    //ev.replacement= body.shift();
    //ev.parser.addition= body;
}

ModulePlugin.prototype.getBlockStatement= function(ev){
    while(ev.parent!=null){
        ev=ev.parent;
        if(ev.type=="BlockStatement"|| ev.type=="Program" || (ev.replacement && ev.replacement.body instanceof Array)){
            if(ev.type=="Program"){
                return {ast:ev}
            }
            return ev;
        }
    }
    
    return null;
}