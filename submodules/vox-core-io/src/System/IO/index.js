var IO= module.exports;
IO.__defineGetter__('Stream',function(){
	if(!IO._stream){
		IO._stream=require("./Stream");
	}
	return IO._stream;
});


IO.__defineGetter__('SeekOrigin',function(){
	if(!IO._seekorigin){
		IO._seekorigin=require("./SeekOrigin");
	}
	return IO._seekorigin;
});

IO.__defineGetter__('FileStream',function(){
	if(!IO._filestrea){
		IO._filestrea=require("./FileStream");
	}
	return IO._filestrea;
});


IO.__defineGetter__('FileMode',function(){
	if(!IO._filemode){
		IO._filemode=require("./FileMode");
	}
	return IO._filemode;
});


IO.__defineGetter__('FileAccess',function(){
	if(!IO._fileaccess){
		IO._fileaccess=require("./FileAccess");
	}
	return IO._fileaccess;
});

IO.__defineGetter__('BinaryReader',function(){
	if(!IO._binaryreader){
		IO._binaryreader=require("./BinaryReader");
	}
	return IO._binaryreader;
});

IO.__defineGetter__('BinaryWriter',function(){
	if(!IO._binarywriter){
		IO._binarywriter=require("./BinaryWriter");
	}
	return IO._binarywriter;
});
