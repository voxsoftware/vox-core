/*global core*/


var Path= require("path")
var Os= require("os")
var fs= require("fs")
var Zlib= require("zlib")
var FsSystem


/** DEFAULT STAT TEMPLATE 
 * 
 * {
 *		"dev":43,
 *		"mode":33204,
 *		"nlink":1,
 *		"uid":1001,
 *		"gid":1002,
 *		"rdev":0,
 *		"blksize":5120,
 *		"ino":2266601,
 *		"size":4736,
 *		"blocks":5,
 *		"atimeMs":1528669993000,
 *		"mtimeMs":1519866840000,
 *		"ctimeMs":1528669993286.6135,
 *		"birthtimeMs":1528669993286.6135,
 *		"atime":"2018-06-10T22:33:13.000Z",
 *		"mtime":"2018-03-01T01:14:00.000Z",
 *		"ctime":"2018-06-10T22:33:13.287Z",
 *		"birthtime":"2018-06-10T22:33:13.287Z",
 *		"isdirectory":false,
 *		"isfile":true
 * }
 * 
 * */


class VirtualFile{

	constructor(fileObject, parent, file, stream){
		this.fileObject=fileObject
		this.parent= parent
		this.file=file
		this.stream=stream
	}

	readAll(){
		var off= this.fileObject.offset
		this.stream.position= off
		var buf= Buffer.allocUnsafe(this.fileObject.length)
		this.stream.read(buf,0, buf.length)
		return Zlib.gunzipSync(buf)
	}

	get virtualPath(){
		return this._rpath
	}

	static transformStat(stat){
		
		if(typeof stat.isDirectory!=="function"){
			stat.isDirectory= function(){
				return this.isdirectory
			}
		}
		if(typeof stat.isFile!=="function"){
			stat.isFile= function(){
				return this.isfile
			}
		}
		
		if(!(stat.mtime instanceof Date)){
			stat.mtime=new Date(stat.mtime)
			
			stat.atime=new Date(stat.atime)
			stat.ctime=new Date(stat.ctime)
		}
		return stat
	}
	
	lstat(self, callback){
		callback(null, VirtualFile.transformStat(this.fileObject.stat))
	}
	
	lstatSync(){
		return VirtualFile.transformStat(this.fileObject.stat)
	}
	
	stat(self, callback){
		callback(null, VirtualFile.transformStat(this.fileObject.stat))
	}
	
	exists(callback){
		callback(true)	
	}
	
	existsSync(){
		return true
	}
	
	statSync(){
		return VirtualFile.transformStat(this.fileObject.stat)
	}

	fstat(self, callback){
		callback(null, VirtualFile.transformStat(this.fileObject.stat))
	}
	
	fstatSync(){
		return VirtualFile.transformStat(this.fileObject.stat)
	}


	open(self, options, callback){
		
		var num=this.virtualOpen()
		this.openOptions= options
		return callback(null, num)
		
	}
	
	
	openSync(self, options, callback){
		
		var num=this.virtualOpen()
		this.openOptions= options
		return num
		
	}
	
	
	close(self, callback){
		
		var num=this.virtualClose()
		delete this.openOptions
		return callback(null, num)
		
	}
	
	
	closeSync(self, callback){
		
		var num=this.virtualClose()
		delete this.openOptions
		return num
		
	}
	
	

	virtualOpen(){
		if(this.num==undefined){
			this.num= VirtualFile.num= VirtualFile.num===undefined?-1: VirtualFile.num-1
			VirtualFile.fsystem.handles[this.num]= this
		}
		return this.num
	}

	virtualClose(){
		delete this.cachedData
		VirtualFile.fsystem.handles[this.num]=null
		this.num=undefined
	}

	
	read(){
		return this.virtualRead.apply(this, Array.prototype.slice.call(arguments,1))
	}
	
	
	readSync(){
		return this.virtualRead.apply(this, Array.prototype.slice.call(arguments,1))
	}
	
	
	write(){
		throw new core.System.NotImplementedException()
	}
	
	
	writeSync(){
		throw new core.System.NotImplementedException()
	}

	
	readdir(){
		
		if(!this.fileObject.stat.isdirectory){
			var e=new core.System.Exception("Invalid operation. Not a directory")
			e.code='ENOENT'
			throw e
		}
		
		throw new core.System.NotImplementedException()
		
	}
	
	
	readdirSync(){
		
		if(!this.fileObject.stat.isdirectory){
			var e=new core.System.Exception("Invalid operation. Not a directory")
			e.code='ENOENT'
			throw e
		}
		
		throw new core.System.NotImplementedException()
		
	}
	
	readFileSync(self, encoding){
		return this.readFile(self, encoding)
	}
	
	readFile(self, encoding, callback){
		var options= {}
		if(typeof encoding=="object"){
			options= encoding || {}
			encoding= options.encoding
		}
		
		try{
			self=this
			this.openOptions= options
			var r= this.virtualRead(undefined, 0, this.fileObject.stat.size, 0)
			if(encoding){
				r= r.toString(encoding)
				delete self.openOptions
				return callback? callback(null, r): r
			}
		}catch(er){
			delete self.openOptions
			if(callback)
				return callback(er)
			
			throw er
		}
	}
	

