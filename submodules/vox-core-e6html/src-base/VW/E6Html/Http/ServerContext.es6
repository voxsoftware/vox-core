
class ServerContext extends core.VW.E6Html.Context{
	constructor(server,req,res,next){
		super()
		this.out= this
		this.request= this.in= req
		this.response= res
		this.continue= next
		this.server=server
	}

	include(source, args){
		if(this.viewManager){
			return this.viewManager.include(source, this, {
				context:this,
				arguments:args||this.arguments
			});
		}

		return super.include(source, args)
	}

	writeHeaders(){
		var v= this.response.writeHead.apply(this.response,arguments)
		this.$writedHeaders=true
		return v
	}

	write(obj){
		obj= this.transform(obj)
		if(!this.$writedHeaders){
			try{
				this.writeHeaders(200, {
					"Content-type": "text/html;Charset=utf8",
				})	
			}
			catch(e){}
		}
		this.response.write(obj)
	}
}

export default ServerContext