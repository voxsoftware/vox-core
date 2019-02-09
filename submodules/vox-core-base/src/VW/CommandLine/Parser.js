
/** 
 * Esta es una clase para leer comandos desde consola
 * con el standard
 Ejemplo: -install -g File 
*/


var Util= core.VW.Util;
var Parser= module.exports= function(){
	this.parameters= {};
	this.values=[];
	this.parametersV={};
	this.parametersN={};
	
}


Parser.prototype.optionPrefix='-'; // Opciones que no requieren parámetro ...
Parser.prototype.parameterPrefix='--'; // Opciones que requiere parámetro --out XXX
Parser.prototype.maxValueLength=-1; // Cantidad de valores permitidos por ejemplo cuando son archivos
	//un comando podría ser -compress -bzip File1.txt File2.txt  en este caso son 2 values
Parser.prototype.throwOnError= true;


Parser.prototype.addParameter= function(/* string */name, /* bool */withValue, /* object */defaultValue){
	
	if(!withValue){
		this.parametersN[name]= arguments.length<3?false:defaultValue;
	}
	else{
		this.parametersV[name]=defaultValue;
	}

	return this;
}


Parser.prototype.parse= function(/*Array*/args, /*bool*/ ignoreThis){

	if(arguments.length<2){
		ignoreThis=true;
	}
	this.parameters= {};
	var values=[];

	if(args==undefined){
		return this.parse(process.argv.slice(!!ignoreThis? 3: 2));
	}

	var arg
	for(var i=0;i<args.length;i++){
		arg= args[i];
		while(arg.indexOf('"')>=0){
			arg=arg.replace('"','')
		}
		args[i]=arg;
	}


	var waitingValue;
	for(var i=0;i<args.length;i++){
		var originalArg= arg= args[i];
		var throwi=false; 
		var here= true;

		if(arg.length!=0){
			
			if(originalArg.substring(0,this.optionPrefix.length)==this.optionPrefix){
				arg= originalArg.substring(this.optionPrefix.length);
				throwi= false;
				here= false;
				if(this.parametersN[arg]===undefined){
					if(this.throwOnError){
						throwi= true;
						//throw new core.System.ArgumentException("El argumento " + arg + " no es válido");
					}
				}
				else{
					// Un parámetro true or false 
					this.parameters[arg]= true;
				}
				
			}


			if(originalArg.substring(0, this.parameterPrefix.length)==this.parameterPrefix){
				here= false;
				arg= originalArg.substring(this.parameterPrefix.length);
				throwi=false;
				
				if(this.parametersV[arg]===undefined){
					if(this.throwOnError){
						throwi=true;
						//throw new core.System.ArgumentException("El argumento " + arg + " no es válido");
					}

				}
				else{
					this.parameters[arg]=null;
					waitingValue= arg;
				}
				
			}
			if(here){

				if(waitingValue){
					this.parameters[waitingValue]= arg;
					waitingValue=false;
				}
				else{
					// es un value ...
					values.push(arg);
				}
			}
		}

		if(throwi){
			throw new core.System.ArgumentException("El argumento " + arg + " no es válido");
		}
	}


	if(this.maxValueLength>-1 &&  values.length>this.maxValueLength && this.throwOnError){
		throw new core.System.ArgumentException("La cantidad de argumentos no son válidos");
	}

	if(waitingValue){
		this.parameters[waitingValue]= null
	}

	for(var i in this.parametersV){
		if(this.parameters[i]===undefined){
			this.parameters[i]= this.parametersV[i];
		}
	}
	for(var i in this.parametersN){
		if(this.parameters[i]===undefined){
			this.parameters[i]= this.parametersN[i];
		}
	}
	this.values=values;
	return this;
}


Parser.prototype.getValues= function(){
	return this.values;
}
Parser.prototype.getFirstValue= function(){
	return this.values[0];
}

Parser.prototype.getAsInt= function(name){
	// obtener parámetro como int
	return this.parameters[name]?this.parameters[name]|0: 0;
}


Parser.prototype.getAsString= function(name){
	// obtener parámetro como int
	return this.parameters[name]?this.parameters[name].toString(): "";
}


Parser.prototype.getAsBoolean= function(name){
	// obtener parámetro como int
	return this.parameters[name]? (this.parameters[name]|0<0 ? false :
		(this.parameters[name].toString().toUpperCase()=="FALSE" ? false: !!this.parameters[name]) ) : false;
}


Parser.prototype.getAsDateTime= function(name){
	if(!this.parameters[name]){
		return core.System.DateTime.minValue;
	}

	var d= new Date(this.parameters[name]);
	if(!isNaN(d)){
		return core.System.DateTime.minValue;
	}

	return new core.System.DateTime(d.getUTCFullYear(), d.getUTCMonth()+1, d.getUTCDate(), d.getUTCHours(),
		d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds(), core.System.DateTimeKind.UTC);
}


Parser.prototype.getAllParameters= function(){
	return this.parameters;
}

Parser.prototype.getAsOptionsObject= function(){
	var o={};
	for(var id in this.parameters){
		o[id]= this.parameters[id];
	}
	o.values= this.getValues();
	return o;
}