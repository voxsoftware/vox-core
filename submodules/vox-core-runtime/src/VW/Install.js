var tmp= process.env.TMP || "/tmp";
var tmp2 = tmp+"/vwlog2";
tmp+= "/vwlog";
var Os= require("os")


var Path= path= require("path");
var cp= require("child_process");
var fs= require("fs");
var os= require("os").platform();
var Install= module.exports= function(){
}


Install.setSilent= function(){
	//var f1=fs.openSync(tmp,"w+");
	//process.stdout.write=function(str){
	//	fs.writeSync(f1,str);
	//};
}

Install.scriptInstall= function(){

	/* Este script se ejecuta al final de instalación del módulo */ 
	vw.warning("Vox v"+ vw.version);
	vw.log("Finalizando instalación");
	core.VW.Console.setColorLog().write("Espere un momento ...");
	var i= setInterval(function(){
		core.VW.Console.write("...");
	},1000);

	var task= Install.installationAsync();
	/*
	task.oncomplete= function(){

		clearTimeout(i);
		vw.log("...");
		vw.log();
		if(this.exception){
			vw.error(this.exception);
			vw.log();
			vw.warning("Puede utilizar el comando jx '{directorio de vw}' -self-register para copiar los ejecutables");
			return;
		}


		
		vw.log("La instalación ha finalizado. Log: ");
		vw.log("");
		core.VW.Console.write(task.result.log);

	}
	*/
}

Install.installationAsync= function(){
	core.VW.Console.setColorWarning().writeLine("Copiando archivos ejecutables ...")

	try{
		core.VW.Install.copyBin()
	}
	catch(e){

		vw.error(e.stack)
		//core.VW.Install.writeEnd()
		return true
	}

	vw.log("La instalación finalizó correctamente. Puede ejecutar colocando 'vox' desde un terminal o cmd en Windows")
	core.VW.Console.resetColors()
	//core.VW.Install.writeEnd()
	process.exit(0)
	return true
}

Install.detachedInstallationAsync= function(){

	/* Este método está pensado para evitar errores de permisos en sistemas linux 
	* específicamente en Ubuntu que su manejo de sudo es muy diferente ...
	*/
	var task= core.VW.Task.get(arguments);
	
	fs.closeSync(fs.openSync(tmp,'w+'));
	//var out = fs.openSync(tmp, 'a');
	//var err = fs.openSync(tmp, 'a');
	//console.info(process.argv[0], [path.normalize(__dirname+"/../init.js"), "-install-vw", "-silent"])
	var unix= os!="win32"
	var args
	//if(unix){
	//	args=[process.argv[0], path.join(core.VW.path, "cli.js"), "-self-register", "-silent"]
	//	program= "sudo"
	//}
	//else{
		args=[path.join(core.VW.path, "cli.js"), "-self-register", "-silent"]
		program= process.argv[0]
	//}


	if(fs.existsSync(tmp)){
		fs.unlinkSync(tmp);
	}
	var s= fs.openSync(tmp,'a')


	var p= cp.spawn(program, args,{
		"detached": false, // Si es Windows se hace no detached 
		"stdio": [0, 1, 2]
	});

	//if(unix)
	//	process.stdin.resume()

	p.on("exit", function(code){
		process.exit(code)
	})

	//p.detach()
	return 


	var timeout = 10000;
	var verificarLog= function(){
		timeout-=20;
		if(timeout<=0){
			task.exception=new core.VW.TimeoutException()
			task.finish()
			return
		}
		if(!fs.existsSync(tmp2)){
			return setTimeout(verificarLog,20);
		}

		setTimeout(function(){
			task.result= {
				log:fs.readFileSync(tmp2,'utf8')
			}

			fs.unlinkSync(tmp2)
			fs.unlinkSync(tmp)
			task.finish()
		},30)
		
	}

	setTimeout(verificarLog,20);
	return task;
}



Install.copyBin = function(){

	if(os=="win32"){	
		try{	
			var dirname= core.VW.path//path.normalize(__dirname+"/..");
			var filecmd= process.env.WINDIR+ "/vox.bat";
			var str=[];
			var exe= process.execPath;
			str.push("@echo off");
		    str.push('"' + exe +'" --max_old_space_size='+parseInt((Os.totalmem()/(1024*1024))/1.2)+' --expose-gc "' + dirname + '\\cli.js" %*');
		    fs.writeFileSync(filecmd, str.join("\r\n"));
		}
		catch(e){
			throw new core.System.IO.IOException("No se pudo copiar los archivos binarios. Aségurese de ejecutar como administrador. "+e.message, e);
		}


		try{	
			var file= core.VW.path+ "/voxw.exe";
			var dest= process.env.WINDIR+ "/voxw.exe";
			fs.writeFileSync(dest, fs.readFileSync(file));

			file= core.VW.path+ "/voxw.exe.config";
			dest= process.env.WINDIR+ "/voxw.exe.config";
			fs.writeFileSync(dest, fs.readFileSync(file));
		}
		catch(e){
			throw new core.System.IO.IOException("No se pudo copiar los archivos binarios. Aségurese de ejecutar como administrador. "+e.message, e);
		}
	}

	else{
		var p, path= core.VW.path + "/vox"
		fs.chmodSync(path, 0777)

		/*
		try{
			if(fs.existsSync("/usr/bin/vox"))
				fs.unlinkSync("/usr/bin/vox")

	    	fs.symlinkSync(path, "/usr/bin/vox");
	    	p= "/usr/bin/vox"
		}
		catch(e){
			vw.error(e)
			try{
				if(fs.existsSync("/usr/local/bin/vox"))
					fs.unlinkSync("/usr/local/bin/vox")

				fs.symlinkSync(path, "/usr/local/bin/vox");
				p= "/usr/local/bin/vox"
			}
			catch(e){
				vw.error(e)

				// crear un archivo entonces
				var astr= [
					"#!/usr/bin/env bash",
					path + ' "$@"',
					"exit $?"
				]

				try{
					

					fs.writeFileSync("/usr/bin/vox", astr.join("\n"))
					p= "/usr/bin/vox"
				}
				catch(e){
					
					fs.writeFileSync("/usr/local/bin/vox", astr.join("\n"))	
					p= "/usr/local/bin/vox"
				}
			}
		}

		if(p)
			fs.chmodSync(p, 0755)
		*/
		core.VW.PackageManager.Environment.init()
		p= Path.join(core.VW.PackageManager.Environment.globalPath,"bin", "vox")
		if(fs.existsSync(p))
			fs.unlinkSync(p)
		fs.symlinkSync(path, p)

		if(p)
			fs.chmodSync(p, 0777)

	}

	
}

Install.writeEnd= function(){
	if(fs.existsSync(tmp))
		fs.writeFileSync(tmp2,fs.readFileSync(tmp));
}