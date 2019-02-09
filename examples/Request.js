

require("../loader.js");

var request= new core.VW.Http.Request("http://voxpopuli.net");
request.timeout= 10000;
var task= request.getResponseAsync(request);
vw.info(task);

task.oncomplete=function(err, response){

	if(err){return vw.error(err)}
	vw.log(response.statusCode.toFullString());
	vw.info(task);
}

