

/** 
* James! (08-03-2016)
* E6Html
* Formato de vw
* Es como un formato html pero que se ejecuta en el servidor
* Compila código EcmaScript v6 y async/await de EcmaScript v7
* Este formato está pensado para utilizarse en un servidor HTTP
* 
* El formato sería por ejemplo así:


<html>
	<head>
		<title><vw:expression>variablex</vw:expression></title>
	</head>

	<body>
		
		<script server-side async lang='es6'>
			// Se debe colocar el atributo server-side para que 
			// el parser sepa que se debe procesar este script 
	
			// El atributo async indica que es asíncrono 
			// así que debe devolver un objeto core.VW.Task o utilizar 
			// la sintaxis asíncrona que se muestra a continuación
			
			async ()=>{
				var res= await algunReqAsincrono()
				return res.body
			}


		</script>
	
	</body>
</html>


Esto se traduciría a algo así:


(context)->{
	var Stream= context.response;
	var $content, $func;
	return async ()=>{
		
		$content=`<html>
<head>
	<title>`;
		
		Stream.write($content);
		Stream.write(context.htmlencode(variableX));

		$content=`</title>
</head>

<body>
	
		`;
		

		$func= async ()=>{
			var res= await algunReqAsincrono()
			return res.body
		}
		await $func()

		$content= `
	
	</body>
</html>`
		
		Stream.write($content);
	}
}



*/
var fs=require("fs");
var EXPECTING_EXPRESSION=1;
var EXPECTING_RAW=4;
var EXPECTING_RAWEXPRESSION=2;
var EXPECTING_HTML=0;
var EXPECTING_SCRIPT=3;
var EXPECTING_BASE64EXPRESSION=5;
var EXPECTING_BASE64=6;
var EXPECTING_PRE=7;


var he= require("./HtmlEncode");
var htmlparser2= require("htmlparser2");
var Parser= module.exports= function(){
	this.expecting= EXPECTING_HTML;
	this.content='';
	this.parser=new core.VW.Ecma2015.Parser();
}
Parser.codeTags= ["vw:expression", "vw:rawexpression", "vw:base64",
	"vw:base64expression", "vw:raw", "script", "vw:if", "vw:else", "vw:elseif", "vw:section", "vw:foreach", "vw:import"];




Parser.prototype._writeExpressionR= function(){
	
	this.$wrExp=  {
        "type": "ExpressionStatement",
        "expression": {
            "type": "CallExpression",
            "callee": {
                "type": "MemberExpression",
                "computed": false,
                "object": {
                    "type": "Identifier",
                    "name": "Stream"
                },
                "property": {
                    "type": "Identifier",
                    "name": "write"
                }
            },
            "arguments": [
                {
                    "type": "Identifier",
                    "name": "$content"
                }
            ]
        }
    }

	return this.$wrExp;
}



Parser.prototype.__writeExpression64= function(code){
	var parser= core.VW.Ecma2015.Parser.ecmaParser;
	var ast= parser.parse(code);
	var exp= this._writeExpressionE();
	
	var lexp;
	if(ast.body.length!=1 || !(lexp=ast.body[0].expression)){
		throw new core.VW.E6Html.ParseException("Se esperaba una expresión")
	}
	var arg=exp.expression.arguments[0];
	arg.callee.property.name='base64decode';
	arg.arguments[0]= ast;
	return exp;
}



Parser.prototype.__writeBase64= function(code){
	var parser= core.VW.Ecma2015.Parser.ecmaParser;
	var ast= {
		"type": "StringLiteral",
		"value": code,
		"extra":{
			"raw": JSON.stringify(code),
			"rawValue": code
		}
	}
	var exp= this._writeExpressionE();
	var arg=exp.expression.arguments[0];
	arg.callee.property.name='base64decode';
	arg.arguments[0]= ast;
	return exp;
}




