
var System= core.System;
var Char=module.exports=function(){
}

var CharUnicodeInfo= System.Globalization.CharUnicodeInfo;
var UnicodeCategory= System.Globalization.UnicodeCategory;

Char.categoryForLatin1= [14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	11,
	24,
	24,
	24,
	26,
	24,
	24,
	24,
	20,
	21,
	24,
	25,
	24,
	19,
	24,
	24,
	8,
	8,
	8,
	8,
	8,
	8,
	8,
	8,
	8,
	8,
	24,
	24,
	25,
	25,
	25,
	24,
	24,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	20,
	24,
	21,
	27,
	18,
	27,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	20,
	25,
	21,
	25,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	14,
	11,
	24,
	26,
	26,
	26,
	26,
	28,
	28,
	27,
	28,
	1,
	22,
	25,
	19,
	28,
	27,
	28,
	25,
	10,
	10,
	27,
	1,
	28,
	24,
	27,
	10,
	1,
	23,
	10,
	10,
	10,
	24,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	25,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	25,
	1,
	1,
	1,
	1,
	1,
	1,
	1,
	1]

Char.isLatin1= function(/*char*/ ch)
{
	return ch.charCodeAt(0) <= 'ÿ'.charCodeAt(0);
}


Char.getLatin1UnicodeCategory= function(/*char*/ ch)
{
    if(typeof ch =="string"){
        ch=ch.charCodeAt(0);
    }
	return UnicodeCategory.parse(char.categoryForLatin1[ch]);
}

Char.isControl= function(/* char*/c, /* int[optional]*/ index){
    if(arguments.length>1){
        c=c[index];
    }
    if (Char.isLatin1(c))
	{
		return Char.GetLatin1UnicodeCategory(c) == UnicodeCategory.Control;
	}
	return CharUnicodeInfo.getUnicodeCategory(c) == UnicodeCategory.Control;
}


Char.isDigit= function(/* char*/c, /* int[optional]*/ index){
    if(arguments.length>1){
        c=c[index];
    }
    if (Char.isLatin1(c))
	{
        var i= c.charCodeAt(0);
		return i >= 48 && i<= 57;
	}
	return CharUnicodeInfo.getUnicodeCategory(c) == UnicodeCategory.DecimalDigitNumber;
}


Char.isHighSugorrate= function(/* char*/c, /* int[optional]*/ index){
    if(arguments.length>1){
        c=c[index];
    }
	var i= c.charCodeAt(0);
	return i >= 55296 && i<= 56319;
}


Char.isAscii= function(/* char*/c){
	return c.charCodeAt(0)<=127;
}

Char.isLetter= function(/*char*/ c, /* int[optional] */index){
	if(arguments.length>1){
        c=c[index];
    }
	if (!Char.isLatin1(c))
	{
		return Char.checkLetter(CharUnicodeInfo.getUnicodeCategory(c));
	}
	if (Char.IsAscii(c))
	{
		c |= ' ';
		var i= c.charCodeAt(0);
		i |= 32;
		return i >= 97 && i <= 122;
	}
	return Char.CheckLetter(Char.GetLatin1UnicodeCategory(c));
}


Char.isLetterOrDigit= function(/*char*/ c, /* int[optional] */index){
	if(arguments.length>1){
        c=c[index];
    }
	if (Char.isLatin1(c))
	{
		return Char.checkLetterOrDigit(Char.getLatin1UnicodeCategory(c));
	}
	return Char.checkLetterOrDigit(CharUnicodeInfo.getUnicodeCategory(c));
}


Char.IsLower= function(/*char*/ c, /* int[optional] */index)
{
	if(arguments.length>1){
        c=c[index];
    }
	if (!Char.isLatin1(c))
	{
		return CharUnicodeInfo.getUnicodeCategory(c) == UnicodeCategory.LowercaseLetter;
	}
	if (Char.IsAscii(c))
	{
		var i= c.charCodeAt(0);
		return i >= 97 && i <= 122;
	}
	return Char.getLatin1UnicodeCategory(c) == UnicodeCategory.LowercaseLetter;
}

Char.isLowSugorrate= function(/* char*/c, /* int[optional]*/ index){
    if(arguments.length>1){
        c=c[index];
    }
	var i= c.charCodeAt(0);
	return i >= 56320 && i<= 57343;
}

Char.isNumber= function(/* char*/c, /* int[optional]*/ index){
    if(arguments.length>1){
        c=c[index];
    }
	if (!Char.isLatin1(c))
	{
		return Char.checkNumber(CharUnicodeInfo.getUnicodeCategory(c));
	}
	if (Char.IsAscii(c))
	{
		var i= c.charCodeAt(0);
		return i >= 48 && i<= 57;
	}
	return Char.checkNumber(Char.getLatin1UnicodeCategory(c));
}


Char.isPuntuaction= function(/* char*/c, /* int[optional]*/ index){
    if(arguments.length>1){
        c=c[index];
    }
	if (Char.isLatin1(c))
	{
		return Char.checkPuntuaction(Char.getLatin1UnicodeCategory(c));
	}
	return Char.checkPuntuaction(CharUnicodeInfo.getUnicodeCategory(c));
}

