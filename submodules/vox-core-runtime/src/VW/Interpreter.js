


var vm;
global.$$req$$=require;





var Interactive= module.exports= function(){

	var leval= function(str){
		if(!vm){
			vm= require("vm")
		}


		var script= new vm.Script(str, {filename:"Interactive"});
		result= script.runInThisContext(require);
		return result;
	}
	leval("var require=global.$$req$$;");
	global.$$req$$=undefined;
	this.leval= leval;
};


Interactive.prototype.start= function(){	
	core.VW.Console.setColorInfo().write(">>> ").usePromptReadLine(">>> ").resetColors();
	var linterrupt=false;
	var leval= this.leval;
	var task=Interactive.task= new core.VW.Task(); ///core.VW.Console.readLineAsync(Interactive.task);
	var g;
	var complete= function(){

		
		
		if(task.exception instanceof core.VW.KeyboardInterruptException){


			if(linterrupt){
				process.exit(0);
				return; 
			
			}
			else{
				core.VW.Console.foregroundColor= core.System.ConsoleColor.Gray;
				core.VW.Console.coloredWriteLine("Presione nuevamente CTRL+C para cerrar");
				core.VW.Console.setColorInfo().write(">>> ").resetColors();
			}
			linterrupt= true;
			g();
			return;
		}

		linterrupt= false;

		var line= task.result;
		
		if(line){
			try{
				var result= leval(line);
				if(result===undefined || result===null){
					core.VW.Console.foregroundColor= core.System.ConsoleColor.Gray;
					core.VW.Console.coloredWriteLine(result===null?"null":"undefined");
				}
				else{
					core.VW.Console.coloredWriteLine(result);
				}
				core.VW.Console.resetColors();
			}
			catch(e){
				
				vw.error(e.stack);
			}

			//core.VW.Console.writeLine();
			core.VW.Console.setColorInfo().write(">>> ").resetColors();
			
		}
		g();

	}


	var g=function(){
		setImmediate(function(){
			task.reset()
			task.oncomplete= complete;
			core.VW.Console.readLineAsync(task);
		});
	}
	task.oncomplete= complete;
	core.VW.Console.readLineAsync(task);



	
	
}
