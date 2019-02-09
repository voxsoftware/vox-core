
var Util= core.VW.Util;


/**	
* Clase que representa tareas asíncronas. Versión light compatible con Promise de EcmaScript
* @memberof VW
* @constructor
*/
var Task= module.exports= function(){
	this.uid= Task.id++;
	this.$istask$$= true;
}
Task.id=0;


/**
* Esperar una determinada cantidad de segundos
* @param {int} time 
* @return {void}
*/
Task.sleep= function(time){

	var task= new Task()
	if(time<0){
		setImmediate(function(){
			task.finish()
		})
	}
	else{
		setTimeout(function(){
			task.finish()
		}, time)
	}
	return task
}


Task.promisifyAll = function(proto){
	
	var name, names = Object.getOwnPropertyNames(proto)
	for(var i=0;i<names.length;i++){
		name= names[i]
		if(! name.endsWith("Async") ){
			if(typeof proto[name] == "function"){
				proto[name]= Task.fromFunctionWithCallback(proto[name])
			}	
		}
	}
	return proto 
	
}


/**
* Convertir una función que recibe un callback a una tarea
* @param {Function} func
* @param {object} [target] Objeto al que se le aplica la función
* @return {Task} Nueva tarea 
*/
Task.fromFunctionWithCallback= function(func, self){

	return function(){
		var args= Array.prototype.slice.call(arguments, 0, arguments.length)
		var task = new Task()
		args.push(function(er, data){
			if(er){
				task.exception= er
			}
			else{
				task.result= data||task.result
			}

			task.finish()
		})
		task.result= func.apply(self || this, args)
		return task
	}

}

/**
* Procesar el resultado de la tarea antes de exponer el resultado
* @param {Function} before
* @return {void}
*/
Task.prototype.beforeExpose=function(/*function*/before){
	if(!this.before){
		this.before=[];
	}

	if(typeof before == "function"){
		this.before.push(before);
	}
}

/**
* Añadir un callback para ejecutar cuando la tarea finaliza correctamente
* @param {Function} callback
* @param {Function} [onerror]
* @return {Task} this
*/
Task.prototype.then=function(callback, onerror){
	this.p_oncomplete = callback
	if(onerror){
		this.catch(onerror)
	}

	if(!this.get_executing()){
		this.finish()
	}
	return this
}


/**
* Añadir un callback para ejecutar cuando la tarea finaliza con error
* @param {Function} onerror
* @return {Task} this
*/
Task.prototype.catch=function(callback){
	this.p_onerror=callback
	if(!this.get_executing()){
		this.finish()
	}
	return this
}






/**
* Crear una nueva tarea que finaliza cuando finalizan todas las tareas que se pasan como argumento, o cuando una tarea produce error
* @param {Iterator<Task>} tasks
* @return {Task} Nueva tarea creada
*/
Task.waitMany=function(/*Iterable*/tasks){

	var iterator=tasks[Symbol.iterator]();
	var rtask= new core.VW.Task(),total=0;
	var totaldata=[],alltasks=[],faulted;
	while(true){
		var step;
		if((step= iterator.next()).done){
			break;
		}

		var task=step.value;
		total++;
		alltasks.push(task);
		(function(task){
			task.oncomplete= function(){
				if(faulted){
					return;
				}
				if(task.exception){
					rtask.exception=task.exception;
					faulted=true;
					for(var i=0;i<alltasks.length;i++){
						try{
							alltasks[i].cancel();
						}catch(e){}
					}
					rtask.finish();
					return;
				}

				totaldata.push(task.result);
				if(totaldata.length==total){
					rtask.result=totaldata;
					rtask.finish();
					return;
				}
			};	
		})(task);

	}

	return rtask;
}


Task.all= Task.waitMany

Task.waitToCallback= function(/*Task*/task,/*function*/callback){
	task.oncomplete= callback;
}
Task.prototype.waitToCallback= function(/*function*/callback){
	this.oncomplete= callback;
}




Task.prototype.toString= Task.prototype.inspect= function(){
	return "Task " + this.uid + ": " + JSON.stringify({
		isCancelled: this.isCancelled,
		isCompleted: this.isCompleted,
		isFaulted: this.isFaulted
	});
}


Task.get= function(args){
	if(args[args.length-1]&& args[args.length-1].$istask$$){
		var t= args[args.length-1];
		t.inherited= true;
		return t;
	}
	else{
		return new Task();
	}
	eventEmitter.call(this);
}


/**
* Cancelar la tarea si está pendiente. Produce la excepción {@link core.VW.TaskCancelledException}.
* @return {void}
*/
Task.prototype.cancel= function(/* bool */force){
	this.cancelled= true;
	this.$exception= new core.VW.TaskCancelledException("El usuario canceló");
}


