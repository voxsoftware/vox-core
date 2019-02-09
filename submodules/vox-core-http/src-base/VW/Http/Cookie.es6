var request= core.VW.Http.LowLevelRequest
class Cookie{
	
	constructor(){
		this.$jar= request.jar()
		this.$cookies=[]
	}

	add(key, value){
		this.$cookies.push(request.cookie(`${key}=${value}`))
	}

	getJar(url){
		var c
		while(c=this.$cookies.shift()){
			this.$jar.setCookie(c, url)
		}
		return this.$jar
	}


}
export default Cookie