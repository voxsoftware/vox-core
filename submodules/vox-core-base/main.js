global.core= module.exports
var iModule= require("./src/VW/Module.js")
var importModule= new iModule(__dirname)
importModule.loadConfigFile("core-modules.json")
importModule.import()
core.System.String // Cargar nuevas funciones String ...
core.safeJSON= function(){}
core.safeJSON.stringify= require("./safe-json")
require("./src/VW/_vw.js")
core.internalError= require("./src/System/internal_error.js")