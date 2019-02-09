
// C# Structs ..
// las estructuras de c# no tienen equivalente en JavaScript ...
// En este caso se utiliza un objeto buffer

var Structure= module.exports=function(){
}

Structure.prototype.getBytes=function(){
    return this.$buf;
}


Structure.fromBytes=function(/*Buffer*/buf, /* int*/position){
    var s=new this();
    s.$buf=buf;
    s.$position= position|0;
    return s;
}
