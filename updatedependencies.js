

var fs= require("fs")
var Path= require("path")

var allDeps= {}
var modulePath= Path.join(__dirname, "submodules")
var paths= fs.readdirSync(modulePath)
for(var i=0;i<paths.length;i++){
	var p= Path.join(modulePath, paths[i])
	var stat= fs.statSync(p)
	if(stat.isDirectory()){
		var file= Path.join(p,"package.json")
		if(fs.existsSync(file)){
			var deps= require(file).dependencies
			if(deps){
				for(var id in deps){
					allDeps[id]= deps[id]
				}
			}
		}
	}
}


var json= require("./package.json")
json.dependencies= allDeps
fs.writeFileSync(Path.join(__dirname,"package.json"), JSON.stringify(json,4,'\t'))