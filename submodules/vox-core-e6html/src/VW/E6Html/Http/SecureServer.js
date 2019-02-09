
var parent= core.VW.Http.SecureServer;
var Server= module.exports= function(){
	parent.apply(this,arguments);
}
Server.prototype= Object.create(parent.prototype);
Server.prototype.constructor= Server;
require("_createServer")(Server)