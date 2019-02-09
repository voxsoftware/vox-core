
var time= function(){
	var promise= new Promise(function(resolve,reject){
		setTimeout(function(){
			resolve();
		},4000);
	});
	return promise;
}



var range= async function *range() {
  var val;
  yield (await time())+1;
  yield (await time())+2;
  var val=await(time());
  for(var i=0;i<val;i+=10){
  	yield i;
  }
}


var range2= async function(){
	try{
		var r= range()
		for(var id of r){
			"use async" // Esto lo implementa vw para permitir recorrer asynciterators
			vw.log(id);
		}
	}
	catch(e){
		vw.error(e.stack);
	}
}
range2()