Parser.prototype.__writeExpressionE= function(code){
	var parser= core.VW.Ecma2015.Parser.ecmaParser;
	try{
		var ast= parser.parse(code);
	}
	catch(e){
		throw new core.VW.E6Html.ParseException("Error al analizar una expresión. ", e)
	}
	
	if(ast.program){
		ast= ast.program
	}
	
	
	var exp= this._writeExpressionE();
	var lexp
	if(ast.body.length!=1 || !(lexp=ast.body[0].expression)){
		throw new core.VW.E6Html.ParseException("Se esperaba una expresión")
	}
	
	exp.expression.arguments[0].arguments[0]= lexp
	return exp
}

Parser.prototype.__writeExpressionR= function(code){
	var parser= core.VW.Ecma2015.Parser.ecmaParser;
	try{
		var ast= parser.parse(code);
	}
	catch(e){
		throw new core.VW.E6Html.ParseException("Error al analizar una expresión. ", e)
	}
	
	if(ast.program)
		ast= ast.program
	
	var exp= this._writeExpressionR();
	var lexp;
	if(ast.body.length!=1 || !(lexp=ast.body[0].expression)){
		throw new core.VW.E6Html.ParseException("Se esperaba una expresión")
	}

	exp.expression.arguments[0]= lexp;
	return exp;
}



Parser.prototype.__getE6HtmlObjectAst= function(){
	return {
		"type": "Identifier",
		"name": "E6Html"
	}
}

Parser.prototype.__getE6HtmlDecAst= function(){
	return {
        "type": "VariableDeclaration",
        "declarations": [
            {
                "type": "VariableDeclarator",
                "id": this.__getE6HtmlObjectAst(),
                "init": this.__getE6HtmlAst()
            }
        ],
        "kind": "var"
    }
}



Parser.prototype.__getE6HtmlAst= function(){
	return {
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
                "name": "E6Html"
            }
        },
        "property": {
            "type": "Identifier",
            "name": "E6Html"
        }
    }
}





Parser.prototype._writeExpressionE= function(){
	
	this.$weExp= {
        "type": "ExpressionStatement",
        "expression": {
            "type": "CallExpression",
            "callee": {
                "type": "MemberExpression",
                "computed": false,
                "object": {
                    "type": "Identifier",
                    "name": "Stream"
                },
                "property": {
                    "type": "Identifier",
                    "name": "write"
                }
            },
            "arguments": [
                {
                    "type": "CallExpression",
                    "callee": {
                        "type": "MemberExpression",
                        "computed": false,
                        "object": this.__getE6HtmlObjectAst(),
                        "property": {
                            "type": "Identifier",
                            "name": "encode"
                        }
                    },
                    "arguments": [
                        {
                            "type": "Identifier",
                            "name": "$content"
                        }, 
                        {
                            "type": "Identifier",
                            "name": "context"
                        }
                    ]
                }
            ]
        }
    }
    return this.$weExp;
}

Parser.prototype._writeText=function(){
	if(this.content.length>0){
		exp={
            "type": "ExpressionStatement",
            "expression": {
                "type": "AssignmentExpression",
                "operator": "=",
                "left": {
                    "type": "Identifier",
                    "name": "$content"
                },
                "right": {
                    "type": "StringLiteral",
                    "value": this.content,
                    extra:{
                    	"raw": JSON.stringify(this.content),
                    	"rawValue": this.content
                    }
                    
                }
            }
        }


        this.body.push(exp);
		this.body.push(this._writeExpressionR());	
		this.content='';		
	}
}


Parser.prototype.endlastExp= function(){
	
	this._writeText();
	this.nested.pop()
	this.body= this.nested[this.nested.length-1]
	this.currentExp=null
}

