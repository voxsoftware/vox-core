
var task= new core.VW.Task();
task.then(function(){
	console.log('james')
}).catch(function(er){
	console.error(er)
})
task.finish();
return;


var task= new core.VW.Ecma2015.Promise(function(resolve){
	resolve()
});
task.then(function(){
	console.log('james')
}).catch(function(er){
	console.error(er)
})