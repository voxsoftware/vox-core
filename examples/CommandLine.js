
//require("../loader.js");
var Command= new core.VW.CommandLine.Parser();
var options=Command.addParameter("install").addParameter("g").addParameter("save", true, "OllDays").parse().getAsOptionsObject();
vw.info(options);