var mscorlib=core
var System=mscorlib.System;

vw.log(System.TimeSpan.maxValue);
vw.log(System.TimeSpan.maxValue.totalDays);
vw.log(System.TimeSpan.maxValue.days);
vw.log(System.TimeSpan.maxValue.hours);
vw.log(System.TimeSpan.maxValue.totalHours);
vw.log(System.TimeSpan.maxValue.milliseconds);
vw.log(System.TimeSpan.maxValue.totalMilliseconds);
vw.log(System.TimeSpan.maxValue.minutes);
vw.log(System.TimeSpan.maxValue.totalMinutes);
vw.log(System.TimeSpan.maxValue.seconds);
vw.log(System.TimeSpan.maxValue.totalSeconds);
vw.log(System.TimeSpan.maxValue.toString());

var d=System.DateTime.now;
var ar=[];
for(var i=0;i<1000000;i++){
    ar.push(i);
}
vw.log(System.DateTime.now.subtract(d).toString("dd\\.hh\\:mm\\:ss\\.fff"));
vw.log(System.TimeSpan.maxValue.toString("dd\\.hh\\:mm\\:ss\\.ffffff"));