Parser.prototype.beginSection=function(options){
	if(!this.nested){
		this.nested=[this.body]
	}


	if(!options.name){
		throw new core.VW.E6Html.ParseException("Debe especificar un nombre para la sección")
	}

	var body=[]
	var exp= {
        "type": "ExpressionStatement",
        "expression": {
            "type": "AssignmentExpression",
            "operator": "=",
            "left": {
                "type": "MemberExpression",
                "computed": true,
                "object": {
                    "type": "MemberExpression",
                    "computed": false,
                    "object": {
                        "type": "Identifier",
                        "name": "context"
                    },
                    "property": {
                        "type": "Identifier",
                        "name": "sections"
                    }
                },
                "property": {
                    "type": "StringLiteral",
                    "value": options.name,
                    "extra":{
                    	"raw": JSON.stringify(options.name),
                    	"rawValue": options.name
                    }
                }
            },
            "right": {
                "type": "FunctionExpression",
                "id": null,
                "params": [],
                "defaults": [],
                "body": {
                    "type": "BlockStatement",
                    "body": body
                },
                "generator": false,
                "expression": false,
                "async": true
            }
        }
    }

    this.currentExp= exp
    this.nested.push(body)
    this.body.push(exp)

    
    this.body= body

}

Parser.prototype.beginIfExp= function(test){
	if(!this.nested){
		this.nested=[this.body]
	}

	if(!test)
		throw new core.VW.E6Html.ParseException("Se esperaba el atributo `expression`")

	var parser= core.VW.Ecma2015.Parser.ecmaParser;
	var ast= parser.parse(test);
	var lexp
	
	if(ast.program)
		ast= ast.program
	
	if(ast.body.length!=1 || !(lexp=ast.body[0].expression)){
		throw new core.VW.E6Html.ParseException("Se esperaba una expresión")
	}

	var body=[]
	var exp= {
        "type": "IfStatement",
        "test": lexp,
        "consequent": {
            "type": "BlockStatement",
            "body": body
        },
        "alternate": null
    }
    this.currentExp= exp
    this.nested.push(body)
    this.body.push(exp)
    this.body= body
}


Parser.prototype.beginForEach= function(options){
	if(!this.nested){
		this.nested=[this.body]
	}

	var parser= core.VW.Ecma2015.Parser.ecmaParser;
	var ast= parser.parse(options.expression);
	var lexp
	
	if(ast.program)
		ast= ast.program
	
	if(ast.body.length!=1 || !(lexp=ast.body[0].expression)){
		throw new core.VW.E6Html.ParseException("Se esperaba una expresión")
	}

	var name= options.name

	var body=[]
	var exp= {
        "type": "ForOfStatement",
        "left": {
            "type": "VariableDeclaration",
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "id": {
                        "type": "Identifier",
                        "name": name
                    },
                    "init": null
                }
            ],
            "kind": "var"
        },
        "right": lexp,
        "body": {
            "type": "BlockStatement",
            "body": body
        }
    }
    this.currentExp= exp
    this.nested.push(body)
    this.body.push(exp)
    this.body= body
}

Parser.prototype.beginElseExp= function(){
	if(!this.currentExp || this.currentExp.type!="IfStatement"){
		throw new core.VW.E6Html.ParseException("Una expresión `vw:else` o `vw:elseif` debe estar dentro de una expresión `vw:if`")
	}
	var body=[]
	var exp= this.currentExp.alternate= {
		"type": "BlockStatement",
        "body": body
	}

	this.currentExp= exp
    this.nested.push(body)
    this.body= body
}

Parser.prototype.beginElseIfExp= function(test){
	this.beginElseExp()
	this.beginIfExp(test)
}


Parser.prototype.writeImport= function(options){
	var name= options;
	var prop= {
        "type": "Identifier",
        "name": "include"
    }

    if(options["section"]!==undefined){
    	prop.name="section"
    }

    
    var args=[
        {
            "type": "StringLiteral",
            "value": options.name,
            extra:{
            	"raw": JSON.stringify(options.name),
            	"rawValue": options.name
            }
        }
    ]

    if(options.argument){
    	// Pasar argumentos ...
    	var parser= core.VW.Ecma2015.Parser.ecmaParser;
		var ast= parser.parse(options.argument)
		var lexp
		
		if(ast.program)
			ast= ast.program
		
		if(ast.body.length!=1 || !(lexp=ast.body[0].expression)){
			throw new core.VW.E6Html.ParseException("Se esperaba una expresión en el atributo `argument` de import")
		}

		args.push(lexp)
    }
	var exp= {
        
        "type": "CallExpression",
        "callee": {
            "type": "MemberExpression",
            "computed": false,
            "object": {
                "type": "Identifier",
                "name": "context"
            },
            "property": prop
        },
        "arguments": args
    }
    exp={
        "type": "ExpressionStatement",
        "expression": {
            "type": "AwaitExpression",
            "argument": exp,
            "delegate": false
        }
    }

    this.body.push(exp)

}


