var ArrayIterator= module.exports=function(value){
	this.array=value;
	this.index=-1;
	this.done=false;
	this.value=undefined;
}


ArrayIterator.prototype.next= function(){

	if((this.array.length-1) <= this.index){
		this.done= true;
		return this;
	}

	
	this.index++;
	this.value= this.array[this.index];
	return this;
}