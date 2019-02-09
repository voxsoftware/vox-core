// FEATURES 
/** Enhanced Object Properties

Property Shorthand -> soportado
Computed Property Names -> soportado
Method Properties -> no completo 
*/


var EnhancedObjectPropertiesPlugin= module.exports= function(){

}


EnhancedObjectPropertiesPlugin.prototype.ObjectExpression=function(ev){
	
	var fp,cid;
	var p= ev.ast.properties;
	var co=[],id;
	var otherexp=[];
	var l=[];
	for(var i=0;i<p.length;i++){
		var p0=p[i];
		if(p0.key.type!="Literal" && p0.computed){

			

			if(ev.parent.ast.arguments || argument){
				// Esta siendo llamado como argumento ...

				if(!fp){
					id= {
			            "type": "Identifier",
			            "name": "obj"
			        };


					fp= {
		                "type": "CallExpression",
		                "callee": {
		                    "type": "FunctionExpression",
		                    "id": null,
		                    "params": [],
		                    "defaults": [],
		                    "body": {
		                        "type": "BlockStatement",
		                        "body": [
			                        {
	                                	"type": "VariableDeclaration",
		                                "declarations": [
		                                    {
		                                        "type": "VariableDeclarator",
		                                        "id": id,
		                                        "init": ev.ast
		                                    }
		                                ],
		                                "kind": "var"
		                            }
		                        ]
		                    },
		                    "generator": false,
		                    "expression": false
		                },
		                "arguments": []
			        }

			        var otherexp= fp.callee.body.body;
			    }
			}

			else if(!id){
				id=ev.parent.ast.left || ev.parent.ast.id;
			}


			
			var exp= {
	            "type": "ExpressionStatement",
	            "expression": {
	                "type": "AssignmentExpression",
	                "operator": "=",
	                "left": {
	                    "type": "MemberExpression",
	                    "computed": true,
	                    "object": id,
	                    "property": p0.key
	                },
	                "right": p0.value
	            }
	        };
	        otherexp.push(exp);
		}	
		else{
			co.push(p0);
		}
		p0.shorthand= false;
		p0.method=false;
		l.push(p0.value);

	}

	if(fp){
		ev.replacement= fp;
		otherexp.push(                            {
            "type": "ReturnStatement",
            "argument": {
                "type": "Identifier",
                "name": "obj"
            }
        });
		otherexp=[];
		ev.ast.properties=co;	
	}

	if(otherexp.length>0){
		ev.ast.properties=co;	
		/*ev.replacement= {
			type:"BlockStatement",
			body: [ev.ast].concat(otherexp),
		}
		*/
		ev.parser.addition= otherexp;
	}

	if(l.length>0){
		//ev.iteratorObject=l;
	}


}