Parser.prototype.onopentag= function(name,attribs){
	var exp;

	if(this.expecting==EXPECTING_RAWEXPRESSION || this.expecting==EXPECTING_EXPRESSION || this.expecting==EXPECTING_BASE64
		|| this.expecting==EXPECTING_BASE64EXPRESSION){
		this.scriptText+= "<" + name
		for(var id in attribs){
			this.scriptText+= id
			if(attribs[id])
				this.scriptText+= "=\""+attribs[id]+"\""
		}
		this.scriptText+=">"
		this.especialOpen= true
		return 
	}
		

	if(this.expecting!= EXPECTING_HTML && this.expecting != EXPECTING_PRE){
		throw new core.VW.E6Html.ParseException("Error de sintaxis cerca del tag " + name);
	}
	var script, especial=Parser.codeTags.indexOf(name)>=0;

	if(especial && name=="script"){

		if(attribs["server-side"]!==undefined){
			script= especial= true;
		}
		else{
			especial= false
		}
	}

	if(especial){
		this._writeText();

		if(name=="vw:expression"){
			this.expecting= EXPECTING_EXPRESSION;
		}
		else if(name=="vw:rawexpression"){
			this.expecting= EXPECTING_RAWEXPRESSION;
		}
		else if(name=="vw:base64"){
			this.expecting= EXPECTING_BASE64;
		}
		else if(name=="vw:base64expression"){
			this.expecting= EXPECTING_BASE64EXPRESSION;
		}
		else if(name=="vw:raw"){
			this.expecting= EXPECTING_RAW;
		}
		else if(script){
			this.expecting= EXPECTING_SCRIPT;
			this.scriptParameters= attribs;
		}
		else if(name=="vw:if"){
			this.expecting= EXPECTING_HTML;
			this.beginIfExp(attribs["expression"])
		}
		else if(name=="vw:else"){
			this.expecting= EXPECTING_HTML;
			this.beginElseExp()
		}
		else if(name=="vw:elseif"){
			this.expecting= EXPECTING_HTML;
			this.beginElseIfExp(attribs["expression"])
		}

		else if(name=="vw:section"){
			this.expecting= EXPECTING_HTML;
			this.beginSection(attribs)
		}

		else if(name=="vw:import"){
			this.expecting= EXPECTING_HTML;
			this.writeImport(attribs)
		}

		else if(name=="vw:foreach"){
			this.expecting= EXPECTING_HTML;
			this.beginForEach(attribs)
		}

	}
	else{

		
		this.content+= "<" + name + " ";
		if(name=="script" /*|| name=="pre"*/){
			this.expecting= EXPECTING_PRE
		}
		for(var id in attribs){
			var val= attribs[id];
			var i, raw= false
			this.content+= id+"=\"";


			while((i= val.indexOf("${"))>=0){
				
				// Es una expression ...
				if(val[i-1]=="#"){
					i--
					raw= true
				}

				var text= val.substring(0,i);
				if(text.length>0){
					this.content += he.encode(text);
				}
				var y= val.indexOf("}");
				if(!y){
					throw new core.VW.E6Html.ParseException("Se esperaba `}` para completar la expresión");
				}
				this._writeText();
				if(raw)
					i++

				var exp= val.substring(i+2, y);
				val= val.substring(y+1);
				try{
					if(raw)
						this.body.push(this.__writeExpressionR(exp));
					else
						this.body.push(this.__writeExpressionE(exp));
				}catch(e){
					throw new core.VW.E6Html.ParseException("Error al compilar la expresión " + exp + ". " + e.message, e)
				}
			}
			this.content += val + '" ';
		}
		this.content+= ">";
	}
}

