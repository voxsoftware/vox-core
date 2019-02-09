

var chalk= require("chalk");
var os= require("os").platform();
var util= require("util");
var Console= module.exports= function(){
}


var Util= core.VW.Util;
var Console=module.exports= function(){
}



Console.get_backgroundColor = function(){
	return this.$colorb;
}


Console.set_backgroundColor = function(color){

	if(!(color instanceof core.System.ConsoleColor)){
		color= core.System.ConsoleColor.parse(color|0);
	}
	this.$colorb=color;
	this.chalk(1);
	return color;
}


Console.get_foregroundColor = function(){
	return this.$colorf;
}


Console.set_foregroundColor = function(color){

	if(!(color instanceof core.System.ConsoleColor)){
		color= core.System.ConsoleColor.parse(color|0);
	}
	this.$colorf=color;
	this.chalk();
	return color;
}


Console.chalk= function(type, reset,apply){





	var style= chalk.styles,item;


	var color= type==1?this.$colorb: this.$colorf;
	color=color|0;


	if(type==1){
		if(color==0){
			item= "bgBlack";
		}
		else if(color==1|| color==9){
			item= "bgBlue";
		}
		else if(color==2|| color==10){
			item= "bgGreen";
		}
		else if(color==3|| color==11){
			item= "bgCyan";
		}
		else if(color==4|| color==12){
			item= "bgRed";
		}
		else if(color==5|| color==13){
			item= "bgMagenta";
		}
		else if(color==6|| color==14){
			item= "bgYellow";
		}
		else if(color==7|| color==8){
			item= "bgGray";
		}
		else if(color==15){
			item= "bgWhite";
		}
	}
	else{
		if(color==0){
			item= "black";
		}
		else if(color==1|| color==9){
			item= "blue";
		}
		else if(color==2|| color==10){
			item= "green";
		}
		else if(color==3|| color==11){
			item= "cyan";
		}
		else if(color==4|| color==12){
			item= "red";
		}
		else if(color==5|| color==13){
			item= "magenta";
		}
		else if(color==6|| color==14){
			item= "yellow";
		}
		else if(color==7|| color==8){
			item= "gray";
		}
		else if(color==15){
			item= "white";
		}
	}


	if(item){
		if(type==1){
			this.$last2= item;
		}
		else{
			this.$last= item;
		}
		//process.stdout.write(style[item].open);
	}
}



Console.resetColors= function(){
	//this.chalk(undefined,true);
	this.$last=null;
	this.$last2=null;
	return this;
}


Console.write= function(/*object */arg){
	for(var i=0;i<arguments.length;i++){
		if(i>0){
			Console._write(" ");
		}
		Console._write(arguments[i]);
	}
	return Console;
}


Console.coloredWrite= function(/*object */arg){
	for(var i=0;i<arguments.length;i++){
		if(i>0){
			Console._write(" ");
		}
		Console._write(arguments[i], {colors:true});
	}
	return Console;
}
var regexp= /(\r\n|\r|\n)/g;
Console._write= function(/*object */arg,option){



	if(arg==undefined){
		return;
	}
	if(typeof arg != "string"){
		arg=util.inspect(arg,option);
	}


	arg= arg.replace(regexp,"\n");
	var i= arg.lastIndexOf("\n"),l;
	if(i>=0){
		if(arg[i+1]=="\n"){
			i++;
		}
		var prompt= arg.substring(i+1);
		if(this.$last){
			prompt=chalk[this.$last](prompt);
		}
		if(this.$last2){
			prompt=chalk[this.$last2](prompt);
		}
		Console.$lastprompt= prompt;
	}
	else{
		l=true;
	}


	if(this.$last){
		arg=chalk[this.$last](arg);
	}
	if(this.$last2){
		arg=chalk[this.$last2](arg);
	}
	if(l){
		Console.$lastprompt+=l;
	}
	process.stdout.write(arg);

}


Console.writeLine= function(){
	Console.write.apply(Console,arguments);
	Console.write("\n");
	return this;
}

Console.coloredWriteLine= function(){
	Console.coloredWrite.apply(Console,arguments);
	Console.write("\n");
	return this;
}


Console.setColorError= function(){
	this.foregroundColor= core.System.ConsoleColor.Red;
	return this;
}

Console.setColorInfo= function(){
	this.foregroundColor= core.System.ConsoleColor.Blue;
	return this;
}



Console.setColorLog= function(){
	this.foregroundColor= core.System.ConsoleColor.Green;
	return this;
}

Console.setColorWarning= function(){
	this.foregroundColor= core.System.ConsoleColor.Yellow;
	return this;
}


Console.readLineAsync= function(){

	var task= core.VW.Task.get(arguments);
	if(!Console.$stdin){
		Console._initStdIn();
	}

	Console.tasks.push(task);
	if(Console.buffer.length>0){
		setImmediate(Console.__read)
		return task
	}
	if(Console.useRl){
		Console.$rl.resume();
	}
	else{
		process.stdin.resume();
	}

	return task;
}



Console.usePromptReadLine= function(/*string */prompt){
	Console.$rl= require("readline")
	    .createInterface({
	      input: process.stdin,
	      output: process.stdout
	    })
	    .on("SIGINT", function () {
	      process.emit("SIGINT");
	    });

	Console.$rl.on("line", function(line){
		if(!Console.useRl){
			return;
		}
		return Console.onLine(line,true);
	});
	Console.useRl= true;
	var len= prompt.length;
	if(this.$last){
		prompt=chalk[this.$last](prompt);
	}
	if(this.$last2){
		prompt=chalk[this.$last2](prompt);
	}
	Console.$rl.setPrompt(prompt,len);
	return Console;
}


Console.__read= function(){
	for(var i=0;i<Math.min(Console.buffer.length, Console.tasks.length);i++){
		var task=Console.tasks.shift();
		task.result= Console.buffer.shift();
		task.finish();
	}
}

Console._initStdIn= function(){
	process.openStdin();
	Console.$stdin=process.stdin;
	Console.tasks= [];
	Console.buf='';
	Console.buffer=[];

	var j= function(e){
		Console.buffer.push(e);
		if(Console.useRl){
			Console.$rl.pause();
		}
		else{
			process.stdin.pause();
		}
		Console.__read()
	}



	process.on("SIGINT", function (ev) {
		//graceful shutdown
		var task=Console.tasks.shift();
		if(task){
			task.exception= new core.VW.KeyboardInterruptException("La ejecución del programa ha sido interrumpida");
			task.finish();
		}
		else{
			process.exit(1);
		}
	});



	var onLine;
	process.stdin.on("data", function(buf){
		if(Console.useRl){
			return;
		}
		return onLine(buf);
	});

	onLine= Console.onLine= function(buf,isLine){
		var e= buf.toString(),np;
		if(!isLine){
			e= e.replace(regexp,"\n");
			var i=e.indexOf("\n");
			if(i<0){
				Console.buf+= e;
				np=true;
			}
			else if(Console.buf.length>0){
				var l= e.substring(i);
				e= Console.buf+e.substring(0,i);
				Console.buf=l;
			}

			if(Console.buf.length>1000){
				Console.buf.substring(0,1);
			}
		}




		if(!np){

			e=e.split("\n")
			for(var i=0;i<e.length;i++){
				if(!e[i] && i==e.length-1)
					break

				j(e[i])
			}
		}
	};
}


Util.createProperties(Console,Console.prototype);
