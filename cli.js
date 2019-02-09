
require("./main.js");
var Path= require('path')
var fs= require("fs")
var Command= new core.VW.CommandLine.Parser();
var arg= process.argv[2];
var requirefile= false;
if(arg){
	if(arg[0]!='-'){
		requirefile=true;
	}
}


if(!arg){
	//return;
}

var FIND= function(file){
	file= Path.resolve('', file)
	return file
}

//fs.writeFileSync(process.env.TMP+"/com.p", JSON.stringify(process.argv))
Command.throwOnError= false;

if(requirefile){
	Command.parse(undefined,false);
	var file=Command.getFirstValue();
	

	if(file){

		//require(file);
		// FIND module
		require(FIND(file))
	}
	else{
		//require("fs").writeFileSync("j:\\kl.json", JSON.stringify(process.argv,4,'\t'))
		requirefile=false;
	}

}


if(!requirefile){

	Command.addParameter("install");
	Command.addParameter("g");
	Command.addParameter("test");
	Command.addParameter("list-apps");
	Command.addParameter("version");
	Command.addParameter("help");
	Command.addParameter("vcf");
	Command.addParameter("self-register");
	Command.addParameter("interactive");
	Command.addParameter("silent");
	Command.addParameter("transpile");
	Command.addParameter("in",true,"");
	Command.addParameter("out",true,"");
	Command.addParameter("decompress",true,false);
	Command.parse(undefined,false);
	var commands= require("./commands.js");
	requirefile= !commands(Command);
	if(require('os').platform()!="win32")
		core.VW.Console.writeLine()
}
