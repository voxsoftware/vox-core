

/*
var FileAccess=module.exports;
FileAccess.read= 1;
FileAccess.readWrite= 3;
FileAccess.write=2;

*/

var System= core.System;
var FileAccess= module.exports= System.IEnum.create("System.IO.FileAccess",{
	"Read":1,
	"Write":2,
	"ReadWrite":3
});

// INCLUIDO POR COMPATIBILIDAD
FileAccess.read= FileAccess.Read;
FileAccess.write= FileAccess.Write;
FileAccess.readWrite= FileAccess.ReadWrite;
