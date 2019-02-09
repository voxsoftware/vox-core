



var server= new core.VW.Http.Server();
server.timeout=5000;
server.port= 900;
server.path= "L:\\";
var task=server.listen();
task.oncomplete=function(){
	vw.log("Servicio disponible: ", server.port);


	task= server.acceptAsync();
	var c= task.oncomplete=function(){

		task.result.beginCatch(function(){
			task.result.continue();
		});

		task=server.acceptAsync(task);
		task.oncomplete=c;

		var task2= task.result.endCatch();
		task2.oncomplete=function(){
			vw.info(task2.exception?task2.exception:"Finalizado");
			task2.data.response.end();
		}

	}


}

vw.info(task);