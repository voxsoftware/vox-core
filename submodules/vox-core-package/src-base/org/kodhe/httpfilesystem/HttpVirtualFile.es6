/*global core*/
class HttpVirtualFile extends core.org.kodhe.package.VirtualFile{

	
	constructor(file){
		this.file=file 
	}
	
	
	readFileSync(){
		throw new core.System.NotImplementedException()
	}
	
	readFile(self, encoding, callback){
		var options= {}
		if(typeof encoding=="object"){
			options= encoding
			encoding= options.encoding
		}
		
		self=this
		this.openOptions= options
		this.virtualRead(undefined, 0, undefined, 0).then(function(r){
			
			if(encoding)
				r= r.toString(encoding)
			
			delete self.openOptions
			callback(null, r)
			
		}).catch(function(er){
			delete self.openOptions
			callback(er)
		})
		
	}
	
	
	createReadStream(self,options){
		this.getStream= true 
		try{
			var req= this.virtualRead(undefined, 0, undefined, 0)
			return req
		}catch(e){
			throw e 
		}
		finally{
			this.getStream= false
		}
	}
	
	async copyFile(self, fileOut, callback){
		
		
		var stat= await this._stat()
		vw.info("STAT:",stat)
		var portion= Math.min(4*1024*1024, stat.size)
		var stream= new core.System.IO.FileStream(fileOut, core.System.IO.FileMode.OpenOrCreate, core.System.IO.FileAccess.Write)
		
		try{
			
			
			stream.position=0 
			var offset = 0 , buf
			while(true){
				
				
				buf= await this.virtualRead(undefined, 0, Math.min(stat.size-offset,portion), offset)
				if(buf.length== 0)
					break 
				
				
				vw.info("BUF:",buf)
				await stream.writeAsync(buf,0,buf.length)
				offset+= buf.length
				if(this.len<=offset)	
					break 
				
				
			}
			callback(true)
			
		}
		catch(e){
			callback(e)
		}	
		finally{
			if(stream){
				stream.close()
			}
		}
			
	}
	
	
	async stat(callback){
		try{
			var info= await this._stat()
			callback(null, info)
		}catch(e){
			callback(e)
		}
	}
	
	async _stat(){
		
		if(this.$stat){
			return this.$stat
		}
		var d= Date.now()
		await this.virtualRead(undefined, 0, 1, 0)
		var stat= {
	 		"dev":43,
	 		"mode":438,
	 		"nlink":1,
	 		"uid":1,
	 		"gid":1,
	 		"rdev":0,
	 		"blksize":5120,
	 		"ino":2266601,
	 		"size":this.len,
	 		"blocks":5,
	 		"atimeMs":d,
	 		"mtimeMs":d,
	 		"ctimeMs":d,
	 		"birthtimeMs":d,
	 		"atime": new Date(d),
	 		"mtime": new Date(d),
	 		"ctime": new Date(d),
	 		"birthtime": new Date(d),
	 		"isdirectory":false,
	 		"isfile":true
		}
		return this.$stat=stat
		
		
	}
	
	
	
	async virtualRead(buffer, offset, length, position, callback){
		
		this.openOptions=this.openOptions||{}
		
		var req= new core.VW.Http.Request(this.file)
		req.method= this.openOptions.method||"GET"
		var response, buffers=[], task , len, self= this, checked, buf, r
		len= this.len
		task= new core.VW.Task()
		
		
		try{
			
			
			if(len!==undefined &&!len)
				throw new core.System.Exception("Invalid URI File")
		
		
		
			
			if(this.openOptions.contentType)
				req.contentType= this.openOptions.contentType
			if(this.openOptions.userAgent)
				req.userAgent= this.openOptions.userAgent
			
			if(this.openOptions.headers){
				for(var id in this.openOptions.headers){
					req.headers[id]= this.openOptions.headers[id]
				}
			}
			req.headers["connection"]='keep-alive'
			req.analizeResponse= false
			req.headers["range"]= "bytes=" + position + "-" 
			if(length!=undefined)
				req.headers["range"]+= (position+length-1)
				
				
			
			req.beginGetResponse()
			if(this.getStream)
				return req
			
			req.innerRequest.on("response",function(r){
				response= r
			})
			
			
			req.innerRequest.on("end",function(){
				task.finish()
			})
			req.innerRequest.on("abort",function(){
				vw.info("abortd")
				task.finish()
			})
			
			req.innerRequest.on("data",function(buf){
				if(len===undefined && !checked){
					len=response.headers["content-length"]
					if(len!==undefined){
						len= parseInt(len|| 0)
						self.len= len
					}
				}
				
				
				if(!checked){
					
					if(response.statusCode!= 206){
						
						// check length
						if(response.statusCode!=200){
							task.exception='Invalid status response'
							req.innerRequest.abort()
							return 
						}
						if(len!= length){
							if(length!==undefined && position!=0){
								task.exception='Invalid status response'
								req.innerRequest.abort()
								return 
							}
						}
						
					}
					checked= true 	
				}
				
				buffers.push(buf)
			})
			
			
			await task
			if(buffer== undefined || length===undefined){
				r= Buffer.concat(buffers)
			}
			else{
				buf= Buffer.concat(buffers)
				r= buf.copy(buffer, offset, position, position+length)
			}
			
			
			if(typeof callback=="function")
				callback(null, r)
			else 
				return r
			
		}
		catch(e){
			
			if(typeof callback=="function")
				return callback(e)
			throw e
		}
		finally{
			if(req.innerRequest &&req.innerRequest.callback)
				delete req.innerRequest.callback 
		}
	}
	

	
}
export default HttpVirtualFile