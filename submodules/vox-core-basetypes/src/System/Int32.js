

/* El objetivo de este archivo no es crear una nueva clase para manejar enteros */
/* esto perfectamente se puede hacer con el prototipo Number */

var Int32=module.exports;
Int32.maxValue= 2147483647;
Int32.minValue= -2147483648;
Int32.parse= function(/*string */ str){
	return (str|0)>>32;
}
Int32.getHashCode=Int32.parse;
