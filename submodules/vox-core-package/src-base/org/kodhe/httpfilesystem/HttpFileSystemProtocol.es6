/*global core*/

class HttpFileSystemProtocol{

	
	get(file, options){
		var virtualfile= new core.org.kodhe.httpfilesystem.HttpVirtualFile(file,options)
		return virtualfile
	}
	
	
}
export default HttpFileSystemProtocol