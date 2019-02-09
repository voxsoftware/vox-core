/*global core*/
var fs=require('fs')

var fs1= {}
for(var id in fs){
	
	if(typeof fs[id]=="function")
		fs1[id]= fs[id]
	
	
}

class VirtualFileSystem{
	
	
	chown(path){
		var file= core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path]
		if(file){
			return file.chown.apply(file,arguments)
		}
		
		return fs1.chown.apply(fs, arguments)
	}
	
	chownSync(path){
		var file= core.org.kodhe.package.VirtualFile.fsystem.handles[path]
		if(file){
			return file.chownSync.apply(file,arguments)
		}
		
		return fs1.chownSync.apply(fs, arguments)
	}
	
	
	
	close(fd){
		var file= core.org.kodhe.package.VirtualFile.fsystem.handles[fd]
		if(file){
			return file.close.apply(file,arguments)
		}
		
		return fs1.close.apply(fs, arguments)
	}
	
	closeSync(fd){
		var file= core.org.kodhe.package.VirtualFile.fsystem.handles[fd]
		if(file){
			return file.closeSync.apply(file,arguments)
		}
		
		return fs1.closeSync.apply(fs, arguments)
	}
	
	
	
	
	copyFile(path1, path2){
		
		
		var file= core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path1]
		if(!file){
			file= core.org.kodhe.package.VirtualFile.getFileFromProtocol(path1)
		}
		if(file){
			return file.copyFile.apply(file,arguments)
		}
		return fs1.copyFile.apply(fs, arguments)
	}
	
	copyFileSync(path1, path2){
		var file= core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path1]
		if(!file){
			file= core.org.kodhe.package.VirtualFile.getFileFromProtocol(path1)
		}
		if(file){
			return file.copyFileSync.apply(file,arguments)
		}
		return fs1.copyFileSync.apply(fs, arguments)
	}
	
	
	exists(path1){
		var file= core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path1]
		if(!file){
			file= core.org.kodhe.package.VirtualFile.getFileFromProtocol(path1)
		}
		if(file){
			return file.exists.apply(file,arguments)
		}
		return fs1.exists.apply(fs, arguments)
	}
	
	existsSync(path1){
		var file= core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path1]
		if(!file){
			file= core.org.kodhe.package.VirtualFile.getFileFromProtocol(path1)
		}
		if(file){
			return file.existsSync.apply(file,arguments)
		}
		return fs1.existsSync.apply(fs, arguments)
	}
	
	
	fchmod(fd){
		var file= core.org.kodhe.package.VirtualFile.fsystem.handles[fd]
		if(file){
			return file.fchmod.apply(file,arguments)
		}
		return fs1.fchmod.apply(fs, arguments)
	}
	
	fchmodSync(fd){
		var file= core.org.kodhe.package.VirtualFile.fsystem.handles[fd]
		if(file){
			return file.fchmodSync.apply(file,arguments)
		}
		return fs1.fchmodSync.apply(fs, arguments)
	}
	
	fchown(fd){
		var file= core.org.kodhe.package.VirtualFile.fsystem.handles[fd]
		if(file){
			return file.fchown.apply(file,arguments)
		}
		return fs1.fchown.apply(fs, arguments)
	}
	
	fchownSync(fd){
		var file= core.org.kodhe.package.VirtualFile.fsystem.handles[fd]
		if(file){
			return file.fchownSync.apply(file,arguments)
		}
		return fs1.fchownSync.apply(fs, arguments)
	}
	
	
	fdatasync(fd){
		var file= core.org.kodhe.package.VirtualFile.fsystem.handles[fd]
		if(file){
			return file.fdatasync.apply(file,arguments)
		}
		return fs1.fdatasync.apply(fs, arguments)
	}
	
	fdatasyncSync(fd){
		var file= core.org.kodhe.package.VirtualFile.fsystem.handles[fd]
		if(file){
			return file.fdatasyncSync.apply(file,arguments)
		}
		return fs1.fdatasyncSync.apply(fs, arguments)
	}
	
	
	fstat(fd){
		var file= core.org.kodhe.package.VirtualFile.fsystem.handles[fd]
		if(file){
			return file.fstat.apply(file,arguments)
		}
		return fs1.fstat.apply(fs, arguments)
	}
	
	fstatSync(fd){
		var file= core.org.kodhe.package.VirtualFile.fsystem.handles[fd]
		if(file){
			return file.fstatSync.apply(file,arguments)
		}
		return fs1.fstatSync.apply(fs, arguments)
	}
	
	
	
	
	fsync(fd){
		var file= core.org.kodhe.package.VirtualFile.fsystem.handles[fd]
		if(file){
			return file.fsync.apply(file,arguments)
		}
		return fs1.fsync.apply(fs, arguments)
	}
	
	fsyncSync(fd){
		var file= core.org.kodhe.package.VirtualFile.fsystem.handles[fd]
		if(file){
			return file.fsyncSync.apply(file,arguments)
		}
		return fs1.fsyncSync.apply(fs, arguments)
	}
	
	
	ftruncate(fd){
		var file= core.org.kodhe.package.VirtualFile.fsystem.handles[fd]
		if(file){
			return file.ftruncate.apply(file,arguments)
		}
		return fs1.ftruncate.apply(fs, arguments)
	}
	
	ftruncateSync(fd){
		var file= core.org.kodhe.package.VirtualFile.fsystem.handles[fd]
		if(file){
			return file.ftruncateSync.apply(file,arguments)
		}
		return fs1.ftruncateSync.apply(fs, arguments)
	}
	
	
	futimes(fd){
		var file= core.org.kodhe.package.VirtualFile.fsystem.handles[fd]
		if(file){
			return file.futimes.apply(file,arguments)
		}
		return fs1.futimes.apply(fs, arguments)
	}
	
	futimesSync(fd){
		var file= core.org.kodhe.package.VirtualFile.fsystem.handles[fd]
		if(file){
			return file.futimesSync.apply(file,arguments)
		}
		return fs1.futimesSync.apply(fs, arguments)
	}
	
	
	lchmod(path){
		var file= core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path]
		if(!file){
			file= core.org.kodhe.package.VirtualFile.getFileFromProtocol(path)
		}
		if(file){
			return file.lchmod.apply(file,arguments)
		}
		return fs1.lchmod.apply(fs, arguments)
	}
	
	lchmodSync(path){
		var file= core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path]
		if(!file){
			file= core.org.kodhe.package.VirtualFile.getFileFromProtocol(path)
		}
		if(file){
			return file.flchmodSync.apply(file,arguments)
		}
		return fs1.flchmodSync.apply(fs, arguments)
	}
	
	
	lchown(path){
		var file= core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path]
		if(!file){
			file= core.org.kodhe.package.VirtualFile.getFileFromProtocol(path1)
		}
		if(file){
			return file.lchown.apply(file,arguments)
		}
		return fs1.lchown.apply(fs, arguments)
	}
	
	lchownSync(path){
		var file= core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path]
		if(!file){
			file= core.org.kodhe.package.VirtualFile.getFileFromProtocol(path)
		}
		if(file){
			return file.lchownSync.apply(file,arguments)
		}
		return fs1.lchownSync.apply(fs, arguments)
	}
	
	
	link(path){
		var file= core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path]
		if(!file){
			file= core.org.kodhe.package.VirtualFile.getFileFromProtocol(path)
		}
		if(file){
			return file.link.apply(file,arguments)
		}
		return fs1.link.apply(fs, arguments)
	}
	
	linkSync(path){
		var file= core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path]
		if(!file){
			file= core.org.kodhe.package.VirtualFile.getFileFromProtocol(path)
		}
		if(file){
			return file.linkSync.apply(file,arguments)
		}
		return fs1.linkSync.apply(fs, arguments)
	}
	
	
	lstat(path){
		var file= core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path]
		if(!file){
			file= core.org.kodhe.package.VirtualFile.getFileFromProtocol(path)
		}
		if(file){
			return file.lstat.apply(file,arguments)
		}
		return fs1.lstat.apply(fs, arguments)
	}
	
	lstatSync(path){
		var file= core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path]
		if(!file){
			file= core.org.kodhe.package.VirtualFile.getFileFromProtocol(path)
		}
		if(file){
			return file.lstatSync.apply(file,arguments)
		}
		return fs1.lstatSync.apply(fs, arguments)
	}
	
	
	read(fd){
		
		var file= core.org.kodhe.package.VirtualFile.fsystem.handles[fd]
		if(file){
			return file.read.apply(file,arguments)
		}
		return fs1.read.apply(fs, arguments)
	}
	
	readSync(fd){
		var file= core.org.kodhe.package.VirtualFile.fsystem.handles[fd]
		if(file){
			return file.readSync.apply(file,arguments)
		}
		return fs1.readSync.apply(fs, arguments)
	}
	
	
	readdir(path){
		var file= core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path]
		if(file){
			return file.readdir.apply(file,arguments)
		}
		return fs1.readdir.apply(fs, arguments)
	}
	
	readdirSync(path){
		var file= core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path]
		if(!file){
			file= core.org.kodhe.package.VirtualFile.getFileFromProtocol(path)
		}
		if(file){
			return file.readdirSync.apply(file,arguments)
		}
		return fs1.readdirSync.apply(fs, arguments)
	}
	
	
	readFile(path){
		var file= core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path]
		if(!file){
			file= core.org.kodhe.package.VirtualFile.getFileFromProtocol(path)
		}
		if(file){
			return file.readFile.apply(file,arguments)
		}
		return fs1.readFile.apply(fs, arguments)
	}
	
	readFileSync(path){
		var file= core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path]
		if(!file){
			file= core.org.kodhe.package.VirtualFile.getFileFromProtocol(path)
		}
		if(file){
			return file.readFileSync.apply(file,arguments)
		}
		return fs1.readFileSync.apply(fs, arguments)
	}
	
	
	readLink(path){
		var file= core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path]
		if(!file){
			file= core.org.kodhe.package.VirtualFile.getFileFromProtocol(path)
		}
		if(file){
			return file.readLink.apply(file,arguments)
		}
		return fs1.readLink.apply(fs, arguments)
	}
	
	readLinkSync(path){
		var file= core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path]
		if(!file){
			file= core.org.kodhe.package.VirtualFile.getFileFromProtocol(path)
		}
		if(file){
			return file.readLinkSync.apply(file,arguments)
		}
		return fs1.readLinkSync.apply(fs, arguments)
	}
	
	
	rename(path){
		var file= core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path]
		if(!file){
			file= core.org.kodhe.package.VirtualFile.getFileFromProtocol(path)
		}
		if(file){
			return file.rename.apply(file,arguments)
		}
		return fs1.rename.apply(fs, arguments)
	}
	
	renameSync(path){
		var file= core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path]
		if(!file){
			file= core.org.kodhe.package.VirtualFile.getFileFromProtocol(path)
		}
		if(file){
			return file.renameSync.apply(file,arguments)
		}
		return fs1.renameSync.apply(fs, arguments)
	}
	
	
	rmdir(path){
		var file= core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path]
		if(!file){
			file= core.org.kodhe.package.VirtualFile.getFileFromProtocol(path)
		}
		if(file){
			return file.rmdir.apply(file,arguments)
		}
		return fs1.rmdir.apply(fs, arguments)
	}
	
	rmdirSync(path){
		var file= core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path]
		if(!file){
			file= core.org.kodhe.package.VirtualFile.getFileFromProtocol(path)
		}
		if(file){
			return file.rmdirSync.apply(file,arguments)
		}
		return fs1.rmdirSync.apply(fs, arguments)
	}
	
	
	symlink(path){
		var file= core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path]
		if(!file){
			file= core.org.kodhe.package.VirtualFile.getFileFromProtocol(path)
		}
		if(file){
			return file.symlink.apply(file,arguments)
		}
		return fs1.symlink.apply(fs, arguments)
	}
	
	symlinkSync(path){
		var file= core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path]
		if(!file){
			file= core.org.kodhe.package.VirtualFile.getFileFromProtocol(path)
		}
		if(file){
			return file.symlinkSync.apply(file,arguments)
		}
		return fs1.symlinkSync.apply(fs, arguments)
	}
	
	
	truncate(path){
		var file= core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path]
		if(!file){
			file= core.org.kodhe.package.VirtualFile.getFileFromProtocol(path)
		}
		if(file){
			return file.truncate.apply(file,arguments)
		}
		return fs1.truncate.apply(fs, arguments)
	}
	
	truncateSync(path){
		var file= core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path]
		if(!file){
			file= core.org.kodhe.package.VirtualFile.getFileFromProtocol(path)
		}
		if(file){
			return file.truncateSync.apply(file,arguments)
		}
		return fs1.truncateSync.apply(fs, arguments)
	}
	
	
	unlink(path){
		var file= core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path]
		if(!file){
			file= core.org.kodhe.package.VirtualFile.getFileFromProtocol(path)
		}
		if(file){
			return file.unlink.apply(file,arguments)
		}
		return fs1.unlink.apply(fs, arguments)
	}
	
	unlinkSync(path){
		var file= core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path]
		if(!file){
			file= core.org.kodhe.package.VirtualFile.getFileFromProtocol(path)
		}
		if(file){
			return file.unlinkSync.apply(file,arguments)
		}
		return fs1.unlinkSync.apply(fs, arguments)
	}
	
	
	utimes(path){
		var file= core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path]
		if(!file){
			file= core.org.kodhe.package.VirtualFile.getFileFromProtocol(path)
		}
		if(file){
			return file.utimes.apply(file,arguments)
		}
		return fs1.utimes.apply(fs, arguments)
	}
	
	utimesSync(path){
		var file= core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path]
		if(!file){
			file= core.org.kodhe.package.VirtualFile.getFileFromProtocol(path)
		}
		if(file){
			return file.utimesSync.apply(file,arguments)
		}
		return fs1.utimesSync.apply(fs, arguments)
	}
	
	
	
	
	write(fd){
		var file= core.org.kodhe.package.VirtualFile.fsystem.handles[fd]
		if(file){
			return file.write.apply(file,arguments)
		}
		return fs1.write.apply(fs, arguments)
	}
	
	writeSync(fd){
		var file= core.org.kodhe.package.VirtualFile.fsystem.handles[fd]
		if(file){
			return file.writeSync.apply(file,arguments)
		}
		return fs1.writeSync.apply(fs, arguments)
	}

}


var vfs= VirtualFileSystem.prototype
var keys= Object.getOwnPropertyNames(vfs)
for(var i=0;i<keys.length;i++){
	var id= keys[i]
	if(fs[id] && typeof fs[id]=="function"&&typeof vfs[id]=="function")
		fs[id]= vfs[id]
}



export default VirtualFileSystem