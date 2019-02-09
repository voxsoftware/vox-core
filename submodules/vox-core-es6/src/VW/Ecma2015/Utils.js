var Utils= module.exports=function(){
}

/*
Utils.require= function(modulename,require){
	var m= require(modulename);
	if(m.default===undefined){
		m.default=m;
	}
	return m;
}
*/

Utils.module= function(m){
	if(m['default']===undefined){
		m['default']=m;
	}
	return m;
}


Utils.extend= function(oexport, value){
	for(var id in value){
		oexport[id]= value[id];
	}
}
