var Fs = core.System.IO.Fs;
var Path = require('path');
{
    var Manager = function Manager() {
        Manager.$constructor ? Manager.$constructor.apply(this, arguments) : Manager.$superClass && Manager.$superClass.apply(this, arguments);
    };
    Object.defineProperty(Manager, 'importDirectory', {
        enumerable: false,
        value: function (dir, name) {
            var files, file;
            files = Manager.cachedDirs[dir] || Fs.sync.readdir(dir);
            Manager.cachedDirs[dir] = files;
            for (var i = 0; i < files.length; i++) {
                file = files[i];
                
                if (file.endsWith('.kll')) {
                    Manager.import(Path.join(dir, file), Path.join(name, Path.basename(file, '.kll')));
                }
            }
        }
    });
    Object.defineProperty(Manager, 'import', {
        enumerable: false,
        value: function (file, name) {
            if (Manager.cachedFiles[file])
                return;
            var stream = new core.System.IO.FileStream(file, core.System.IO.FileMode.Open, core.System.IO.FileAccess.Read);
            try {
                var kll = new core.org.kodhe.package.Kll(stream);
                kll.name = name;
                kll.read();
                
                for (var i = 0; i < kll.files.length; i++) {
                    
                    //if(file.indexOf("@babel")>=0)
                    //console.info(Path.join(f.parent || "", f.fileObject.file)    )
                    core.org.kodhe.package.VirtualFile.register(kll.files[i]);
                }
                Manager.cachedFiles[file] = true;
            } catch (e) {
                throw e;
            } finally {
            }
        }
    });
}
Manager.cachedDirs = {};
Manager.cachedFiles = {};
exports.default = Manager;