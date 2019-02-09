


require("./main.js");
core.VW._cluster=true;
var Command= new core.VW.CommandLine.Parser();
var file=Command.parse(undefined,false).getFirstValue();
require(file);