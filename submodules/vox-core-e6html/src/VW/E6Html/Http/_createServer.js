
var Util= core.VW.Util;
var util= require("util");
var Url= require("url")
var Path= require("path");
var fs= require("fs");
var parent= core.VW.Http.Server;
var ServerContext= core.VW.E6Html.Http.ServerContext

module.exports= function(Server){

	var js=core.VW.E6Html.E6Html;
	Server.scriptFileExtensions= {
		".es6.html": js,
		".es6-html": js
	};


	Server.prototype.createContext= function(req,res,next){
		var context=new ServerContext(this,req,res,next);
		this.emit("contextcreated", context)
		return context;
	}


	Server.prototype.viewManager = function(/*string */folder){
		if(!this.$viewm){
			this.$viewm={};
		}

		if(!this.$viewm[folder]){
			this.$viewm[folder]= new core.VW.E6Html.Http.ViewManager(this,folder);
		}
		return this.$viewm[folder];
	}


	Server.prototype.get_viewManagers= function(){
		return this.$viewm || {};
	}


	Server.prototype._handle2= function(){
		var self= this;

		return function(req,res,next){
				
			
			
			var url1= req.uri.pathname;
			
			var handled= false;
			self.$paths.forEach(function(dir){
				
				if(dir.uri[dir.uri.length-1]!="/"){
					dir.uri+="/";
				}
				
				
				var nfile;
				if(url1.substring(0,dir.uri.length)==dir.uri){
					nfile= url1.substring(dir.uri.length);
				}
				else{
					return;
				}


				nfile= Path.join(dir.folder,nfile);
				//vw.info(nfile)
				if(fs.existsSync(nfile)){
					for(var id in Server.scriptFileExtensions){
						if(nfile.substring(nfile.length - id.length, nfile.length)==id){
							var script= Server.scriptFileExtensions[id];
							var scriptFile= script.get(nfile);
							scriptFile.compile();
							var promise= scriptFile.invoke(self.createContext(req,res,next));
							promise.catch(function(er){
								res.emit("error", er);
							});
							promise.then(function(){
								res.end();
							})
							handled= true;
							return false;
						}
					}
				}

			});
			
			!handled?next&&next():null;
		}
	}

	Server.prototype.uses= function(){
		this.$app.use(this._handle2());	
	}


	Util.createProperties(Server,Server.prototype);
}