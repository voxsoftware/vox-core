


var IPC=core.VW.IPC.Comunication;

if(IPC.isMaster){
	var ipc= new IPC(); 
	ipc.createChildProcess();


	var task= ipc.writeAsync("Desde proceso master");
	var c1,c2,y=0;
	c1= function(){		
		task= ipc.readAsync(task);
		task.oncomplete= c2;
	}
	c2= function(){

		if(y==1000){
			y=0;
		}
		vw.info((new Date()-task.date), task.result);
		ipc.writeAsync("Desde proceso master 2",task);
		task.oncomplete= c1;
		task.date= new Date();
		y++;
	}
	task.alwaysonerror= function(){
		vw.error(task.exception);
	}
	task.oncomplete=c1;


	setInterval(function(){
		var i=0;
		while(i<1000){
			core.VW.Console.write(i," ");
			i++;
		}
	},4000);
	
}

else{

	var ipc= new IPC(); 
	ipc.init();
	var task= ipc.readAsync();
	var c1,c2;
	c1= function(){
		ipc.writeAsync("Se preguntó: "+ task.result, task);
		task.oncomplete= c2;
	}
	c2= function(){
		ipc.readAsync(task);
		task.oncomplete=c1;
	}	
	task.alwaysonerror= function(){
		vw.error(task.exception);
	}
	task.oncomplete=c1;

}