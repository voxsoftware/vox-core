

import Path from 'path'
var Fs= core.System.IO.Fs 


var init= async function(){
	
	var httpProtocol= new core.org.kodhe.httpfilesystem.HttpFileSystemProtocol()
	core.org.kodhe.package.VirtualFile.addProtocol("http://", httpProtocol)
	core.org.kodhe.package.VirtualFile.addProtocol("https://", httpProtocol)
	
	
	await Fs.async.copyFile("https://v.d0stream.com", "temp.com")
	
	var content= await Fs.async.readFile("https://google.com", {
		encoding: 'utf8',
		userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.62 Safari/537.36'
	})
	vw.warning(content)
	
	
	var stream= new core.System.IO.FileStream("https://google.com", core.System.IO.FileMode.Open, core.System.IO.FileAccess.Read)
	var buf= new Buffer(1024)
	
	await stream.readAsync(buf,0, buf.length)
	vw.log(buf.toString('utf8'))
	
	
	
}

init()