/*global core*/


if(!String.prototype.endsWith){
	String.prototype.endsWith= function(str){
		if(!str || !str.length)
			return false
		return this.substring(this.length-str.length)==str
	}
}


if(!String.prototype.startsWith){
	String.prototype.startsWith= function(str){
		if(!str || !str.length)
			return false
		return this.substring(0, str.length)==str
	}
}


var Path= require("path")
var fs= require("fs")

var deps={}
var modulePath= Path.join(__dirname, "submodules")
var paths= fs.readdirSync(modulePath)
for(var i=0;i<paths.length;i++){
	var p= Path.join(modulePath, paths[i])
	var stat= fs.statSync(p)
	if(stat.isDirectory()){
		deps[paths[i]]= p
	}
}


module.exports=require(deps["vox-core-base"])
require(deps["vox-core-io"])
require(deps["vox-core-package"])
require("./load-kll")


global.sourceMapRetrieve= []
require('source-map-support').install({
  retrieveSourceMap: function(source) {
  	var f, r 
    for(var i=0;i<global.sourceMapRetrieve.length;i++){
    	f= global.sourceMapRetrieve[i]
    	if(typeof f=="function")
    		r= f(source)
    	
    	if(r)
    		return r
    }
    return null
  }
})





core.VW.path= __dirname
core.VW.version= vw.version= require("./package.json").version
for(var id in deps){
	if(id!="vox-core-base")
		require(deps[id])
}

core.VW.Ecma2015.Parser