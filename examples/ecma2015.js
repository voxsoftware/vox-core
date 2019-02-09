
//require("../main.js");
var parser= new core.VW.Ecma2015.Parser();
var fs= require("fs");




var d=new Date();
var code= parser.parse(fs.readFileSync(__dirname +"/_testparser.js","utf8"));
vw.log(new Date()-d)

/*
var d=new Date();
var code= parser.parse2(fs.readFileSync(__dirname +"/_testparser.js","utf8"));
vw.log(new Date()-d)

var d=new Date();
var code= parser.parse2(fs.readFileSync(__dirname +"/_testparser.js","utf8"));
vw.log(new Date()-d)
*/
fs.writeFileSync(__dirname +"/_testparserR.js",code.code)
vw.info(code.code);
//eval(code)