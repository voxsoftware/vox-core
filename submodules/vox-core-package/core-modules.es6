



var Path= require("path")
var Fs= core.System.IO.Fs
var obj= {
	"readPath": "./src"
}


// Revisar directorios
var revisar= function(obj, src){
	var stat, ufile, dirs= Fs.sync.readdir(src), file
	for(var i=0; i<dirs.length;i++){
		file= dirs[i]
		ufile= Path.join(src, file)
		stat= Fs.sync.stat(ufile)
		if(stat.isDirectory()){
			obj[file]= {
				readPath : ufile
			}
			revisar(obj[file], ufile)
		}
	}
}


revisar(obj, Path.join(__dirname, "src"))
module.exports= obj
