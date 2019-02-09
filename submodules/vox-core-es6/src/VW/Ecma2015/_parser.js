var pro
core.VW.Ecma2015.Promise;
exports.createParser= function(args){
	pro(args)
}




/*
// Ver si soporta las nuevas características
var pluginss=[new core.VW.Ecma2015.ArrowFunctionPlugin()]
try{eval('"use strict";var j= ()=>{let y};var j=`aqui`;var obj={j};class Prueba{};')}catch(e){
	vw.error(e);pluginss= Parser.plugins;
}
if(pluginss!=Parser.plugins){
	try{eval('import fs from "fs"')}catch(e){
		pluginss.push(Parser.plugins[Parser.plugins.length-2])
	}
	try{
		eval('var j= async function(){}')
	}
	catch(e){
		pluginss.push(Parser.plugins[Parser.plugins.length-1])
	}
	Parser.plugins= pluginss;
}
*/

pro= function(args){

	var Parser, esprima, generator
	Parser= args.Parser
	esprima= args.esprima
	generator= args.generator

	Parser.prototype.iterateArray= function(body,index,parent){
		var self=this,l1;
		more= this.more;
		//try{

			for(var i=index|0;i< body.length;i++){
				var prev= body[i];
				var ev= this.iterateExp(prev,parent);

				if(ev){
					var exp= ev.replacement|| ev.ast;
					var iteratorObject=ev.iteratorObject || exp;
					body[i]=exp;
					if(self.addition && (parent.type=="Program" || parent.type=="BlockStatement")) {
						l1=i
						for(var z= body.length-1;z>i;z--){
							body[z+self.addition.length]= body[z];
						}
						for(var z=0;z<self.addition.length;z++){
							body[++l1]= self.addition[z];
						}

						self.addition=null;
					}
					if(!ev.next){
						more.push([iteratorObject,ev.iteratorIndex, ev]);
					}
				}
			}
		//}
		//catch(e){
		//	throw new Error(e);
		//}

	}


	Parser.prototype.iterateExp= function(exp, parent, prop){
		
		//if(exp["@@pro"]){
		//	return;
		//}

		var self=this;
		var plugins= this.plugins;
		var type= exp.type;
		var ev= {
			"ast": exp,
			"replacement":null,
			"type": type,
			"parent":parent,
			"parser":self,
			"prop": prop
		}

		/*
		for(var y=0;y<plugins.length;y++){
			var plugin= plugins[y];
			var f= plugin[type]|| plugin.all;
			if(f){
				f.call(plugin,ev);
			}
		}
		*/

		var f= this.pluginsfuncs[type] || this.pluginsfuncs.all;
		if(f){

			f(ev);
		}/**/
		exp["@@pro"]=true;
		return ev;
	}


	Parser.prototype.beginParse= function(exp,index,parent){

		more= this.more;
		if(exp instanceof Array){
			this.iterateArray(exp, index|0, parent);
		}
		else{

			if(exp.body instanceof Array){
				this.iterateArray(exp.body, index|0, parent);
			}
			if(exp.declarations instanceof Array){
				this.iterateArray(exp.declarations, index|0, parent);
			}
			else if(typeof exp !== "function" && exp.arguments instanceof Array){
				this.iterateArray(exp.arguments, index|0, parent);
			}

			var prop=[];
			if(exp.body){
				prop.push("body");
			}
			if(exp.expression){
				prop.push("expression");
			}
			if(exp.callee){
				prop.push("callee");
			}
			if(exp.left){
				prop.push("left");
			}
			if(exp.right){
				prop.push("right");
			}
			if(exp.object){
				prop.push("object");
			}
			if(exp.id){
				prop.push("id");
			}
			if(exp.value){
				prop.push("value");
			}
			if(exp.init){
				prop.push("init");
			}
			if(exp.argument){
				prop.push("argument");
			}
			if(exp.block){
				prop.push("block");
			}
			if(exp.consequent){
				prop.push("consequent");
			}
			if(exp.alternate){
				prop.push("alternate");
			}
			if(exp.property){
				prop.push("property");
			}
			if(exp.properties){
				prop.push("properties");
			}
			if(exp.test){
				prop.push("test");
			}
			if(exp.elements){
				prop.push("elements");
			}



			if(prop.length>0){
				for(var y=0;y<prop.length;y++){
					var pro=prop[y];
					var prev= exp[pro];
					var ev=this.iterateExp(prev,parent,pro);
					if(ev){
						if(ev.replacement){
							exp[pro]= ev.replacement;
						}
						var exp2= exp[pro];
						var next=ev.iteratorObject || exp2;
						if(!ev.next /*&& prev!=next*/){
							more.push([next,ev.iteratorIndex,ev]);
						}
					}
				}
			}

		}

	}



	Parser.prototype.parseAnother= function(program){
		var p= new Parser();
		p.plugins= this.plugins;
		p.parseProgram(program);
	}


	Parser.prototype.parseProgram= function(program, parent){
		this.more=[];
		this.beginParse(program.body,0,parent || program);

		while(this.more.length>0){
			var more= this.more;
			this.more=[];

			for(var i=0;i<more.length;i++){
				var m= more[i];
				this.beginParse(m[0],m[1],m[2]);
			}
		}
	}


	Parser.prototype.parseAST= function(ast,plugins){

		this.ES7Ast=[];
		this.plugins= plugins || this.plugins;
		if(!this.plugins){
			this.plugins= Parser.plugins;
		}
		this.getFunctions();
		this.parseProgram(ast);
		return ast
	}

	Parser.prototype.parseASTAndGenerate= function(ast,plugins){
		ast= this.parseAST(ast,plugins)
		var code= generator.generate(ast);
		return {
			code:code,
			ast: ast
		};
	}


	Parser.prototype.getFunctions= function(){
		// Coge los plugins y crea un solo objeto con las funciones ...
		var f={};
		for(var i=0;i< this.plugins.length;i++){
			var plugin= this.plugins[i];
			for(var id in plugin){
				if(typeof plugin[id]=="function"){
					if(id=="all" || id[0].toUpperCase()==id[0]){
						if(!f[id]){
							f[id]= [];
						}
						f[id].push([plugin,plugin[id]]);
					}
				}
			}
		}


		var createFunc= function(def){
			var plugin= def[0];
			var func= def[1];
			return function(ev){
				return func.call(plugin,ev);
			}
		}

		var createFunc2= function(def){
			var all=[];
			for(var i=0;i<def.length;i++){
				all.push(createFunc(def[i]));
			}

			return function(ev){
				for(var i=0;i<all.length;i++){
					all[i](ev);
				}
			}
		}


		for(var id in f){
			var funcs= f[id];
			if(funcs.length==0){
				f[id]= createFunc(funcs[0]);
			}
			else{
				f[id]= createFunc2(funcs);
			}
		}

		this.pluginsfuncs=f;
	}


	Parser.prototype.parse= function(code,plugins, options){
		var program= esprima.parse(code,{
			sourceType:"module",
			loc:true,
			range:true
		});
		options= options || {gencode:true}

		if(options.gencode)
			return this.parseASTAndGenerate(program,plugins);
		else
			return this.parseAST(program,plugins);
	}



	Parser.prototype.parse2= function(code, plugins){
		if(!plugins){
			plugins= Parser.plugins;
		}

		var self= this;
		var program= esprima.parse(code);
		var iterateOne= function(exp,parent){
			var type= exp.type;
			var ev= {
				"ast": exp,
				"replacement":null,
				"type": type,
				"parent":parent,
				"parser":self
			}
			for(var y=0;y<plugins.length;y++){
				var plugin= plugins[y];
				var f= plugin[type]|| plugin.all;
				if(f){
					f.call(plugin,ev);
				}
			}
			return ev;
		}


		var iterateOther= function(exp, index, parent){
			if(exp instanceof Array){
				iterate(exp, index|0, parent);
			}
			else{

				if(exp.body instanceof Array){
					iterate(exp.body, index|0, parent);
				}
				if(exp.declarations instanceof Array){
					iterate(exp.declarations, index|0, parent);
				}
				else if(exp.arguments instanceof Array){
					iterate(exp.arguments, index|0, parent);
				}

				var prop=[];
				if(exp.body){
					prop.push("body");
				}
				if(exp.expression){
					prop.push("expression");
				}
				if(exp.callee){
					prop.push("callee");
				}
				if(exp.left){
					prop.push("left");
				}
				if(exp.right){
					prop.push("right");
				}
				if(exp.object){
					prop.push("object");
				}
				if(exp.id){
					prop.push("id");
				}
				if(exp.value){
					prop.push("value");
				}
				if(exp.init){
					prop.push("init");
				}
				if(exp.argument){
					prop.push("argument");
				}
				if(exp.block){
					prop.push("block");
				}
				if(exp.consequent){
					prop.push("consequent");
				}
				if(exp.alternate){
					prop.push("alternate");
				}



				if(prop.length>0){
					var more=[];
					for(var y=0;y<prop.length;y++){
						var pro=prop[y];
						var ev=iterateOne(exp[pro],parent);
						if(ev.replacement){
							exp[pro]= ev.replacement;
						}
						var exp2= exp[pro];
						//iterateOther(ev.iteratorObject || exp2,ev.iteratorIndex,ev);
						more.push([ev.iteratorObject || exp2,ev.iteratorIndex,ev]);
					}

					for(var y=0;y<more.length;y++){
						var m= more[y];
						iterateOther(m[0],m[1],m[2]);
					}
				}
			}
		}




		var iterate= function(body,index,parent){
			try{
				var more=[], l1;
				for(var i=index|0;i< body.length;i++){
					var ev= iterateOne(body[i],parent);
					var exp= ev.replacement|| ev.ast;
					var iteratorObject=ev.iteratorObject || exp;
					body[i]=exp;
					if(self.addition && (parent.type=="Program" || parent.type=="BlockStatement")) {
						l1=i

						for(var z= body.length-1;z>i;z--){
							body[z+self.addition.length]= body[z];
						}
						for(var z=0;z<self.addition.length;z++){
							body[++l1]= self.addition[z];
						}

						self.addition=null;
					}
					//iterateOther(iteratorObject,ev.iteratorIndex, ev);
					more.push([iteratorObject,ev.iteratorIndex, ev]);
				}

				for(var i=0;i<more.length;i++){
					var m= more[i];
					iterateOther(m[0],m[1],m[2]);
				}
			}
			catch(e){
				throw new Error(e);
			}
		}


		iterateOther(program.body,0,program);
		return escodegen.generate(program);
	}
}