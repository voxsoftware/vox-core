
var IEnum_=module.exports;
IEnum_.create= function(name, values, multiple){


	var createEnums={};
	var IEnum= function(num){
		this.num=num;
	}

	IEnum.prototype._str=function(fullMode){
		var val='';
		


		for(var id in values){
			var value=values[id];
			var v=false


			if(value==0 ){
				v= this.num==0;
			}
			else if(value==this.num){
				val=(fullMode? name+".":"" )+ id;
				break;
			}
			else if(multiple===undefined || multiple){
				v=(this.num & value) == value;
			}

			if(v){
				val+= (val?", ":"")+ ((fullMode? name+".":"") + id);
			}
		}
		return val;
	}
	IEnum.prototype.inspect=IEnum.prototype.toString=function(){
		return this._str();
	}
	IEnum.prototype.toFullString=function(){
		return this._str(true);
	}

	IEnum.prototype.toJSON=IEnum.prototype.valueOf= function(){
		return this.num;
	}


	IEnum.create= function(id, num){
		if(createEnums[num])
			return createEnums[num]

		values[id+"-" + num.toString()]= num
		return createEnums[num]= IEnum[id]= new IEnum(num);

	}
	IEnum.parse= function(num){
		if(createEnums[num]){
			return createEnums[num];
		}
		if(IEnum[num]){
			return IEnum[num];
		}
		if(num instanceof IEnum){
			num=num.num;
		}
		else{
			num=Number(num);
		}
		if(!isNaN(num)){
			return null
		}
		return createEnums[num]= new IEnum(num);
	}

	for(var id in values){
		var value=values[id];
		createEnums[value]= IEnum[id]= new IEnum(value);
	}


	//IEnum.prototype = Object.create(Number.prototype);
	IEnum.prototype.__proto__=Number.prototype;
	IEnum.prototype.constructor=IEnum;
	IEnum.prototype.name=name;
	IEnum.enums= createEnums
	return IEnum;
}
