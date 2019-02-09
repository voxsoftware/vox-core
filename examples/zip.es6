

var d= new Date()
var zip= new core.System.Compression.ZipFile("j:\\culturas2\\culturas2.zip")
var entries= zip.getEntries()
vw.log(new Date()-d)

for(var id of entries){
	vw.warning(id.getData().toString('utf8'))
}