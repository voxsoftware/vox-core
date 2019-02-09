
let test1=()=>{
	var raw=`

	<html>
		<head>
			<title><vw:expression>James </vw:expression></title>
		</head>
	</html>

	`

	var parser= new core.VW.E6Html.Parser()
	vw.info(parser.parse(raw).code)
}


let test2=()=>{
	var raw=`
	<html class='gray'>
		<script server-side lang='ecmascript6'>
		var James=0;
		</script>

		<head>
			<title><vw:expression>James </vw:expression></title>
		</head>


	</html>

	`
	var parser= new core.VW.E6Html.Parser()
	vw.info(parser.parse(raw).code)
}


let test3=()=>{
	var raw=`
	
<vw:section name='content'>
	<div>JAMES </div>
</vw:section>

<html>
	<head>
		<title>James</title>
	</head>

	<body>
		Proceso: <vw:expression>process.pid</vw:expression>
	</body>
</html>

	`
	var parser= new core.VW.E6Html.Parser()
	vw.info(parser.parse(raw).code)
}



test3();