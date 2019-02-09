var fs= require("fs")
var code=fs.readFileSync(__dirname + "/_testparser.js","utf8");
var esprima= require("l:\\proyectos\\esprima\\dist\\esprima.js")
//var esprima= require("c:\\users\\jw\\esprima-fb")
var ast=esprima.parse(code,{sourceType:"module"})
//console.info(JSON.stringify(ast,4,'\t'));

fs.writeFileSync(__dirname+"/astcode.json", JSON.stringify(ast,4,'\t'))