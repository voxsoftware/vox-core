var Fs= core.System.IO.Fs
import Path from 'path'
import Zlib from 'zlib'
class Creator{

	constructor(dir, out){
		this.dir= dir
		this.out= out
		this.files=[]
		this.open()
	}

	open(){
		var out= this.out
		if(out instanceof core.System.IO.Stream){
			this.stream= out
		}
		else{
			var stream= new core.System.IO.FileStream(out, core.System.IO.FileMode.Truncate, core.System.IO.FileAccess.Write)
			this.stream= stream
		}
		//stream.setLength(4096)
		//stream.position= 4096
	}

	async compile(){
		await this.process(this.dir)
		await this.end()
	}

	async end(){
		//this.stream.position=0
		var buf= new Buffer(JSON.stringify(this.files))
		await this.stream.writeAsync(buf,0,buf.length)

	}

	async process(path){

		var files= await Fs.async.readdir(path)
		var file, stat, content, gziped, buf, ufile
		for(var i=0;i<files.length;i++){
			file=files[i]
			ufile= Path.join(path, file)
			stat= await Fs.async.stat(ufile)

			if(stat.isDirectory()){
				await this.process(ufile)
			}
			else{

				// Leer el archivo ...
				content= await Fs.async.readFile(ufile)
				gziped=Zlib.gzipSync(content, {
					level: 8
				})

				stat.isdirectory= stat.isDirectory()
				stat.isfile= stat.isFile()

				this.files.push({
					file: Path.relative(this.dir, ufile),
					offset: this.stream.position,
					length: gziped.length,
					stat
				})
				await this.stream.writeAsync(gziped, 0, gziped.length)

			}
		}
	}
}

export default Creator
