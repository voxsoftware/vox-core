
/*! http://mths.be/base64 v0.1.0 by @mathias | MIT license */
;(function(root) {

	// Detect free variables `exports`.
	var freeExports = typeof exports == 'object' && exports;

	// Detect free variable `module`.
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code, and use
	// it as `root`.
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var InvalidCharacterError = function(message) {
		this.message = message;
	};
	InvalidCharacterError.prototype = new Error;
	InvalidCharacterError.prototype.name = 'InvalidCharacterError';

	var error = function(message) {
		// Note: the error messages used throughout this file match those used by
		// the native `atob`/`btoa` implementation in Chromium.
		throw new InvalidCharacterError(message);
	};


	var TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	// http://whatwg.org/html/common-microsyntaxes.html#space-character
	var REGEX_SPACE_CHARACTERS = /[\t\n\f\r ]/g;

	var processstr=function(str){
		return String(str)
			.replace(REGEX_SPACE_CHARACTERS, '');
	}

	// `decode` is designed to be fully compatible with `atob` as described in the
	// HTML Standard. http://whatwg.org/html/webappapis.html#dom-windowbase64-atob
	// The optimized base64-decoding algorithm used is based on @atk’s excellent
	// implementation. https://gist.github.com/atk/1020396
	var decode = function(input) {
		input = String(input)
			.replace(REGEX_SPACE_CHARACTERS, '');
		var length = input.length;
		if (length % 4 == 0) {
			input = input.replace(/==?$/, '');
			length = input.length;
		}
		if (
			length % 4 == 1 ||
			// http://whatwg.org/C#alphanumeric-ascii-characters
			/[^+a-zA-Z0-9/]/.test(input)
		) {
			error(
				'Invalid character: the string to be decoded is not correctly encoded.'
			);
		}
		var bitCounter = 0;
		var bitStorage;
		var buffer;
		var output = '';
		var position = -1;
		while (++position < length) {
			buffer = TABLE.indexOf(input.charAt(position));
			bitStorage = bitCounter % 4 ? bitStorage * 64 + buffer : buffer;
			// Unless this is the first of a group of 4 characters…
			if (bitCounter++ % 4) {
				// …convert the first 8 bits to a single ASCII character.
				output += String.fromCharCode(
					0xFF & bitStorage >> (-2 * bitCounter & 6)
				);
			}
		}
		return new Buffer(output,'ascii');
	};

	// `encode` is designed to be fully compatible with `btoa` as described in the
	// HTML Standard: http://whatwg.org/html/webappapis.html#dom-windowbase64-btoa
	var encode = function(input, offset, count, insertline) {


		// input es buffer

		var padding = count % 3;
		var output = '';
		var position = offset-1;
		var a;
		var b;
		var c;
		var d;
		var buffer;
		// Make sure any padding is handled outside of the loop.
		var length = count - padding;
		var num=0;
		while (++position < length) {
			// Read three bytes, i.e. 24 bits.
			a = input[position] << 16;
			b = input[++position] << 8;
			c = input[++position];
			buffer = a + b + c;
			// Turn the 24 bits into four chunks of 6 bits each, and append the
			// matching character for each of them to the output.
			output += (
				TABLE.charAt(buffer >> 18 & 0x3F) +
				TABLE.charAt(buffer >> 12 & 0x3F) +
				TABLE.charAt(buffer >> 6 & 0x3F) +
				TABLE.charAt(buffer & 0x3F)
			);
			num+=4;
			if(num>=76){
				output +="\n";
				num=0;
			}
		}

		if (padding == 2) {
			a = input[position] << 8;
			b = input[++position];
			buffer = a + b;
			output += (
				TABLE.charAt(buffer >> 10) +
				TABLE.charAt((buffer >> 4) & 0x3F) +
				TABLE.charAt((buffer << 2) & 0x3F) +
				'='
			);
			num+=4;
			if(num>=76){
				output +="\n";
				num=0;
			}
		} else if (padding == 1) {
			buffer = input[position];

			if(num>=76){
				if(insertline){
					output +="\n";
				}
				num=0;
			}
			if(num+1>=76){
				output += TABLE.charAt(buffer >> 2);
				if(insertline){
					output +="\n";
				}
				num=2;
				output += TABLE.charAt((buffer << 4) & 0x3F);
				output += '==';
			}
			else if(num+2>=76){
				output += TABLE.charAt(buffer >> 2);
				output += TABLE.charAt((buffer << 4) & 0x3F);
				if(insertline){
					output +="\n";
				}
				num=1;
				output += '==';
			}
			else if(num+3>=76){
				output += TABLE.charAt(buffer >> 2);
				output += TABLE.charAt((buffer << 4) & 0x3F);
				output += '==';
				if(insertline){
					output +="\n";
				}
				num=0;
			}
			else{
				output += TABLE.charAt(buffer >> 2);
				output += TABLE.charAt((buffer << 4) & 0x3F);
				output += '==';
				num+=3;
			}


		}

		return output;
	};

	var base64 = {
		'encode': encode,
		'processstr':processstr,
		'decode': decode,
		'version': '0.1.0'
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define(function() {
			return base64;
		});
	}	else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = base64;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (var key in base64) {
				base64.hasOwnProperty(key) && (freeExports[key] = base64[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.base64 = base64;
	}

}(this));
