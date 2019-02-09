var iModule= core.VW.Module
var importModule= new iModule(__dirname)
importModule.loadConfigFile("core-modules.json")
importModule.import()

// Registrar la extensión .es6
core.VW.E6Html.Register.register()
