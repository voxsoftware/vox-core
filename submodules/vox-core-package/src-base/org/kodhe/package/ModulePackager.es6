import Os from 'os'
import Path from 'path'
var Fs= core.System.IO.Fs
var Creator=core.org.kodhe.package.Creator
class ModulePackager extends Creator{


	async compile(){
		if(!this.originalDir)
			this.originalDir= this.dir

		var tempdir= Os.tmpdir()
		if(!this.name)
			throw new core.System.Exception("Debe especificar el nombre del paquete")

		ModulePackager._z++
		var uniqid= Date.now().toString(32)+ModulePackager._z.toString()
		tempdir= Path.join(tempdir, uniqid)
		if(!Fs.sync.exists(tempdir))
			Fs.sync.mkdir(tempdir)

		tempdir= Path.join(tempdir, this.name)
		if(!Fs.sync.exists(tempdir))
			Fs.sync.mkdir(tempdir)

		this.dir= tempdir
		await this.copyFiles()
	}

	async copyFiles(src, dest){
		if(!src){
			await this.copyFiles(this.originalDir, this.dir)
		}
		else{
			var files= core.System.IO.Fs
		}
	}


}
ModulePackager._z=0
export default ModulePackager
