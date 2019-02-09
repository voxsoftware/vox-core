

var vw=global.vw= function(){
}
vw.version= "2.0.1"
var fs= require("fs");
var path= require("path");
var Module= require("module").Module;
var resolveName= Module._resolveFilename;
var thisModule= module;


vw.paths=[];
vw.resolveFileName= function(name, imodule){


    var self = this;
    var retry,er;
    try{
        var fn= resolveName.apply(Module,arguments);
        return fn;
    }
    catch(e){
        er=e;
        if(e.code=="MODULE_NOT_FOUND"){
            retry=true;
        }
    }

    if(er && retry){

        var paths=[];
        var upath= function(ipath){
            var ipath= path.normalize(ipath)
            var ipp= ipath

            if(paths.indexOf(ipath)<1){
                if(fs.existsSync(ipath)){
                    paths.push(ipath);
                }
            }


            ipath = ipp+ "/node_modules";
            if(paths.indexOf(ipath)<1){
                if(fs.existsSync(ipath)){
                    paths.push(ipath);
                }
            }


            ipath = ipp+ "/vw_modules";
            if(paths.indexOf(ipath)<1){
                if(fs.existsSync(ipath)){
                    paths.push(ipath);
                }
            }

            var newpath= path.normalize(ipp+ "/..");
            if(newpath!=ipp){
                upath(newpath)
            }

        }

        upath(__dirname)
        if(imodule){
            var stat= fs.statSync(imodule.filename);
            if(stat.isDirectory()){
                upath(imodule.filename);
            }
            else{
                upath(path.dirname(imodule.filename));
            }

        }
        if(imodule.parent){
            var stat= fs.statSync(imodule.parent.filename);
            if(stat.isDirectory()){
                upath(imodule.parent.filename);
            }
            else{
                upath(path.dirname(imodule.parent.filename));
            }
        }
        upath(process.cwd())




        paths= paths.concat(self.paths);
        var file, fl, stat, jpackage, jsonp;
        var reviseExt= function(ipath){
            for(var i in require.extensions){
                var nf= ipath+ i;
                if(fs.existsSync(nf)){
                    return nf;
                }
            }
        }

        for(var i =0;i<paths.length;i++){
            var ipath= paths[i];
            if(ipath){
                fl= path.join(ipath, name);
                if(fs.existsSync(fl)){
                    stat= fs.statSync(fl);
                    if(stat.isDirectory()){
                        jpackage= fl + "/package.json";
                        if(fs.existsSync(jpackage)){
                            jsonp= fs.readFileSync(jpackage,'utf8');
                            jsonp= JSON.parse(jsonp);
                            if(jsonp.main){
                                var npath= path.normalize(fl + "/" + jsonp.main);

                                if(!fs.existsSync(npath)){
                                    npath+=".js";
                                }
                                return npath;
                            }
                        }

                        if(fl= reviseExt(fl + "/index")){
                            return fl;
                        }

                    }
                    else{
                        return fl;
                    }
                }
                else if(fl= reviseExt(fl)){
                    return fl;
                }
            }
        }
    }
    if(er){
        throw er;
    }

}

Module._resolveFilename=vw.resolveFileName;



/* Se incluye por compatibilidad
* Utilice ahora core.VW.Console o core.System.Console 
*/
vw.info= function(){
    var Console= core.VW.Console.setColorInfo();
    Console.writeLine.apply(Console, arguments);
    Console.resetColors();
}

vw.error= function(){
    var Console= core.VW.Console.setColorError();
    Console.writeLine.apply(Console, arguments);
    Console.resetColors();
}

vw.log= function(){
    var Console= core.VW.Console.setColorLog();
    Console.writeLine.apply(Console, arguments);
    Console.resetColors();
}

vw.warning= vw.warn= function(){
    var Console= core.VW.Console.setColorWarning();
    Console.writeLine.apply(Console, arguments);
    Console.resetColors();
}
