var iModule= core.VW.Module
var importModule= new iModule(__dirname)
importModule.loadConfigFile("core-modules.json")
importModule.import()

// Registrar la extensión .es6
core.VW.Ecma2015.Register.register()
