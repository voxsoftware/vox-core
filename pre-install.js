var Cp= require("child_process")
var fs= require("fs")
var Path= require("path")
var Os= require("os")

var gPath



var profiles= function(str, file, exeSource){

	var content=''
	if(fs.existsSync(file))
		content= fs.readFileSync(file,'utf8')
	
	if(content.indexOf(str)<0)
		content+="\n"+str
	fs.writeFileSync(file, content)


	if(exeSource){
		result= Cp.spawnSync("source", [file])
		if(result.stderr && result.stderr.toString())
			throw new Error(result.stderr.toString())
	}

}


// Esto configura el global path, puesto que ya no se va a usar sudo
// para la instalación ...
if(Os.platform()!=="win32"){
	gPath= "/usr/local/"//Path.join(process.env.HOME, ".vox")
	if(!fs.existsSync(gPath))
		fs.mkdirSync(gPath)

	gPath= Path.join(gPath, ".vox")
	if(!fs.existsSync(gPath))
		fs.mkdirSync(gPath)


	fs.chmodSync(gPath, 0777)
	var binPath= Path.join(gPath, "bin")
	if(!fs.existsSync(binPath))
		fs.mkdirSync(binPath)

	var libPath= Path.join(gPath, "lib")
	if(!fs.existsSync(libPath))
		fs.mkdirSync(libPath)

	var modPath= Path.join(libPath, "node_modules")
	if(!fs.existsSync(modPath))
		fs.mkdirSync(modPath)

	var etcPath= Path.join(gPath, "etc")
	if(!fs.existsSync(etcPath))
		fs.mkdirSync(etcPath)

	var sharePath= Path.join(gPath, "share")
	if(!fs.existsSync(sharePath))
		fs.mkdirSync(sharePath)

	fs.chmodSync(binPath, 0777)
	fs.chmodSync(libPath, 0777)
	fs.chmodSync(modPath, 0777)
	fs.chmodSync(etcPath, 0777)
	fs.chmodSync(sharePath, 0777)

	var path= gPath
	var result= Cp.spawnSync("npm", ["config", "set", "prefix", "/usr/local/.vox"])
	if(result.stderr && result.stderr.toString())
		throw new Error(result.stderr.toString())


	// Locals ...
	var str= 'export PATH=~/bin:$PATH'
	var file= Path.join(process.env.HOME, ".vox_profile")
	profiles(str, file, true)


	// Global
	str= 'export PATH=/usr/local/.vox/bin:$PATH'
	file= "/etc/.vox_profile"
	profiles(str, file, true)


	str= "if [ -f ~/.vox_profile ]; then\n\tsource ~/.vox_profile\nfi"
	file= Path.join(process.env.HOME, ".bash_profile")
	profiles(str, file)

	
	file= Path.join(process.env.HOME, ".bashrc")
	profiles(str, file)

	file= Path.join(process.env.HOME, ".profile")
	profiles(str, file)

	str= "if [ -f /etc/.vox_profile ]; then\n\tsource /etc/.vox_profile\nfi"
	file= "/etc/profile"
	profiles(str, file)

	file= "/etc/bash.bashrc"
	profiles(str, file)

	if(!fs.existsSync("/usr/local/.vox/bin/vox")){
		fs.writeFileSync("/usr/local/.vox/bin/vox", "echo 'Vox no está instalado. Ejecute npm install -g vox-core'")
		fs.chmodSync("/usr/local/.vox/bin/vox", 0755)
	}

	// Crear un archivo vox ...
	try{
		if(fs.existsSync("/usr/bin/vox"))
			fs.unlinkSync("/usr/bin/vox")

		fs.symlinkSync("/usr/local/.vox/bin/vox", "/usr/bin/vox")
	}
	catch(e){
		if(fs.existsSync("/usr/local/bin/vox"))
			fs.unlinkSync("/usr/local/bin/vox")

		fs.symlinkSync("/usr/local/.vox/bin/vox", "/usr/local/bin/vox")
	}

}
