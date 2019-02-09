

let test1= ()=>{
	var file= `${__dirname}/../examples-files/test1.es6.html`
	var Script= new core.VW.E6Html.E6Html(file);
	Script.invoke();
	setInterval(()=>null, 400)
}

let test2= ()=>{
	var file= `${__dirname}/../examples-files/test2.es6.html`
	var Script= new core.VW.E6Html.E6Html(file);
	Script.invoke();
	setInterval(()=>null, 400)
}

let test3= ()=>{
	var file= `${__dirname}/../examples-files/test2.es6.html`
	var Script= new core.VW.E6Html.E6Html(file);
	Script.invoke();
	setInterval(()=>null, 400)
}
test1();
test2();
test3();