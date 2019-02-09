

var SHM;
var IPC= core.VW.IPC.Comunication;
var ipc= new IPC();
if(IPC.isMaster){
	ipc.createChildProcess();
	SHM= new core.VW.IPC.ShareMethods(ipc);
	SHM.addMethod(function(){
		return process.pid;
	}, "pid");

}
else{

	try{
		ipc.init();
		SHM= new core.VW.IPC.ShareMethods(ipc);
		var i=0;
		var send= function(){
			if(i>20){
				return;
			}
			i++;
			var d=new Date();
			SHM.callAsync("pid").oncomplete= (function(err,id){
				if(err){return vw.error(err);}
				vw.log("Time (milliseconds): ", new Date()-d, " PID Master: ", id);
				send();
			});
		}
		send();
	}
	catch(e){
		console.log("Error en proceso hijo: ", e.stack||e.toString());
	}
}	


