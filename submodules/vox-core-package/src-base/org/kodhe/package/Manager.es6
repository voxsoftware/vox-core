var Fs= core.System.IO.Fs
var Path= require("path")
class Manager{
	
	
	static importDirectory(dir, name){
		
		var files, file
		files= Manager.cachedDirs[dir] || Fs.sync.readdir(dir)
		Manager.cachedDirs[dir]= files 
		
		for(var i=0;i<files.length;i++){
			file= files[i]
			if(file.endsWith(".kll")){
				Manager.import(Path.join(dir,file) ,Path.join(name,  Path.basename(file, ".kll")))
			}
		}
		
		
	}


	static import(file, name){
		
		if(Manager.cachedFiles[file])
			return 

		// Importar un package ...
		var stream= new core.System.IO.FileStream(file, core.System.IO.FileMode.Open, core.System.IO.FileAccess.Read)
		try{
			var kll= new core.org.kodhe.package.Kll(stream)
			kll.name= name
			kll.read()
	
			for(var i=0;i<kll.files.length;i++){
				core.org.kodhe.package.VirtualFile.register(kll.files[i])
			}
			
			Manager.cachedFiles[file]= true
		}
		catch(e){
			throw e
		}
		finally{
			
			/*
			if(stream){
				try{
					stream.close()
					kll=null
				}catch(e){}
			}*/
			
			
		}
	}

}
Manager.cachedDirs={}
Manager.cachedFiles={}
export default Manager