Parser.prototype.ontext= function(text){


	if(this.expecting == EXPECTING_EXPRESSION){
		this.scriptText= this.scriptText||""
		this.scriptText += text


		//vw.log(text)
		//this.body.push(this.__writeExpressionE(text));
	}
	else if(this.expecting == EXPECTING_RAWEXPRESSION){

		this.scriptText= this.scriptText||""
		this.scriptText += text

		//this.body.push(this.__writeExpressionR(text));
	}
	else if(this.expecting == EXPECTING_BASE64EXPRESSION){

		this.scriptText= this.scriptText||""
		this.scriptText += text

		//this.body.push(this.__writeExpression64(text));
	}
	else if(this.expecting == EXPECTING_BASE64){

		this.scriptText= this.scriptText||""
		this.scriptText += text

		//this.body.push(this.__writeBase64(text));
	}
	else if(this.expecting==EXPECTING_SCRIPT){
		this.scriptText= this.scriptText||""
		this.scriptText += text
		//this._procesarScript(text);
	}
	else{
		var i;
		var encode=this.expecting!=EXPECTING_PRE && this.expecting!=EXPECTING_RAW

		if(this.expecting==EXPECTING_HTML){
			text= text.replace(/\r\n+|\r+/g, "\n")
			text= text.replace(/\t+/g, " ")
		}
		while((i= text.indexOf("${"))>=0){
				
			// Es una expression ...
			var text1= text.substring(0,i);
			if(text1.length>0){
				this.content += encode ? he.encode(text1): text1;
			}
			var y= text.indexOf("}", i+2);
			if(!y){
				throw new core.VW.E6Html.ParseException("Se esperaba `}` para completar la expresión");
			}
			this._writeText();

			var exp= text.substring(i+2, y);
			text= text.substring(y+1);
			try{
				this.body.push(encode?this.__writeExpressionE(exp):this.__writeExpressionR(exp));
			}
			catch(e){
				throw new core.VW.E6Html.ParseException("Error al compilar la expresión " + exp + ". " + e.message, e)
			}
		}	
		this.content += encode?he.encode(text):text;
	}
}


Parser.prototype._procesarScript= function(text){
	var lang= this.scriptParameters.lang
	var xParser
	if(lang==undefined || lang.toLowerCase()=="ecmascript" || lang.toLowerCase()=="ecmascript6"){
		xParser= core.VW.Ecma2015.Parser.ecmaParser 
	}
	else{
		if(this.langParsers){
			xParser= this.langParsers[lang.toLowerCase()]
		}
	}
	if(xParser){
		
		this.scriptText=""
		var async= this.scriptParameters.async!==undefined
		var ast= xParser.parse(text,{sourceType:'module'});
		
		if(ast.program)
			ast=ast.program
		
		var body= ast.body
		if(body.length==0){
			return; 
		}
		if(async){
			
			// Debe devolver una función el script 
			if(body.length!=1 || !body[0].expression){
				throw new core.VW.E6Html.ParseException("Se esperaba una expresión");
			}

			var exp= body[0].expression;
			if(exp.type.indexOf("FunctionExpression")<0){
				throw new core.VW.E6Html.ParseException("Se esperaba una expresión de Función");	
			}

			this.body.push({
	            "type": "ExpressionStatement",
	            "expression": {
	                "type": "CallExpression",
	                "callee": {
	                    "type": "Identifier",
	                    "name": "await"
	                },
	                "arguments": [
	                    {
			                "type": "CallExpression",
			                "callee": exp,
			                "arguments": []
			            }
	                ]
	            }
	        })
		}
		else{
			for(var i=0;i< body.length;i++){
				this.body.push({
	                "type": "CallExpression",
	                "callee": body[i].expression,
	                "arguments": []
	            });
			}
		}
	}
	else{
		throw new core.VW.E6Html.ParseException("El lenguaje " + lang + "no está soportado del lado servidor");
	}
}



