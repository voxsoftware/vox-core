

/**
* @author James Suárez
* 16-03-2016
* Este módulo carga un módulo y crea variables propiedades dentro de core
* que es un objeto global donde se carga todo lo relacionado con vox
* a partir de una configuración como la de core_modules.json
* presente en este mismo módulo
*/

var fs= require("fs")
var Path= require("path")
//var Fs= core.System.IO.Fs

var Module= module.exports= function(dirname){
	this.$dirname= dirname
}

Module.__defineGetter__("extensions", function(){
	var ext=[]
	for(var id in require.extensions){
		ext.push(id)
	}
	return ext
})


Module.require= function(module){

	var ext= Path.extname(module)
	if(ext==".dt"){
		return (new core.org.voxsoftware.Developing.Formats.DataText()).read(module)
	}

	Module.cache= Module.cache||{}
	var file= require.resolve(module)
	if(!file)
		throw new core.System.IO.FileNotFoundException(file)

	var stat= fs.statSync(file)
	var c= Module.cache[file]= Module.cache[file]||{}
	if(stat.mtime.getTime()!= c.mtime){
		delete require.cache[file]
	}
	c.mtime= stat.mtime.getTime()
    return require(file)
}

Module.prototype.loadConfigFile= function(file){
	if(!Path.isAbsolute(file)){
		// JxCore-cordova. Hay que tener cuidado en las rutas ... 19-05-2016
		file= Path.normalize(Path.join(this.$dirname, file))
	}
	try{

		this.loadConfig(require(file))
	}
	catch(e){
		this.loadConfig(JSON.parse(fs.readFileSync(file, "utf8")))
	}
}

Module.prototype.loadConfig= function(config){
	this.$config= config
}



Module.prototype.import= function(){
	return Module.procesar(this, this.$config)
}


var getPropertyName= Module.getPropertyName= function(file){
	var extensions= Module.extensions
	for(var i=0;i<extensions.length;i++){
		var ext= extensions[i];

		if(file.endsWith(ext)){
			return Path.basename(file, ext)
		}
	}

	return file
}

var createGetter=Module.createGetter= function(value,name,file){
	var dir= Path.dirname(file)
	var y= function(){
		var e;
		if(!(e=value.$[name])){
			e=Module.require(file);
			e= e.default || e;
			Object.defineProperty(e, "__filename", {
				writable:true,
				enumerable:false
			})
			e.__filename= file
			e.__dirname= dir
			value.$[name]=e;
		}
		return e;
	}
	y.__getter= true
	Object.defineProperty(y, "__filename", {
		writable:true,
		enumerable:false
	})
	y.__filename= file
	y.__dirname= dir
	value.__defineGetter__(name, y);
}


var procesar= Module.procesar=function(Module, value, libcore){
	var file,dir
	if(!libcore)
		libcore= core

	for(var id in value){
		var obj= libcore[id]
		var obj2= value[id]
		if(typeof obj==="undefined"){
			obj= libcore[id]= value[id]
		}

		if(typeof obj2 =="object"){
			if(typeof obj !== "object")
				throw new core.System.Exception("Hay conflictos con este módulo '" + id + "'")
			procesar(Module, obj2, obj);

		}
	}


	value= libcore
	if(value.readPath){
		dir= Path.resolve(Module.$dirname, value.readPath)
		Object.defineProperty(value, "$", {
			"enumerable":false,
			"writable": true
		})
		value.$={};
		value.__dirname= dir
		// JxCore-cordova. Hay que tener cuidado en las rutas ... 19-05-2016
		var files= fs.readdirSync(dir), name, ifile
		for(var i=0;i<files.length;i++){
			file=files[i]
			if(file[0]!='.' && file[0].toUpperCase()==file[0]){
				name=getPropertyName(file)
				// JxCore-cordova. Hay que tener cuidado en las rutas ... 19-05-2016
				ifile= Path.resolve(Module.$dirname, value.readPath + "/" + file)
				var stat= fs.statSync(ifile);
				if(stat.isFile()){
					createGetter(value,name,ifile);
				}
			}
		}
		delete value.readPath
	}
}
