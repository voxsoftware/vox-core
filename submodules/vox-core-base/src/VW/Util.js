

var Util= module.exports=function(){

}

Util.createProperties= function(arg){
	if(arguments.length==1){
		for(var id in arg){
			var pre= id.substring(0,4);
			if(pre=="get_"){
				arg.__defineGetter__(id.substring(4), arg[id]);
			}
			else if(pre=="set_"){
				arg.__defineSetter__(id.substring(4), arg[id]);	
			}
		}
		return;
	}
	for(var i=0;i<arguments.length;i++){
		Util.createProperties(arguments[i]);
	}
}