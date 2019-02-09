

var cluster= require("cluster");
if(cluster.isMaster){

	var work= cluster.fork();
	work.send({IPC:true, data:"Desde proceso master"});
	var date=new Date();
	work.on("message", function(ev){
		vw.log(new Date()-date,ev);
		work.send({IPC: true, data:"Desde proceso master2"});
		date=new Date();
	})

	setInterval(function(){
		var i=0;
		while(i<1000){
			core.VW.Console.write(i," ");
			i++;
		}
	},4000);
}
else{	
	process.on("message",function(ev){
		process.send({IPC:true, data: "Se preguntó: " + ev.data});	
	});
}