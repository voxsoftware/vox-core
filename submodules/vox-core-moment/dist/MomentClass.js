
var moment= require('./moment.js').default
var moment2= core.VW.Ecma2015.Utils.module(require('./lib/moment/moment'))
var glob= core.System?core.System.Globalization:null


if(glob){
	require('./lib/utils/hooks').setHookCallback(function(){
		
		var m= moment2.createLocal.apply(moment, arguments)
		
		/*
		if(m)
			m.cultureInfo= glob.CultureInfo.currentCulture
		*/
		return m
	})

	moment.fn.__defineSetter__('cultureInfo', function(value){
		this.$culture= value
		this.locale(value.toString())
	})

	moment.fn.__defineGetter__('cultureInfo', function(){
		return this.$culture
	})
}


exports.default= moment


