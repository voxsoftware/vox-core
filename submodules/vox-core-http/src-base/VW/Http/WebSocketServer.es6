
var h= core.VW.Http
class WebSocketServer{
	
	
	constructor(server){
		if(!server instanceof h.Server)
			throw new core.System.ArgumentException("El argumento server debe ser del tipo VW.Http.Server")

		this.server= server
		this.$funcs= []
		this.$tasks=[]
		this.$reqs=[]
	}



	use(func){
		this.$funcs.push(func)
	}


	acceptAsync(){
		var task=core.VW.Task.get()
		this.$tasks.push(task)
		return task
	}



	prepare(){
		if(this.$prepared)
			return

		var self= this
		this.server.$server.on("upgrade", function(req, socket, head){
			var i=-1, task
			var args, next= function(){
				i++
				var func= self.$funcs[i], result
				if(func){
					try{
						result=func(args)
						if(typeof result["catch"] === "function"){
							result["catch"](function(err){
								socket.emit("error", e)
							})
						}

					}
					catch(e){
						socket.emit("error", e)
					}
				}
			}


			args= new h.RequestArgs.fromSocket(req, socket, head)
			self.$reqs.push(args)


			while(task= self.$tasks.shift()){
				task.result= self.$reqs.shift()
				task.finish()
			}

		})
		this.$prepared= true
			
	}

	stop(){
		this.server.stop()
	}



	listen(){
		if(!this.server.$prepared)
			throw new core.System.Exception("Debe primero iniciar el Servidor HTTP")

		this.prepare()
	}

}

export default WebSocketServer