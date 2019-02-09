
var fs
var Path= require("path")
var helpoptions, examples,writeHelp
module.exports= function(Command){
	var options= Command.getAsOptionsObject()
	if(process.argv.length<3){
	}

	if(options.version){
		core.VW.Console.setColorWarning().write("v" + vw.version).resetColors()
		return true
	}


	if(options["self-register"]){

		if(options.silent){
			core.VW.Install.setSilent();
		}

		core.VW.Console.setColorWarning().write("Vox v" + vw.version)
			.writeLine().writeLine().writeLine("Copiando archivos ejecutables ...")

		try{
			core.VW.Install.copyBin();
		}
		catch(e){

			vw.error(e.stack)
			core.VW.Install.writeEnd()
			return true
		}

		vw.log("La instalación finalizó correctamente. Puede ejecutar colocando 'vox' desde un terminal o cmd en Windows")
		core.VW.Console.resetColors()
		core.VW.Install.writeEnd()
		return true
	}


	if(options.install){
		core.VW.Console.setColorWarning().writeLine("Vox v" + vw.version)
			.resetColors()
		core.VW.Console.writeLine("Install command is disabled in this version")
		return true;
	}

	if(options.test){
		var examples1= examples();
		var ex= Command.getFirstValue();
		var fex= examples1[(ex||"").toLowerCase()];
		if(fex){
			require(fex);
			return true;
		}

		core.VW.Console.setColorWarning().writeLine("Vox v" + vw.version)
			.setColorError().write("El test " + ex + " no existe").resetColors();
		//process.exit(0);
		return true;

	}


	if(options.interactive){
		core.VW.Console.setColorWarning().writeLine("Vox v" + vw.version, "(interactive mode)").resetColors();
		core.VW.Console.writeLine("Interactive is disabled in this version. Please use node and require('vox-core')")
		return true
	}

	if(options.transpile){
		try{

			core.VW.Console.setColorWarning().writeLine("Vox v" + vw.version)
			if(!options.in){
				throw new Error("Debe especificar el parámetro --in");
			}
			if(!options.out){
				throw new Error("Debe especificar el parámetro --out");
			}

			if(!fs){
				fs= require("fs")
			}

			options.in= Path.normalize(options.in)
			if(!fs.existsSync(options.in)){
				throw new Error("El archivo o directorio " + options.in + " no existe")
			}

			core.VW.Console.setColorWarning()
			core.VW.Console.writeLine()
			core.VW.Transpile(options.in, options.out)
			core.VW.Console.setColorLog().write("Completado 100%, Entrada: ", options.in, " Salida: ", options.out);
			
			return
		}
		catch(e){
			core.VW.Console.setColorError().write(e.stack).resetColors()			
			return
		}

	}
	else if(options.vcf){
		try{

			core.VW.Console.setColorWarning().writeLine("Vox v" + vw.version);

			if(!options.in){
				throw new Error("Debe especificar el parámetro --in");
			}
			if(!options.out){
				throw new Error("Debe especificar el parámetro --out");
			}



			if(!fs){
				fs= require("fs");
			}

			options.in= Path.normalize(options.in)

			if(!fs.existsSync(options.in)){
				throw new Error("El archivo o directorio " + options.in + " no existe");
			}
			var stat=fs.statSync(options.in);
			core.VW.Console.setColorWarning();
			core.VW.Console.writeLine();
			var files=0;
			if(options.decompress!==false){

				core.VW.VcfUtil.decompressToFolder(options.in,options.out, function(ev){
					core.VW.Console.writeLine("Procesado: ", ev.writtenfiles.toString().padLeft(5,' '), " archivos, ",  ev.percent.toFixed(4), "%");
				});
			}
			else{
				if(stat.isFile()){
					core.VW.VcfUtil.compressFile(options.in,options.out);
				}
				else{

					core.VW.VcfUtil.compressFolder(options.in,options.out, function(ev){
						core.VW.Console.writeLine("Procesado: ", ev.writtenfiles.toString().padLeft(5,' '), " archivos, ",  ev.percent.toFixed(4), "%");
					});
				}
			}
			core.VW.Console.setColorLog().write("Completado 100%, Entrada: ", options.in, " Salida: ", options.out);
		}
		catch(e){
			core.VW.Console.setColorError().write(e.stack).resetColors()
			return true
		}
	}


	if(true || options.help){ 
		core.VW.Console.setColorLog().write("Vox").resetColors().write(" versión ").setColorWarning().writeLine(vw.version)
			.writeLine()
		writeHelp()
		core.VW.Console.resetColors()
		return true;
	}

	return false;
}



examples= function(){
	if(!fs){
		fs=require("fs")
	}
	var obj={};
	var path=__dirname+"/examples";
	var files=fs.readdirSync(path);
	for(var i=0;i<files.length;i++){
		var file= files[i];
		var ifile=path+"/"+file;
		if(file.substring(file.length-3)==".js"){
			file= file.substring(0,file.length-3);
		}
		if(file.substring(file.length-4)==".es6"){
			file= file.substring(0,file.length-4);
		}
		var stat= fs.statSync(ifile);
		if(stat.isFile()){
			obj[file.toLowerCase()]= ifile;
		}
	}
	return obj
}

var cOptions= function(){
	return {
		// "--decompress": "Cuando se usa -vcf indica que se realiza decompresión",
		"-g": "Instalar módulo globalmente. Utilizado con -install",
		"--in": "[ruta] Ruta de entrada para compresión/decompresión. Se usa con -vcf",
		"--out": "[ruta] Ruta de destino para compresión/decompresión. Se usa con -vcf"
	}
}



var cCommands= function(){
	var exampless=[];
	var ex=examples();
	for(var id in ex){
		exampless.push(id);
	}

	return {
		"-help": "Muestra la ayuda",
		"-version": "Muestra la versión instalada de vox",
		"-interactive": "Inicia modo interactivo (soporta solo ES5 por ahora)",
		//"-install": "Instalar una aplicación",
		"-test": "Ejecutar un test. Modo de uso: vox -test NombreTest. Tests disponibles: "+ exampless.join(", "),
		// "-vcf": "Comprimir o descomprimir. Modo de uso: vox -vcf [opciones]",
		//"-self-register": "Instalar en el equipo vox, en el PATH del equipo: vox y voxw(versión Windows sin consola)"
	}
}


writeHelp=function(){
	var help=cOptions()
	var cmds=cCommands()


	vw.warning("Modo de uso:")
	core.VW.Console.writeLine("  comando [opcion [argumento], opcion [argumento] ...] [argumentos]")


	core.VW.Console.writeLine()
	vw.warning("Comandos:")
	var maxl=0
	for(var id in help){
		maxl= Math.max(maxl, id.length)
	}
	for(var id in cmds){
		maxl= Math.max(maxl, id.length)
	}
	maxl+= 5

	for(var id in cmds){
		core.VW.Console.setColorLog().write(("  " + id).padRight(maxl,' ')).resetColors()
		core.VW.Console.writeLine(cmds[id])
	}


	core.VW.Console.writeLine()
	vw.warning("Opciones:")
	for(var id in help){
		core.VW.Console.setColorLog().write(("  " + id).padRight(maxl,' ')).resetColors()
		core.VW.Console.writeLine(help[id])
	}
}

