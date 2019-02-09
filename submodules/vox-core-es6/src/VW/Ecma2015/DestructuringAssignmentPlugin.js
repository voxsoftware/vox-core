
// FEATURES 
/** Destructuring Assignment

Array Matching ->soportado
Object Matching, Shorthand Notation ->soportado
Object Matching, Deep Matching -> soportado
Parameter Context Matching -> soportado
Fail-Soft Destructuring -> soportado

**/


var DestructuringAssignmentPlugin= module.exports= function(){
	this.$refid=0;
}



DestructuringAssignmentPlugin.prototype.FunctionExpression=
DestructuringAssignmentPlugin.prototype.ArrowFunctionExpression=function(ev){
	if(ev.ast.params.length>0){
		var decs=[];
		for(var i=0;i<ev.ast.params.length;i++){
			var par= ev.ast.params[i];
			if(par.type=="ObjectPattern"){
				var id={
					"type":"Identifier",
					"name": "$_ref"+(this.$refid++)
				};
				ev.ast.params[i]=id;

				var dec= {
                    "type": "VariableDeclarator",
                    "id": par,
                    "init": id
                };
                decs.push(dec);
			}
		}


		if(decs.length==0){
			return;
		}

		var exp= {
		    "type": "VariableDeclaration",
		    "declarations":decs,
		    "kind": "var"
		};

		ev.ast.body.body=[exp].concat(ev.ast.body.body);
	}
}

DestructuringAssignmentPlugin.prototype.ExpressionStatement= function(ev){
	var newdecs=[],ast;
	if(ev.ast.expression.type=="AssignmentExpression"){
		ast= ev.ast.expression;
	}
	else{
		return;
	}
	if(ast.left.type=="ArrayPattern"){

		var asi,exp;
		if(ast.right.type=="Identifier"){
			asi=ast.right;

		}
		else{


			asi={
                "type": "Identifier",
                "name": "$_ref"+(this.$refid++)
            }
            exp=   {
	            "type": "VariableDeclaration",
	            "declarations": [
			        {
			            "type": "VariableDeclarator",
			            "id": asi,
			            "init": ast.right
			        }
			    ],
			    "kind":"var"
			}
	        newdecs.push(exp);
		}
		




        var els= ast.left.elements;
        for(var z=0;z<els.length;z++){
        	var el= els[z];
        	if(el!=null){
        		exp= {
		            "type": "ExpressionStatement",
		            "expression": {
		                "type": "AssignmentExpression",
		                "operator": "=",
		                "left": el,
		                "right": {
		                    "type": "MemberExpression",
		                    "computed": true,
		                    "object": asi,
		                    "property": {
		                        "type": "Literal",
		                        "value": z,
		                        "raw": z.toString()
		                    }
		                }
		            }
		        }
                newdecs.push(exp);
        	}
        }


        
	}

	
	ev.replacement= newdecs.shift();
    ev.parser.addition= newdecs;
}


DestructuringAssignmentPlugin.prototype.destructure= function(asi,el){

	var p,id,totalexp=[];
	if(el.value.type!="ObjectPattern"){
		p=el.key;
		id=el.value;

		var exp= {
	        "type": "VariableDeclarator",
	        "id": id,
	        "init": {
                "type": "ConditionalExpression",
                "test": asi,
                "consequent": {
                    "type": "MemberExpression",
                    "computed": false,
                    "object": asi,
                    "property": p
                },
                "alternate": {
                    "type": "Identifier",
                    "name": "undefined"
                }
            }
	    };
	    totalexp.push(exp);


	}
	else{

		var exp1=el.key;
		exp1= {
        	"type": "MemberExpression",
            "computed": false,
            "object": asi,
            "property": exp1
        }
		var procesar= function(exp1, properties){
			var totalexp=[], lasti;
			for(var i=0;i<properties.length;i++){
				var ant= exp1;
				var pro=properties[i];
				ant= {
		            "type": "MemberExpression",
		            "computed": false,
		            "object": ant,
		            "property": pro.key
		        }
		        if(pro.value.type=="Identifier"){
		        	lasti=pro.value;
		        	totalexp.push({
		        		"key": lasti,
		        		"exp": ant
		        	});
		        }
		        else{
		        	var expresiones= procesar(ant, pro.value.properties);
		        	for(var z=0;z<expresiones.length;z++){
		        		totalexp.push(expresiones[z]);
		        	}
		        }
		    }	
		    return totalexp;
		}

		var TExp= procesar(exp1, el.value.properties);
		for(var i=0;i<TExp.length;i++){

			var exp= {
		        "type": "VariableDeclarator",
		        "id": TExp[i].key,
		        "init": TExp[i].exp
		    };
		    totalexp.push(exp);
		}

	}
	return totalexp;


}

DestructuringAssignmentPlugin.prototype.VariableDeclaration= function(ev){


	var decs= ev.ast.declarations;
	var newdecs=[];
	for(var i=0;i<decs.length;i++){
		var dec= decs[i];
		if(dec.id && dec.id.type=="ObjectPattern"){

			var asi,exp;
			if(dec.init.type=="Identifier"){
				asi=dec.init;
			}
			else{
				asi={
	                "type": "Identifier",
	                "name": "$_ref" + (this.$refid++)
	            }
	            exp=  {
		            "type": "VariableDeclarator",
		            "id": asi,
		            "init": dec.init
		        }
		        newdecs.push(exp);
			}
			


	        var els= dec.id.properties;
	        for(var z=0;z<els.length;z++){
	        	var el= els[z];
	        	if(el!=null){
	        		var exprs=this.destructure(asi,el);
	        		for(var aa=0;aa<exprs.length;aa++){
	        			newdecs.push(exprs[aa]);	
	        		}
	        	}
	        }

		}
		else if(dec.id && dec.id.type=="ArrayPattern"){
			

			var asi,exp;
			if(dec.init.type=="Identifier"){
				asi=dec.init;
			}
			else{
				asi={
	                "type": "Identifier",
	                "name": "$_ref" + (this.$refid++)
	            }
	            exp=  {
		            "type": "VariableDeclarator",
		            "id": asi,
		            "init": dec.init
		        }
		        newdecs.push(exp);
			}
			


	        var els= dec.id.elements;
	        for(var z=0;z<els.length;z++){
	        	var el= els[z];
	        	if(el!=null){
	        		if(el.type=="AssignmentPattern"){
	        			var mem={
	                        "type": "MemberExpression",
	                        "computed": true,
	                        "object": asi,
	                        "property": {
	                            "type": "Literal",
	                            "value": z,
	                            "raw": z.toString()
	                        },
	                        "expression":true
	                    };

	        			exp= {
		                    "type": "VariableDeclarator",
		                    "id": el.left,
		                    "init": {
					            
				                "type": "ConditionalExpression",
				                "test": {
				                    "type": "BinaryExpression",
				                    "operator": "!==",
				                    "left": mem,
				                    "right": {
				                        "type": "Identifier",
				                        "name": "undefined"
				                    }
				                },
				                "consequent": mem,
				                "alternate": el.right
					            
					        }

		                };

	        		}
	        		else{
		        		exp= {
		                    "type": "VariableDeclarator",
		                    "id": el,
		                    "init": {
	                        	"type": "MemberExpression",
		                        "computed": true,
		                        "object": asi,
		                        "property": {
		                            "type": "Literal",
		                            "value": z,
		                            "raw": z.toString()
		                        }
		                    }
		                };
		            }
	                newdecs.push(exp);
	        	}
	        }



		}
		else{
			newdecs.push(dec);
		}
	}
	ev.ast.declarations=newdecs;

}