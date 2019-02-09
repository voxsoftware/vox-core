
var fs= require("fs")
require("./main")
var classes=[]

var p= function(prefix, obj){
	for(var id in obj){
		var o= obj[id]
		var pr= prefix+ (prefix?".":"") + id
		if(typeof o=="function" /* && id[0]==id[0].toUpperCase()*/)
			classes.push(pr)
		else if (typeof o=="object")
			p(pr, o)
	}
}


p('', core)
// console.info(classes)

var Str=[]
for(var i=0;i<classes.length;i++){
	Str.push("* [" + classes[i] +
		"](http://voxsoftware.github.io/vox-core/docs/vox-core/0.1.0/" + 
		classes[i] + ".html)")
}

fs.writeFileSync(__dirname + "/classes.md", Str.join("\n"))