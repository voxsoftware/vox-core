var fs= require("fs");
var Path= require("path");
var E6HtmlFolder= module.exports=function(folder){
	this.$folder= folder;
}
E6HtmlFolder.extensions=[".es6.html",".es6-html"];


E6HtmlFolder.prototype.getFileName= function(file){
	var folder= this.$folder;
	var file2 = Path.join(folder, file);
	var exists;
	
	if(this.fileResolve){
		file2= this.fileResolve(folder, file)
	}
	
	
	if(!fs.existsSync(file2)){
		for(var i=0;i<E6HtmlFolder.extensions.length;i++){
			var ext= E6HtmlFolder.extensions[i];
			file2 = Path.join(folder, file+ext);
			
			if(fs.existsSync(file2)){
				exists=true;
				break;
			}
		}
	}
	
	
	if(!exists && !fs.existsSync(file2)){
		throw new core.System.IO.FileNotFoundException(file);
	}
	return file2;
}
E6HtmlFolder.prototype.get= function(/*string*/file){
	file= this.getFileName(file);
	return core.VW.E6Html.E6Html.get(file);
}



E6HtmlFolder.prototype.invoke= function(file, context, args){
	var context= context || core.VW.E6Html.E6Html.createConsoleContext();
	context.arguments=args;
	context.e6htmlFolder= this;
	return this.get(file).invoke(context);
}