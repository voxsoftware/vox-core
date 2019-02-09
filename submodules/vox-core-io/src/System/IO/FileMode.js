


var System= core.System;
var FileMode= module.exports= System.IEnum.create("System.IO.FileMode",{
	"Append":6,
	"Create":2,
	"CreateNew":1,
	"Open": 3,
	"OpenOrCreate":4,
	"Truncate": 5
});

// INCLUIDO POR COMPATIBILIDAD
FileMode.append= FileMode.Append;
FileMode.create= FileMode.Create;
FileMode.createNew= FileMode.CreateNew;
FileMode.open= FileMode.Open;
FileMode.openOrCreate= FileMode.OpenOrCreate;
FileMode.truncate= FileMode.Truncate;
