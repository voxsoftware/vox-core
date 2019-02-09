

var MobileClass= module.exports= function(){
}
MobileClass.startUrl= function(url){

	MobileClass.$.url= url
	MobileClass.$.started= new Date()
	Mobile("mobile.start").call(url)

}


MobileClass.isMobile= function(){
	return typeof global.Mobile === "function"
}
MobileClass.$={}
MobileClass.toJSON= function(){
	return this.$
}