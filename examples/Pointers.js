
var l=function(){

}
var mscorlib=core
var System=mscorlib.System;
VWPointer=System.VWPointer;
var buf= new Buffer("a123dfks");
var date=System.DateTime.now;
var pointer= VWPointer.fromBytes(buf,"short");
for(var i=0;i<10000000;i++){
    var j= pointer.get(3);
}


vw.log(System.DateTime.now.subtract(date));
setInterval(function(){

},10000)
