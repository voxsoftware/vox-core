
import {ServerResponse as SR0} from 'http'
var SR= {
	writeHead: SR0.prototype.writeHead,
	write: SR0.prototype.write,
	"setHeader": SR0.prototype.setHeader
}
class ServerResponseExtender{


	setHeader(){
		var e={
			arguments:arguments
		}
		this.emit("setheader", e)

		if(!e.arguments[0])
			return

		return SR.setHeader.apply(this,e.arguments)
	}


	setCookie(cookie){

		if(!(cookie instanceof core.VW.Http.ServerCookie)){
			throw new core.System.Exception("Debe ser un objeto VW.Http.ServerCookie")
		}

		this._cookie= cookie
		var json= cookie.toJSON()
		for(var id in json){
			this.setHeader("set-cookie", cookie.toStr(id))
		}

	}



	writeHead(){
		var v= SR.writeHead.apply(this,arguments)
		this.emit("headerssent")
		return v
	}

	getHeaders(){
		return this._headers
	}

	write(data){

		var v= SR.write.apply(this, arguments)
		if(this.emitWrite && data && data.length>0){
			if(!Buffer.isBuffer(data))
				data= new Buffer(data)
			this.emit("data", data)
		}

		if(this.headersSent)
			this.emit("headerssent")

		return v
	}
}



SR0.prototype.write= ServerResponseExtender.prototype.write
SR0.prototype.writeHead= ServerResponseExtender.prototype.writeHead
if(!SR0.prototype.getHeaders)
	SR0.prototype.getHeaders= ServerResponseExtender.prototype.getHeaders
SR0.prototype.setHeader= ServerResponseExtender.prototype.setHeader
SR0.prototype.setCookie= ServerResponseExtender.prototype.setCookie
SR0.prototype.__defineSetter__("cookie", ServerResponseExtender.prototype.setCookie)
export default ServerResponseExtender
