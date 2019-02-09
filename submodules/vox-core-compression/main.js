var iModule= core.VW.Module
var importModule= new iModule(__dirname)
importModule.loadConfigFile("core-modules.json")
importModule.import()

if(typeof Promise !== "function")
	global.Promise= core.VW.Ecma2015.Promise