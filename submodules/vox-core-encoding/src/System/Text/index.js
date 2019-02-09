var Text= module.exports;
Text.__defineGetter__('Encoding',function(){
	if(!Text._encoding){
		Text._encoding=require("./Encoding");
	}
	return Text._encoding;
});


Text.__defineGetter__('StringBuilder',function(){
	if(!Text._sbuilder){
		Text._sbuilder=require("./StringBuilder");
	}
	return Text._sbuilder;
});
