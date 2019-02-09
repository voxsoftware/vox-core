
core.VW.__defineGetter__('Moment', function(){
	if(!core.VW.$.Moment)
		core.VW.$.Moment= require("./dist/MomentClass.js").default
	return core.VW.$.Moment
})