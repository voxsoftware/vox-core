var StringBuilder;

var cantPositions=102400*4;
var maxmemory= 1024*1024*1000; // 1GB
//var _memory= new ArrayBuffer(maxmemory);
var _positions= new ArrayBuffer(maxmemory);
var lcount=0;



var StringBuilder= module.exports= function(){
	this.$offset=lcount*cantPositions;
	this.$positions= new Uint32Array(2);//;_positions,this.$offset, cantPositions);
	this.$memory= new Uint8Array(_memory);
	this.$index=lcount;
	lcount++;
	this.$positions[0]=lcount;
}



StringBuilder.prototype.append=function(){

}
