

//require("../loader.js");

vw.log(process.argv);


core.System.Console.write("James ");
core.System.Console.write("el mejor");
core.System.Console.writeLine();
core.System.Console.foregroundColor= core.System.ConsoleColor.Magenta;
core.System.Console.write("Soy magenta! ");
core.System.Console.foregroundColor= core.System.ConsoleColor.Blue;
core.System.Console.write("Soy azul! ");
core.System.Console.foregroundColor= core.System.ConsoleColor.Yellow;
core.System.Console.write("Soy amarillo!");


core.System.Console.resetColors();
core.System.Console.writeLine();
core.System.Console.writeLine("Nuevamente colores por defecto");


// INCLUIDO POR COMPATIBILIDAD
core.System.Console.writeLine();
core.System.Console.writeLine();
core.System.Console.writeLine("Compatibilidad con vw 1");
vw.info("Arg0", "Arg1");
vw.log("Arg0", "Arg1");
vw.warning("Arg0", "Arg1");
vw.error("Arg0", "Arg1");