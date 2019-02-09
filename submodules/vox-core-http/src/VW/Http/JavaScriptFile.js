

var JavaScriptFile= module.exports= function(file){
	this.$file= file;
}


JavaScriptFile.prototype= Object.create(core.VW.Http.ServerScriptFile.prototype);
JavaScriptFile.prototype.constructor= JavaScriptFile;


JavaScriptFile.prototype.compile= function(){

}