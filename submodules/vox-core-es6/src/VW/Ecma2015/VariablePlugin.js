// FEATURES
/**Constants

Constants -> no soportado (se convierten a var)

*/

var VariablePreset= module.exports= function(){
	this.id=0;
}


VariablePreset.prototype.FunctionExpression=
VariablePreset.prototype.ArrowFunctionExpression= function(ev){
    
	var defaults= ev.ast.defaults= ev.ast.defaults||[];
	var body=[], ast

	for(var i=0;i<Math.max(defaults.length,ev.ast.params.length);i++){
		var par=ev.ast.params[i]
		if(par.name){
			ast= ev.ast.body || (ev.replacement? ev.replacement.body:null)
			if(ast){
				ast.varnames=ast.varnames||{}
				ast.varnames[par.name]= par.name
			}
		}
	}
}


VariablePreset.prototype.Identifier=function(ev){

	
	var oev=ev,block,parts;
	var nop= false
	if(ev.parent){

		if(ev.parent.type=="MemberExpression" && !ev.parent.ast.computed){
			nop=false

			if(ev.prop=='object'){
				nop=true
			}
			else{

				return
				/*
				if(ev.parent.parent && (ev.parent.parent.type=="MemberExpression"
					&& !ev.parent.parent.ast.computed)){
				return;
				*/
			}

		}
	}

	var yet= true
	while(yet){
		block= this.getBlockStatement(oev);
		if(!block){
			break;
		}


		var n,e= block.ast.varnames= block.ast.varnames||{};
		
		if(ev.parent && ev.parent.ast.type=="VariableDeclarator"){
			e[ev.ast.name]= ev.ast.name
		}

		if((n=e[ev.ast.name])!==undefined){


			if(n.indexOf(".")>=0){
				parts=n.split('.')
				ev.replacement= {
                    "type": "MemberExpression",
                    "computed": false,
                    "object": {
                        "type": "Identifier",
                        "name": parts[0]
                    },
                    "property": {
                        "type": "Identifier",
                        "name": parts[1]
                    }
                }
               	ev.next= true

			}
			else{
				ev.ast.name= n;
			}
			yet= false
			break;
		}
		oev= block;
	}


}
VariablePreset.prototype.VariableDeclaration= function(ev){
	// Para hacer totalmente compatible se coloca todas como var

	if(ev.ast.kind=="let"){
		var block= this.getBlockStatement(ev);

		if(block){
			if(block.ast.$wscoped){
				ev.ast.kind="var";
				return;
			}
			block.ast.varnames=block.ast.varnames||{};
			this.id++;

			// Transform variableNames ...
			var decs=ev.ast.declarations;
			for(var i=0;i<decs.length;i++){
				var dec= decs[i];
				var n=dec.id.name;
				var newn=block.ast.varnames[n];
				if(!newn){
					newn= n+"$"+this.id;
					block.ast.varnames[n]=newn;
				}

				dec.id.name=newn;
			}
		}
	}
	ev.ast.kind="var";
}

VariablePreset.prototype.getBlockStatement= function(ev){
	while(ev.parent!=null){
        ev=ev.parent;
        if(ev.type=="BlockStatement"|| ev.type=="Program" /*|| ev.type=="FunctionExpression" || ev.type=="ArrowFunctionExpression" */|| (ev.replacement && ev.replacement.body instanceof Array)){
            if(ev.type=="Program"){
                return {ast:ev}
            }
            return ev;
        }
    }

    return null;
}
