
var test2= async ()=>{
	var clr= core.VW.Clr.Manager.current
	var StringBuilderClass=clr.get("System.Text.StringBuilder").method("Append").method("AppendLine").method("ToString").property("Length")


	try{
		var sb= await StringBuilderClass.create()
		var d= new Date()
		for(var i=0;i<20000;i++){
			await sb.AppendLine(i.toString());
		}
		var str=await sb.ToString();
		vw.info(new Date()-d)
		vw.info(str.length)
	}
	catch(e){
		vw.error(e);
	}
	//vw.info(str)

}

test2();