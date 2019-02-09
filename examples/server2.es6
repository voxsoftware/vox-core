
init()
var Id=0
function init(){
	let scontinue,init, initServer;
	init= async function(){

		var server= new core.VW.E6Html.Http.Server()
		var viewManager = server.viewManager("J:\\views\\")
		server.timeout=460000
		server.port= 8000
		server.path= "J:\\" //Proyectos\\voxcss\\dist\\"
		initServer(server, viewManager);
		await server.listen()
		vw.log("Servicio disponible: ", server.port)
		while(true){
			var reqArgs= await server.acceptAsync()
			scontinue(reqArgs);
		}

	}

	initServer= function(server, viewManager){
		var router=server.router;
		router.all("/movie", async function(args){


			var req= new core.VW.Http.Request("https://doc-0c-70-docs.googleusercontent.com/docs/securesc/ha0ro937gcuc7l7deffksulhg5h7mbp1/ipg66qst78n605d1csgavtemr1gq6otm/1501387200000/03632907060590629212/*/0B5oxx1Cdr2ZBTnh1dmJtaW1ZVms?e=download")

			req.analizeResponse= false

			for(var id in args.request.headers){
				if(id!="host")
					req.headers[id]= args.request.headers[id]
			}


			args.response.setHeader("content-type", "video/matroska")
			req.beginGetResponse()
			req.innerRequest.pipe(args.response)


		})
		router.all("/james", function(/*RequestArgs*/ args){
			viewManager.render("james",args);
		});
	}

	scontinue= async function(req){

		// Mostrar en consola las solicitudes
		var time= new Date()
		var id= ++Id
		vw.warning(req.request.method, req.request.url, " Request: ", (id))
		try{
			await req.catch(req.continue)
			vw.log("Request: ", id, " ", new Date()-time , "ms")
		}
		catch(e){
			try{
				req.response.statusCode=500
				try{req.response.write(JSON.stringify({error:e.stack},4,'\t'));}catch(ex){}
				req.response.end()
			}
			catch(ex){}

			vw.warning("Error en request ", id, " Tiempo transcurrido: ", new Date()-time,"ms")
			vw.error(e);
		}
	}
	init();
}
