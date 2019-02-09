
//import Path from 'path'
//import fs from 'fs'

var Path= require('path')
var fs= require("fs")

//var path=__dirname + "/src"
//var path2=__dirname + "/dist"
var parser
var transpileFile= function(file, out, outname, basename, prefix){
	ext=''
	if(file.endsWith('.es6'))
		ext='.es6'
	else if(file.endsWith('.js'))
		ext='.js'

	if(!outname){
		if(!basename)
			basename= Path.basename(file,ext)
		else
			basename= Path.basename(basename,ext)
		outname= Path.join(out, basename+".js")
	}

	if(!basename)
		basename= Path.basename(file)


	if(ext){
		var res
		if(parser.isBabel){
			res= parser.transform(fs.readFileSync(file,'utf8'), {
				presets: ["es2015","es2016","es2017"],
				sourceMaps: 'inline'
			})
		}
		else{
			res= parser.parse(fs.readFileSync(file,'utf8'))
		}
		fs.writeFileSync(outname, res.code)
		vw.warning("> Procesado: ", (prefix||"") + "/" + basename)
	}
}
var revisePath= function(dir,path2, prefix){
	prefix=prefix || ''
	var dirs= fs.readdirSync(dir)
	var newdir= path2 + prefix
	if(!fs.existsSync(newdir))
		fs.mkdirSync(newdir)


	for(var i=0;i<dirs.length;i++){
		var file= Path.join(dir, dirs[i])
		var item= prefix + "/" + dirs[i]
		var stat= fs.statSync(file)
		if(stat.isDirectory()){
			revisePath(file, path2, item)
		}
		else{
			transpileFile(file, newdir, null, dirs[i], prefix)			
		}
	}
}
exports.default= function(src, dest){
	if(!parser){
		if(process.env.TRANSPILE_MODE=="babel"){
			
			//cargar el import 
			core.org.kodhe.package.Manager.importDirectory(Path.join(__dirname, "..", "..", "..", "..", "libraries", "babel"),"")
			
			parser= require("babel-core")
			parser.isBabel= true
		}
		else{
			parser= new core.VW.Ecma2015.Parser()
		}
	}
	var stat=fs.statSync(src)
	if(stat.isFile()){
		return transpileFile(src, null, dest)
	}
	else{
		return revisePath(src, dest, '')
	}

}