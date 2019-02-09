// FEATURES:
/** Arrow Functions

Expression Bodies -> soportado
Statement Bodies -> soportado
Lexical this -> soportado

**/



var ArrowFunctionPlugin= module.exports= function(){
}


ArrowFunctionPlugin.prototype.getArrowDef= function(ev){
	while(ev.parent){
		if(ev.parent.type){
			if(ev.parent.type.indexOf("FunctionExpression")>=0){
				if(ev.parent.type=="ArrowFunctionExpression"){
					return ev.parent;
				}
				else{
					return null;
				}
			}
		}
		ev=ev.parent;
	}
	return null;
}


//ArrowFunctionPlugin.prototype.MemberExpression=function(ev){
ArrowFunctionPlugin.prototype.ThisExpression=function(ev){
	
	//if(ev.ast.object && ev.ast.object.type=="ThisExpression"){
		var arrowdef= this.getArrowDef(ev);
		if(arrowdef==null){
			return;
		}

        /*
		ev.ast.object= {
            "type": "Identifier",
            "name": "self"
        };
        */
        ev.replacement= {
            "type": "Identifier",
            "name": "self$0"
        }


        if(!arrowdef.$arrowconverted){

        	if(this.getArrowDef(arrowdef)!=null){
        		// Quiere decir que ya hay una función parent arrow
        		// por tanto no es necesario transformar la función para tener el self
        		arrowdef.$arrowconverted=true;
        		return;	
        	}

        	this.transformFuncWithSelf(arrowdef.replacement||arrowdef.ast);
        	arrowdef.$arrowconverted=true;
        }

	//}
}

ArrowFunctionPlugin.prototype.transformFuncWithSelf=function(ast){
	
	var newast={};
	for(var i in ast){
		newast[i]=ast[i];
	}

	var nbody= [{
        "type": "ReturnStatement",
        "argument": newast
    }];


	var exp= {
        "type": "CallExpression",
        "callee": {
            "type": "FunctionExpression",
            "id": null,
            "params": [
                {
                    "type": "Identifier",
                    "name": "self$0"
                }
            ],
            "defaults": [],
            "body": {
                "type": "BlockStatement",
                "body": nbody
            },
            "generator": false,
            "expression": false
        },
        "arguments": [
            {
                "type": "ThisExpression"
            }
        ]
    }

    for(var i in newast){
    	ast[i]=undefined;
    }
    for(var i in exp){
    	ast[i]=exp[i];
    }

	//return exp;
}

ArrowFunctionPlugin.prototype.ArrowFunctionExpression= function(ev){
	
	var body= ev.ast.body;
	var exp= ev.ast;
	
	exp.type="FunctionExpression";
	exp.generator=false;
	exp.expression=false;
	if(body.type!="BlockStatement"){

		var returns= {
            "type": "ReturnStatement",
            "argument": body
        }
        var nbody=[returns];
        exp.body={
	        "type": "BlockStatement",
	        "body": nbody
	    }

	    ev.iteratorObject= nbody;
	}
	else{
		ev.iteratorObject= body;
	}

	//ev.replacement= this.transformFuncWithSelf(exp);

}