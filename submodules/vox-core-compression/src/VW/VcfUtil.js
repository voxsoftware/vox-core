
/* Contiene utilidades para comprimir archivo o carpetas*/
var fs= require("fs");
var Path= require("path");
var Vcf=require("./Vcf");
var VW= core.VW;
var System= core.System;
var VcfUtil=module.exports=function(){
}


VcfUtil.compressFolder= function(/* string */folder, /*Stream,String */out, /*function*/progress){
	if(!(out instanceof System.IO.Stream)){
		out=new System.IO.FileStream(out,System.IO.FileMode.truncate,System.IO.FileAccess.readWrite);
		close= true;	
	}

	var cp=new Vcf(out);
	if(progress instanceof VW.VcfCompression){
		cp.compression= progress;
	}

	if(arguments.length==4){
		progress=arguments[3];
	}
	
	VcfUtil._compressFolder(cp,folder,'',progress);	
	if(close){
		cp.close();
	}
	cp=null;
}



VcfUtil.decompressToFolder= function(/*Stream,String */sIn,/* string */folder, /*function*/ progress){
	if(!(sIn instanceof System.IO.Stream)){
		sIn=new System.IO.FileStream(sIn,System.IO.FileMode.open,System.IO.FileAccess.readWrite);
		close= true;	
	}


	var cp=new Vcf(sIn);
	VcfUtil._decompressFolder(cp,folder,progress);	
	if(close){
		cp.close();
	}
	cp=null;
}


VcfUtil._compressFolder= function(vcf, folder, path, progress){
	
	var files=[];
	var ev={};
	ev.files=files;
	ev.totalbytes= 0;
	ev.writtenbytes= 0;
	ev.writtenfiles= 0;
	ev.totalfiles=0;

	VcfUtil.calculate(vcf,ev,folder,path);

	var cada= (ev.totalfiles/400)|0
	if(cada<=0)
		cada= 1


	for(var i=0;i<files.length;i++){
		var file= files[i];
		if(file.directory){
			vcf.createDirectory(file.path);
		}
		else{
			vcf.write(file.path, fs.readFileSync(file.file));
			ev.writtenfiles++
			ev.writtenbytes+= file.size;

			if(progress && (ev.writtenfiles%cada==0 || ev.writtenfiles==ev.totalfiles)){
				ev.currentFile= file.file;				
				ev.percent= (ev.writtenbytes*100)/ev.totalbytes;
				progress(ev);
			}
		}
	}

	if(ev.totalfiles>512){
		vcf.optimizeForRead();
	}
}


VcfUtil.calculate= function(vcf, data, folder, path){
	//var foldername= path.basename(folder);
	//var npath=path+foldername+"/";

	var paths= fs.readdirSync(folder);
	var totalfiles=0;
	for(var i=0;i<paths.length;i++){
		var file=Path.join(folder,paths[i]);
		var stat=fs.statSync(file);
		if(stat.isDirectory()){
			totalfiles++;
			data.totalfiles++;
			VcfUtil.calculate(vcf,data, file, Path.join(path, paths[i]));
		}
		else if(stat.isFile()){

			data.totalbytes+=stat.size;
			data.totalfiles++;
			totalfiles++;
			data.files.push({
				"file":file,
				"path":Path.join(path, paths[i]),
				"size":stat.size
			});			
		}
	}



	if(totalfiles==0){
		data.files.push({
			"file":folder,
			"path":path,
			"size":0,
			"directory":true
		});
		data.totalfiles++;
	}
}


VcfUtil._decompressFolder= function(vcf, folder, progress){
	VcfUtil.mkdirRecursive(folder, "");	
	var emptyDirectories= vcf.emptyDirectories;
	emptyDirectories.forEach(function(dir){
		VcfUtil.mkdirRecursive(folder, dir);
	});

	var files= vcf.files;
	var ev={};
	ev.files=files;
	ev.totalbytes= 0;
	ev.writtenbytes= 0;
	ev.totalfiles=files.length;
	ev.writtenfiles=0

	var cada= (ev.totalfiles/400)|0
	if(cada<=0)
		cada= 1
	

	for(var i=0;i<files.length;i++){
		var file= files[i];
		var dir= Path.dirname(file);
		if(dir!="."){
			VcfUtil.mkdirRecursive(folder,dir);
		}

		var fileout= Path.join(folder, file);
		var fsStream= new System.IO.FileStream(fileout, System.IO.FileMode.truncate, System.IO.FileAccess.write);
		var er=undefined;
		try{
			vcf.read(file, fsStream)
		}
		catch(e){
			er=e;
		}
		fsStream.close();
		if(er){throw er;}

		ev.writtenfiles++
		ev.writtenbytes+= fs.statSync(fileout).size;

		if(progress && (ev.writtenfiles%cada==0 || ev.writtenfiles==ev.totalfiles)){
			ev.currentFile= file;
			ev.percent= (100/files.length) * (i+1)
			progress(ev);
		}
	}

}

VcfUtil.mkdirRecursive= function(path1, path2){
	path2= path2.split("/");
	for(var i=0;i<path2.length;i++){
		var p= path2[i];
		path1=Path.join(path1,p);
		if(!fs.existsSync(path1)){
			fs.mkdirSync(path1);
		}
	}
}


VcfUtil.compressFile= function(/* String */file, /*String */ filename, /*Stream,String */out){
	var close= false;
	if(arguments.length<3){
		out=filename;
		filename=null;

	}
	if(!(out instanceof System.IO.Stream)){
		out=new System.IO.FileStream(out,System.IO.FileMode.truncate,System.IO.FileAccess.readWrite);
		close= true;	
	}

	var buf=fs.readFileSync(file)
	var cp=new Vcf(out);
	cp.write(filename?filename:file, buf);
	if(close){
		cp.close();
	}
	cp=null;
}


VcfUtil.decompressFile= function(/* Stream,String */filein, /*String */ filename, /*Stream,String */out){
	var close1= false,close2=false;
	if(arguments.length<3){
		out=filename;
		filename=null;

	}
	if(!(filein instanceof System.IO.Stream)){
		filein=new System.IO.FileStream(filein.toString(),System.IO.FileMode.open,System.IO.FileAccess.readWrite);
		close1= true;	
	}


	if(!(out instanceof System.IO.Stream)){
		out=new System.IO.FileStream(out,System.IO.FileMode.truncate,System.IO.FileAccess.write);
		close2= true;	
	}

	//var buf=fs.readFileSync(file)
	var cp=new Vcf(filein);
	if(!filename){
		throw new System.NotImplementedException();
	}

	cp.read(filename, out);
	if(close1){
		cp.close();
	}
	if(close2){
		out.close();
	}
	cp=null;
}