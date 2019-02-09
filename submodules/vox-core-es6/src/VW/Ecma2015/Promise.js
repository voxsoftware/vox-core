if(typeof Promise=="function"){
	global.Promise=module.exports=Promise
}
else{
	global.Promise= module.exports= require("bluebird").Promise;
}
