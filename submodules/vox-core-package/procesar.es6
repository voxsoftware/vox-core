
import Path from 'path'
var Fs= core.System.IO.Fs 


var init= async function(){
	
	var udir= Path.join(__dirname , "..", "..", "node_modules")
	var dirs= await Fs.async.readdir(udir)
	var udir2, stat, out, creator
	
	for(var i=0;i<dirs.length;i++){
		
		if(!dirs[i].startsWith(".")){
			udir2= Path.join(udir, dirs[i])
			stat= await Fs.async.stat(udir2)
			if(stat.isDirectory()){
				vw.warning("Processing: ", udir2)
				out= Path.join(__dirname , "..", "..", "libraries.out", dirs[i] + ".kll")
				creator= new core.org.kodhe.package.Creator(udir2, out)
				creator.compile()
			}
		}	
		
	}
}

init()