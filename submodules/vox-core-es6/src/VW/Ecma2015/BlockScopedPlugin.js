

// FEATURES:
/** Scoping

Block-Scoped Variables -> no soportado (let se transforma a var)
Block-Scoped Functions -> soportado 

**/


var BlockScopePlugin= module.exports= function(){

}

BlockScopePlugin.prototype.BlockStatement= function(ev){
	
	var type=ev.parent?ev.parent.type:null;
    
	if(type!="Program"  && type!= "BlockStatement"){
		return;
	}
    

    if(ev.ast.$noscoped){
        return;
    }
	var body= ev.ast.body;
	var exp= {
        "type": "ExpressionStatement",
        "expression": {
            "type": "CallExpression",
            "callee": {
                "type": "FunctionExpression",
                "id": null,
                "params": [],
                "defaults": [],
                "body": {
                    "type": "BlockStatement",
                    "body": body
                },
                "generator": false
            },
            "arguments": [],
            "expression": true
        }
    }

    ev.iteratorObject= body;
    ev.replacement= exp;
}