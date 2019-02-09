
var Decimal=module.exports=require("./internal-decimal");
var ierror= require("./internal_error");


Decimal.OverflowError= ierror("OverflowError");
Decimal.ZeroDivisionError= ierror("ZeroDivisionError");
Decimal.ArgumentError= ierror("ArgumentError");





Decimal.__defineGetter__('minusOne',function(){
	var e;
	if(!(e=Decimal._minusone)){
		e= Decimal._minusone=new Decimal("-1");
	}
	return e;
});

Decimal.__defineGetter__('one',function(){
	var e;
	if(!(e=Decimal._one)){
		e= Decimal._one=new Decimal("1");
	}
	return e;
});

Decimal.__defineGetter__('zero',function(){
	var e;
	if(!(e=Decimal._zero)){
		e= Decimal._zero=new Decimal("0");
	}
	return e;
});



Decimal.compare=function(/* Decimal */one, /*Decimal */two){
	if(!(one instanceof Decimal)){
		throw new Decimal.ArgumentError();
	}

	return one.compareTo(two);
}

Decimal.equals=function(/* Decimal */one,/* Decimal */two){
	if(!(one instanceof Decimal)){
		throw new Decimal.ArgumentError();
	}
	return one.equals(two);
}

Decimal.prototype.equals= function(/* Decimal */two){
	return this.compareTo(two)==0;
}


Decimal.negate=function(/* Decimal */ value){
	return value.neg();
}

Decimal.multiply=function(/* Decimal */ one,/* Decimal */two){
	return one.mul(two);
}

Decimal.subtract=function(/* Decimal */ one,/* Decimal */two){
	return one.sub(two);
}


Decimal.parse=function(/* variant */ value){
	return new Decimal(value);
}


Decimal.truncate=Decimal.Truncate;
Decimal.ceiling=Decimal.Ceiling;
Decimal.floor=Decimal.Floor;
Decimal.abs=Decimal.Abs;


// Mayor que ...
Decimal.prototype.gt= function(/*variant*/value){
	return this.compare(value)>0;
}
// Mayor o igual
Decimal.prototype.gte= function(/*variant*/value){
	return this.compare(value)>=0;
}
// Menor que
Decimal.prototype.lt= function(/*variant*/value){
	return this.compare(value)<0;
}
// Menor o igual
Decimal.prototype.lte= function(/*variant*/value){
	return this.compare(value)<=0;
}





// Esta función no es completamente compatible con C#
// C# maneja hasta 29 dígitos significativos
// La versión original de este script tenía soporte solo para 28 dígitos ...
//
// La forma original de C# es guardar en un array 3 enteros para representar el número
// más la 4 posición guarda los flags para un total de 16 bits ...
//
// Para poder tener una función de obtener bytes acá se realiza lo siguiente
// se guarda el número en total de un array de 4
// utilizando 9 dígitos en cada posición lo que significa que en la última posición solo se guarda
// 2 dígitos
// Por lo tanto esta función hace esto:
// 4 bytes para las primeras tres posiciones (TOTAL 12bytes)
// en los últimos 4 bytes se utiliza 1 para guardar los 2 dígitos de la última posición
// se utiliza otro byte para identificar si es Negativo
// y el último byte con la propiedad exp
Decimal.getBytes= function(/* Decimal */ value, /* Buffer */ bytes){
	bytes.writeInt32LE(value.sig[3],0);
	bytes.writeInt32LE(value.sig[2],4);
	bytes.writeInt32LE(value.sig[1],8);

	// Los dos últimos dígitos
	var val=value.sig[0].toString().substring(0,2)|0;
	bytes.writeUInt16LE(val,12);
	bytes.writeUInt8(value.is_minus,14);
	bytes.writeUInt8(value.exp,15);
}


Decimal.fromBytes= function(/* Buffer */ bytes,/*int */offset){
	offset=offset|0;
	var dec=new Decimal();
	var sig=dec.sig;
	sig[3]=bytes.readInt32LE(0+offset);
	sig[2]=bytes.readInt32LE(4+offset);
	sig[1]=bytes.readInt32LE(8+offset);
	sig[0]=bytes.readUInt16LE(12+offset);
	dec.is_minus= !!bytes.readUInt8(14+offset);
	dec.exp= bytes.readUInt8(15+offset);

	return dec;
}


// Al igual que la función anterior no tiene el mismo resultado que en C#
// debido a la naturaleza de como se realizó esta clase ...
Decimal.getBits= function(/* Decimal */ value){
	if(!Decimal._bitbuf){
		Decimal._bitbuf=new Buffer(16);
	}
	var buf=Decimal._bitbuf;
	Decimal.getBytes(value,buf);
	return [
		buf.readInt32LE(0),
		buf.readInt32LE(4),
		buf.readInt32LE(8),
		buf.readInt32LE(12)
	];
}

Decimal.maxValue= new Decimal("79228162514264337593543950335");
Decimal.minValue= new Decimal("-79228162514264337593543950335");