Parser.prototype.onclosetag= function(tagname){
	

	var s1
	if(this.expecting == EXPECTING_EXPRESSION){
		s1= this.scriptText
		this.scriptText=''


		this.body.push(this.__writeExpressionE(s1));
	}
	else if(this.expecting == EXPECTING_RAWEXPRESSION){

		s1= this.scriptText
		this.scriptText=''

		this.body.push(this.__writeExpressionR(s1));
	}
	else if(this.expecting == EXPECTING_BASE64EXPRESSION){

		s1= this.scriptText
		this.scriptText=''

		this.body.push(this.__writeExpression64(s1));
	}
	else if(this.expecting == EXPECTING_BASE64){

		s1= this.scriptText
		this.scriptText=''

		this.body.push(this.__writeBase64(s1));
	}




	var nod=false
	var especial=Parser.codeTags.indexOf(tagname)>=0;
	if(especial){
		if(tagname=="vw:if"||tagname=="vw:else"||tagname=="vw:elseif"||tagname=="vw:section"||tagname=="vw:foreach"){
			this.endlastExp();
			nod= true
		}
		else if(tagname=="script" && this.expecting==EXPECTING_SCRIPT){
			this.id=this.id|0
			this.id++
			this._procesarScript(this.scriptText)
		}
		nod= nod || tagname=="vw:import"
	}
	if((this.expecting== EXPECTING_HTML||this.expecting==EXPECTING_PRE) && !nod){
		this.content+= "</" + tagname + ">";
	}
	this.expecting= EXPECTING_HTML;
}



Parser.prototype.parse= function(/*string */code){
	
	this.body=[];
	var ast= {
	    "type": "Program",
	    "body": [
	        {
	            "type": "ExpressionStatement",
	            "expression": {
	                "type": "ArrowFunctionExpression",
	                "id": null,
	                "params": [
	                    {
	                        "type": "Identifier",
	                        "name": "context"
	                    }
	                ],
	                "defaults": [],
	                "body": {
	                    "type": "BlockStatement",
	                    "body": [

	                    	this.__getE6HtmlDecAst(),
	                        {
	                            "type": "VariableDeclaration",
	                            "declarations": [
	                                {
	                                    "type": "VariableDeclarator",
	                                    "id": {
	                                        "type": "Identifier",
	                                        "name": "Stream"
	                                    },
	                                    "init": {
	                                        "type": "MemberExpression",
	                                        "computed": false,
	                                        "object": {
	                                            "type": "Identifier",
	                                            "name": "context"
	                                        },
	                                        "property": {
	                                            "type": "Identifier",
	                                            "name": "out"
	                                        }
	                                    }
	                                }
	                            ],
	                            "kind": "var"
	                        },
	                        {
	                            "type": "VariableDeclaration",
	                            "declarations": [
	                                {
	                                    "type": "VariableDeclarator",
	                                    "id": {
	                                        "type": "Identifier",
	                                        "name": "$content"
	                                    },
	                                    "init": {
	                                        "type": "StringLiteral",
	                                        "value": "",
	                                        extra:{
	                                        	"raw": '""',
	                                        	rawValue: ''
	                                        }
	                                    }
	                                }
	                            ],
	                            "kind": "var"
	                        },
	                        {
	                            "type": "ReturnStatement",
	                            "argument": {
	                                "type": "ArrowFunctionExpression",
	                                "id": null,
	                                "params": [],
	                                "defaults": [],
	                                "body": {
	                                    "type": "BlockStatement",
	                                    "body": this.body
	                                },
	                                "async":true,
	                                "generator": false,
	                                "expression": false
	                            }
	                        }
	                    ]
	                },
	                "generator": false,
	                "expression": false
	            }
	        }
	    ],
	    "sourceType": "script"
	};

	var parser = new htmlparser2.Parser(this,{decodeEntities:true});
	parser.write(code);
	parser.end();
	parser=null;

	this._writeText();
	// Ahora procesar el ast generado 

	var l= this.parser.parseASTAndGenerate(ast);
	ast=null;	
	//console.log(l.code)
	return l;
}


Parser.prototype.parseFile= function(/*string */file){
	var raw = fs.readFileSync(file, 'utf8');
	raw = (raw.charCodeAt(0) === 0xFEFF) ? raw.substring(1) : raw
	return this.parse(raw);
}