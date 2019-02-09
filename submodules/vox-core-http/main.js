var iModule= core.VW.Module
var importModule= new iModule(__dirname)
importModule.loadConfigFile("core-modules.json")
importModule.import()