/**
* Resultado de la tarea
* @type {Mixed}
*/
Task.prototype.result=undefined
Task.prototype.get_result= function(){
	return this.$result;
}

Task.prototype.set_result= function(val){
	if(this.cancelled){
		return; 
	}
	return this.$result=val;
}


Task.prototype.reset= function(/*bool */all){
	this.$exception=null;
	this.$iscompleted= false;
	this.$isfaulted= false;
	this.$result= null;
	this.$oncomplete= null;
	this.$onerror=null;
	this.cancelled=false;	
	if(all){
		this.$alwaysonerror=null;
	}
}


Task.prototype.resetEvents= function(/*bool */all){
	this.$oncomplete= null;
	this.$onerror=null;
	this.$alwaysonerror=null;
}


/**
* Marcar como finalizada la tarea
* return {void}
*/
Task.prototype.finish=  function(result){

	var self=this, er, v
	if(arguments.length > 0){
		self.result= result
	}	


	if(this.before){
		var func= this.before.shift()
		if(func){
			
			if(func instanceof Task){
				v = func
			}
			else{
				try{
					v=func(self.result)
				}
				catch(e){
					self.exception= e
				}
			}
			
			
			if(v instanceof Task){
				v.oncomplete= function(){
					self.result= v.result
					self.$exception= v.exception
					self.finish()
				}
				return
			}
			else{
				if(v !== undefined)
					self.result= v
				self.finish()
			}
			return;
		}
	}


	
	
	if(self.exception){
		
		if(self.p_onerror){
			self.p_onerror(self.exception)
			return
		}
		
		else if(self.$onerror){
			var c= self.$onerror
			c(self.exception)
			return
		}
		
		else if(self.$alwaysonerror){ 
			self.$alwaysonerror(self.exception)
			return
		}
	}

	self.$iscompleted=true
	if(!self.exception && self.p_oncomplete){
		self.p_oncomplete(self.result)
	}
	else if(self.$oncomplete){
		var c= self.$oncomplete
		c(self.result)
	}
}



/**
* Función a ejecutar al terminar la tarea
* @type {Function}
*/
Task.prototype.oncomplete=undefined
Task.prototype.get_oncomplete= function(){
	return this.$oncomplete;
}

/**
* Función a ejecutar cuando ocurre un erro en la ejecución de la tarea
* @type {Function}
*/
Task.prototype.onerror=undefined
Task.prototype.get_onerror= function(){
	return this.$onerror;
}


Task.prototype.alwaysonerror=undefined
Task.prototype.get_alwaysonerror= function(){
	return this.$alwaysonerror;
}


Task.prototype.set_oncomplete= function(value){
	this.$oncomplete=value;
	if(!this.get_executing()){
		this.finish();
	}
	return value;
}

Task.prototype.set_onerror= function(value){
	this.$onerror=value
	if(!this.get_executing()){
		this.finish();
	}
	return value;
}

Task.prototype.set_alwaysonerror= function(value){
	this.$alwaysonerror=value
	if(!this.get_executing()){
		this.finish();
	}
	return value;
}



/**
* Indica si la tarea se ha completado
* @type {Boolean}
*/
Task.prototype.isCompleted=undefined
Task.prototype.get_isCompleted= function(){
	return !!this.$iscompleted
}

/**
* Indica si la tarea se está ejecutando
* @type {Boolean}
*/
Task.prototype.executing= undefined
Task.prototype.get_executing= function(){
	return !(!!this.$iscompleted || !!this.$isfaulted || !!this.cancelled);
}

/**
* Indica si la tarea terminó con errores
* @type {Boolean}
*/
Task.prototype.isFaulted= undefined
Task.prototype.get_isFaulted= function(){
	return !!this.$isfaulted;
}


/**
* Indica si la tarea fue cancelada
* @type {Boolean}
*/
Task.prototype.isCancelled=undefined
Task.prototype.get_isCancelled= function(){
	return !!this.cancelled;
}

/**
* Error ocurrido durante la ejecución de la tarea
* @type {Error|System.Exception}
*/
Task.prototype.exception=undefined
Task.prototype.get_exception= function(){
	return this.$exception;
}

Task.prototype.set_exception= function(err){
	if(!err){
		return;
	}
	if(!(err instanceof Error)){
		var ex= new core.System.Exception(err.message || err.toString(), err);
		if(typeof err =="object"){
			for(var id in err){
				ex[id]=err[id]
			}
		}
		err= ex
	}
	this.$isfaulted=true;
	return this.$exception= err;
}
Util.createProperties(Task,Task.prototype);