	virtualRead(buffer, offset, length, position, callback){
		position=position||0
		if(this.fileObject.stat.size<length || this.fileObject.stat.size < position + length )
			throw new core.System.Exception("Invalid length")

		if(!this.cachedData){
			this.cachedData= this.readAll()
		}
	
		var r
		if(buffer===undefined)
			r=this.cachedData.slice(position,position+length)
		else 
			r= this.cachedData.copy(buffer, offset, position, position+length)
			
			
		if(typeof callback=="function"){
			callback(null, r)
			return 
		}
		return r
	}
	
	
	
	static getProtocol(file){
		if(VirtualFile.protocols){
			for(var id in VirtualFile.protocols){
				if(file.length> id.length && file.substring(0,id.length)== id){
					return VirtualFile.protocols[id]	
				}
			}
		}
	}
	
	
	static getFileFromProtocol(file,options){
		var proc= VirtualFile.getProtocol(file)
		if(proc){
			return proc.get(file,options)
		}
	}

	static addProtocol(id, protocol){
		VirtualFile.protocols=VirtualFile.protocols||{}
		VirtualFile.protocols[id]=protocol
	}
	
	static removeProtocol(id){
		delete VirtualFile.protocols[id]
	}
	
	

	static register(virtualFile){
		var absoluto= Path.isAbsolute(virtualFile.parent)
		var path, base,f
		base=Os.platform()=="win32"? "C:\\HDD$vox-core\\node_modules": "/HDD$vox-core/node_modules"
		f= Path.normalize(virtualFile.fileObject.file)
		if(absoluto)
			path= Path.join(virtualFile.parent, f)
		else
			path= Path.join(base, virtualFile.parent, f)
		VirtualFile.fsystem.files.push(path)
		VirtualFile.fsystem.filesByPath[path]= virtualFile
		virtualFile._rpath= path

	}

}

VirtualFile.fsystem={}
VirtualFile.fsystem.files=[]
VirtualFile.fsystem.filesByPath={}
VirtualFile.fsystem.handles={}




// Modificar el funcionamiento del módulo fs
var Module = require('module').Module
var copias={
	_resolveFilename: Module._resolveFilename.bind(Module)
}


var bestFile= function(file1, file2, parent){
	
	if(!file2 || (parent && parent.filename.indexOf("HDD$vox-core")>=0  ))
		return file1
	
	
	var h1= file1.lastIndexOf("node_modules")
	var h2= file2.lastIndexOf("node_modules")
	var p1, p2
	if(h1>=0 && h2>=0){
		
		p1=file1.substring(h1).split("/")
		p2=file2.substring(h2).split("/")
		if(p2[1]==p1[1])
			return file2
		
	}
	return file1
	
}



Module._resolveFilename = function(request, parent, isMain) {
	var er, possibleFile

	try{

		var file= copias._resolveFilename(request,parent,isMain)

		possibleFile=file
		/*
		if(possibleFile.indexOf("node_modules" + Path.sep + request + Path.sep)>=0)
			return file
		*/
	}catch(e){
		er=e
	}

	var virtual,f, data,fi, doble, time=0, original=request,co

	while(time<3){
		time++
		request= original
		if(!Path.isAbsolute(request)){
			if(request.startsWith(".")){
				//vw.log("PARENT:",parent.filename)
				if(!parent || !parent.filename)
					request= Path.resolve(request)
				else
					request= Path.resolve(Path.dirname(parent.filename),request)


				time= 3
			}
			else{

				if(time==1){
					request= Path.join(Os.platform()=="win32"?"C:\\HDD$vox-core/node_modules":"/HDD$vox-core/node_modules", request)
					doble= true
				}
				else if(time==2){
					doble= false
					if(parent && parent.filename)
						request= Path.join(Path.dirname(parent.filename),"node_modules", original)
					else
						break
				}
				else if(time==3){
					break

					/*
					doble= false

					if(parent && parent.filename)
						request= Path.join(Path.dirname(parent.filename), original)
					else
						break
					*/
				}
			}
		}


		f=Path.normalize(request)

		virtual= VirtualFile.fsystem.files.indexOf(f)
		if(virtual<0){
			f= Path.normalize(Path.join(request,"package.json"))
			virtual= VirtualFile.fsystem.files.indexOf(f)
			if(virtual>=0){
				data= fs.readFileSync(f,'utf8')

				data=JSON.parse(data)
				virtual=-1
				if(data.main){
					f= Path.resolve(request, data.main)
					virtual= VirtualFile.fsystem.files.indexOf(f)
					co= f
					if(virtual<0){
						for(var id in require.extensions){
							f= co+id
							virtual= VirtualFile.fsystem.files.indexOf(f)
							if(virtual>=0)
								break
						}
					}

				}
			}
		}

		if(virtual<0){
			for(var id in require.extensions){
				f= request+id
				virtual= VirtualFile.fsystem.files.indexOf(f)
				if(virtual>=0)
					break
			}
		}

		if(virtual<0){
			for(var id in require.extensions){
				f= Path.normalize(Path.join(request,"index"+id))
				virtual= VirtualFile.fsystem.files.indexOf(f)
				if(virtual>=0)
					break
			}
		}

		if(virtual>=0){
			
			return bestFile(f, possibleFile, parent)
		}


	}

	if(possibleFile)
		return possibleFile
	throw er

}


export default VirtualFile
