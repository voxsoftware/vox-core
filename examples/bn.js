

var bn=require("../bn");
//require("../loader.js");
var long=require("../bn/long");

//core.System.Globalization2.CultureInfo.defaultThreadCurrentCulture= core.System.Globalization2.CultureInfo.getCultureInfo("ar")

core.System.Globalization.CultureInfo.ready(function(){
	var d= core.System.DateTime.now;
	vw.info(d.toString());
	vw.info(core.System.Globalization.CultureInfo.currentCulture.toString());

})

//var n1= new core.System.Int64("-899147483648").shiftRight(32)
var n1= new core.System.Int64(-10).toBuffer()
vw.log(n1);
return

var num= new core.System.Int64(15)
var f= core.System.Int64.maxValue;
var d= new Date();
for(var i=0;i<1000000;i++){
    f.div(num);
}
console.log(new Date()-d);



//var num= new core.System.Int64(15)
var f= new bn(f.toString())
var d= new Date();
for(var i=0;i<1000000;i++){
    f.div(num);
}
console.log(new Date()-d);

var num= long.fromNumber(15);
var f= long.fromString("9223372036854775807");
var d= new Date();
for(var i=0;i<1000000;i++){
    f.div(num);
}
console.log(new Date()-d);

f= 9223372036854775807;
var d= new Date();
for(var i=0;i<1000000;i++){
    var e=f / 15;
}
console.log(new Date()-d);