Char.isSeparator= function(/* char*/c, /* int[optional]*/ index){
    if(arguments.length>1){
        c=c[index];
    }
	if (Char.isLatin1(c))
	{
		return Char.isSeparatorLatin1(c);
	}
	return Char.checkSeparator(CharUnicodeInfo.getUnicodeCategory(c));
}

Char.isSurrogate= function(/* char*/c, /* int[optional]*/ index){
    if(arguments.length>1){
        c=c[index];
    }
	var i= c.charCodeAt(0);
	return i >= 55296 && i <= 57343;
}


Char.isSurrogatePair= function(/*char o string */ highSurrogate, /*char o int*/ lowSurrogate){
	if(typeof lowSurrogate != "string"){
		lowSurrogate= highSurrogate[(lowSurrogate+1)|0];
		if(lowSurrogate==undefined){
			return false;
		}
	}
	return highSurrogate >= 55296 && highSurrogate <= 56319 && lowSurrogate >= 56320 && lowSurrogate <= 57343;
}


Char.isSymbol= function(/* char*/c, /* int[optional]*/ index){
    if(arguments.length>1){
        c=c[index];
    }
	if (Char.isLatin1(c))
	{
		return Char.checkSymbol(Char.getLatin1UnicodeCategory(c));
	}
	return Char.checkSymbol(CharUnicodeInfo.getUnicodeCategory(c));
}

Char.isUpper= function(/* char*/c, /* int[optional]*/ index){
    if(arguments.length>1){
        c=c[index];
    }
	if (!Char.isLatin1(c))
	{
		return CharUnicodeInfo.getUnicodeCategory(c) == UnicodeCategory.UppercaseLetter;
	}
	if (Char.isAscii(c))
	{
		var i= c.charCodeAt(0);
		return c >= 65 && c <= 90;
	}
	return Char.getLatin1UnicodeCategory(c) == UnicodeCategory.UppercaseLetter;
}


Char.isWhiteSpace= function(/* char*/c, /* int[optional]*/ index){
    if(arguments.length>1){
        c=c[index];
    }
	if (Char.isLatin1(c))
	{
		return Char.isWhiteSpaceLatin1(c);
	}
	return  CharUnicodeInfo.isWhiteSpace(c);
}

Char.isWhiteSpaceLatin1= function(){
	var i= c.charCodeAt(0);
	return i == 32 || (i >= 9 && c <= 13) || c == '\u00a0' || c == '\u0085';
}


Char.IsSeparatorLatin1= function(/*char*/ c)
{
	return c == ' ' || c == '\u00a0';
}

Char.CheckLetterOrDigit=function(/*UnicodeCategory*/ uc)
{
	switch (uc+0)
	{
		case UnicodeCategory.UppercaseLetter+0:
		case UnicodeCategory.LowercaseLetter+0:
		case UnicodeCategory.TitlecaseLetter+0:
		case UnicodeCategory.ModifierLetter+0:
		case UnicodeCategory.OtherLetter+0:
		case UnicodeCategory.DecimalDigitNumber+0:
			return true;
	}
	return false;
}



Char.checkLetter= function(/*UnicodeCategory*/ uc){
	switch (uc+0)
	{
		case UnicodeCategory.UppercaseLetter+0:
		case UnicodeCategory.LowercaseLetter+0:
		case UnicodeCategory.TitlecaseLetter+0:
		case UnicodeCategory.ModifierLetter+0:
		case UnicodeCategory.OtherLetter+0:
			return true;
		default:
			return false;
	}
}


Char.checkNumber=function(/*UnicodeCategory*/ uc)
{
	switch (uc+0)
	{
		case UnicodeCategory.DecimalDigitNumber+0:
		case UnicodeCategory.LetterNumber+0:
		case UnicodeCategory.OtherNumber+0:
			return true;
		default:
			return false;
	}
}

Char.checkPunctuation= function(/*UnicodeCategory*/ uc)
{
	switch (uc+0)
	{
		case UnicodeCategory.ConnectorPunctuation+0:
		case UnicodeCategory.DashPunctuation+0:
		case UnicodeCategory.OpenPunctuation+0:
		case UnicodeCategory.ClosePunctuation+0:
		case UnicodeCategory.InitialQuotePunctuation+0:
		case UnicodeCategory.OtherPunctuation+0:
			return true;
		default:
			return false;
	}
}

Char.checkSeparator=function(/*UnicodeCategory*/ uc)
{
	switch (uc+0)
	{
		case UnicodeCategory.SpaceSeparator+0:
		case UnicodeCategory.LineSeparator+0:
		case UnicodeCategory.ParagraphSeparator+0:
			return true;
		default:
			return false;
	}
}

Char.checkSymbol=function(/*UnicodeCategory*/ uc)
{
	switch (uc+0)
	{
		case UnicodeCategory.MathSymbol+0:
		case UnicodeCategory.CurrencySymbol+0:
		case UnicodeCategory.ModifierSymbol+0:
		case UnicodeCategory.OtherSymbol+0:
			return true;
		default:
			return false;
	}
}
