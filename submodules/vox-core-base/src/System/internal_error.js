var mscore= core; //require("../loader.js");

module.exports= function(msg, noinherit, constructor){
	var klmsg=msg;
	function _InvocationError(message, innerException, fileName, lineNumber) {
	    var err = new Error();
		var stack="";
		if(innerException){
			this.innerException=innerException;
			if(!message){
				message=this.innerException.Message||this.innerException.message;

			}
			fileName=fileName|| innerException.Source;
			stack= message + "\nInnerException: " +(this.innerException.StackTraceString||this.innerException.stack||"");
		}
		else{
			stack= message + "\n";
		}

		if(!message){
			message=klmsg;
		}
		this.stack=stack;
	    if (err.stack) {
	        // remove one stack level:
	        if (typeof(Components) != 'undefined') {
	            // Mozilla:
	            stack = err.stack.substring(stack.indexOf('\n')+1);
	        }
	        else if (typeof(chrome) != 'undefined' || typeof(process) != 'undefined') {
	            // Google Chrome/Node.js:
				//this.stack = stack.substring(stack.indexOf('\n')+1);
	            stack = err.stack.replace(/\n[^\n]*/,'');
	        }
	        else {
	            stack = "";
	        }
			stack= stack.replace("Error",msg);
			this.stack += "\n" +stack;
	    }
	    this.message    = message    === undefined ? err.message    : message;


	    this.fileName   = fileName   === undefined ? err.fileName   : fileName;
	    this.lineNumber = lineNumber === undefined ? err.lineNumber : lineNumber;

		//vw.info(this.stack);
	}

	var InvocationError= constructor || _InvocationError
	if(!noinherit){
		InvocationError.prototype = Object.create(mscore.System.Exception.prototype);
	}
	else{
		InvocationError.prototype = Object.create(Error.prototype);
	}
	InvocationError.$constructor= _InvocationError
	InvocationError.prototype.constructor = InvocationError;
	InvocationError.prototype.name = msg;
	return InvocationError;
};
