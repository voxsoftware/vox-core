
var H= core.VW.Http
class SecureServer extends H.Server{
	
	constructor(options){
		this.$secure= true
		this.$options= options
		super()
	}



}

export default SecureServer