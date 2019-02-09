import Path from 'path'
var Fs= core.System.IO.Fs
import fs from 'fs'
var StaticServe= core.VW.Http.StaticServe
import Mime from 'mime-types'
import Zlib from 'zlib'
import Compressible from 'compressible'

class Server{

	constructor(){
		this.$paths= []
	}


	addPath(path){
		this.$paths.push(path)
	}


	removePath(path){
		var index= this.$paths.indexOf(path)
		this.$paths[index]= undefined
	}

	async handle(args){


		var url= args.request.url
		var path, pathO

		var i= url.indexOf("?")
		if(i>=0)
			url= url.substring(0, i)


		for(var i=0;i<this.$paths.length;i++){
			pathO= this.$paths[i]
			if(pathO){
				path= Path.join(pathO, decodeURI(url))
				if(await Fs.sync.exists(path))
					break

				path= undefined
			}
		}


		if(!path)
			return await  this.error404(args)


		return await  this.responseFile(path, args)

	}


	async responseFile(path, args){

		//try{
			var task 
			var modified= args.request.headers["if-modified-since"]
			var stat= await Fs.async.stat(path)
			var mtime2= stat.mtime
			var mtime= mtime2.getTime()
			//vw.info(modified, mtime2.toGMTString())
			if(modified){


				// Verificar si no ha sido modificado ...
				var modifieddate= new Date(modified)
				modifieddate= modifieddate.getTime()
				//vw.warning(modifieddate, mtime)

				if(modifieddate-mtime<1000)
					return this.notmodified304(args)
			}


			var range= args.request.headers["range"], startByte, endByte
			if(range && range.startsWith("bytes=")){
				range= range.split("=")
				if(range.length==2){
					range= range[1].split("-")
					startByte= range[0]|0
					endByte= range[1]|0
				}
			}

			var dirOrNot= false
			if(!Fs.sync.exists(path)){
				dirOrNot= true
			}

			var stat= await Fs.async.stat(path)
			if(stat.isDirectory())
				dirOrNot= true


			if(dirOrNot){
				args.response.writeHead(403)
				args.response.end()
				return
			}

			//var stream= new core.System.IO.FileStream(path, core.System.IO.FileMode.Open, core.System.IO.FileAccess.Read)
			//stream.position=0
			
			
			var stat= await Fs.async.stat(path)
			stat.position=0
			
			try{
				var partial= startByte>0 || endByte	< stat.size-1, length
				var len=stat.size
	
				if(partial){
					stat.position= startByte
					if(endByte>0){
						stat.maxPosition= endByte+1
						length= stat.maxPosition- stat.position
					}
					else{
	
						length= len-stat.position
						stat.maxPosition= len
					}
				}
				else{
					length= len
				}
	
				var gzip, deflate, encoding
				if(args.request.headers["accept-encoding"] && length>100){
					// Si el tamaño del archivo es menor a 100 no vale la pena comprimir
					encoding=args.request.headers["accept-encoding"].toUpperCase()
					gzip= encoding.indexOf("GZIP")>=0
					deflate= encoding.indexOf("DEFLATE")>=0
				}
	
	
				var mtype= this.getMimeType(path)
				var charset= Mime.charsets.lookup(mtype)
				var head= {
					"last-modified": mtime2.toGMTString(),
					/*"content-length": length, */
					"accept-range": "bytes",
					"accept-ranges": "bytes",
					"content-type": mtype + (charset?";Charset="+charset: ""),
					"cache-control": "max-age=1800"
				}
	
				head["ETag"]= mtime2.getTime().toString(16)
				if(partial){
					head["content-range"]= "bytes " + stat.position.toString() + "-" + ((stat.maxPosition||length)-1).toString()
						+  "/" +  len.toString()
	
				}
				if(!Compressible(mtype)){
					deflate=gzip=false
				}
	
				/*if(deflate){
					head["content-encoding"]= "deflate"
				}
				else */if(gzip){
					head["content-encoding"]= "gzip"
				}
				else{
					head["content-length"]= length
				}
	
	
				if(this.fixedHeaders){
					//vw.log(this.fixedHeaders)
					for(var id in this.fixedHeaders){
						if(this.fixedHeaders[id]===undefined)
							delete head[id]
						else
							head[id]= this.fixedHeaders[id]
					}
				}
	
				args.response.writeHead(partial?206:200,head)
				if(this.getHead)
                    return args.response.end()
	
	
	
				//var stream2= StaticServe.FileSeekableStream.createStream(stream)
	
				var stream2= fs.createReadStream(path, {
					//fd: stream.$fd,
					start: stat.position,
					end: stat.maxPosition
				})
				/*
				if(deflate){
					vw.info("streaming with zlib")
					stream2.pipe(Zlib.createDeflate()).pipe(args.response)
				}
				else */if(gzip){
					process.env.DEBUG &&console.info("streaming with gzip")
					stream2.pipe(Zlib.createGzip()).pipe(args.response)
				}
				else{
					process.env.DEBUG &&console.info("streaming without compression")
					stream2.pipe(args.response)
				}
				
				
				task= new core.VW.Task()
				args.response.on("finish", function(){
					task.finish()
				})
				
				await task 
			}
			catch(e){
				throw e 
			}finally{
				
			}
			//().pipe(args.response)

		//}
		//catch(e){
		//	this.serverError500(args, e)
		//}

	}


	getMimeType(file){

		return Mime.lookup(Path.extname(file))|| "text/plain"
	}

	serverError500(args, e){
		//vw.error(e)
		args.response.writeHead(500,{
			"Content-type": "text/plain;charset=utf8"
		})

		args.response.write(e.message)
		args.response.write("\n"+e.stack)
		args.response.end()
	}

	notmodified304(args){
		args.response.writeHead(304,{
			"accept-range": "bytes",
			"cache-control": "max-age=1800"
		})
		args.response.end()
	}

	error404(args){

		/*
		args.response.writeHead(404, {
			"Content-type": "text/plain;charset=utf8",
			"accept-range": "bytes"
		})

		args.response.write("La url no es válida")
		args.response.end()*/
		return args.continueAsync()
	}

}

export default Server
