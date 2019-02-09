


// FEATURES:
/** Template Literals

String Interpolation -> soportado
Custom Interpolation -> no soportado
Raw String Access -> no soportado

**/

var TemplateLiteral= module.exports= function(){

}


TemplateLiteral.prototype.TemplateLiteral= function(ev){

	var q= ev.ast.quasis;
	var expr= ev.ast.expressions;
	var bexp;
	for(var i=0;i<q.length;i+=0.5){
		var k;
		if((i|0)==i){
			var u=q[i];
			k= {
				"type": "Literal",
	            "value": u.value.cooked,
	            "raw": (u.value.raw)
			}
		}
		else{
			k= expr[i|0];
		}

		if(k){
			if(bexp){
				bexp= {
	                "type": "BinaryExpression",
	                "operator": "+",
	                "left": bexp,
	                "right": k
	            }
			}
			else{
				bexp=k;
			}
		}
	}

	ev.replacement=bexp;

}