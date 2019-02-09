var $mod$2 = core.VW.Ecma2015.Utils.module(require('os'));
var $mod$3 = core.VW.Ecma2015.Utils.module(require('path'));
var Fs = core.System.IO.Fs;
var Creator = core.org.kodhe.package.Creator;
{
    var ModulePackager = function ModulePackager() {
        ModulePackager.$constructor ? ModulePackager.$constructor.apply(this, arguments) : ModulePackager.$superClass && ModulePackager.$superClass.apply(this, arguments);
    };
    ModulePackager.prototype = Object.create(Creator.prototype);
    Object.setPrototypeOf ? Object.setPrototypeOf(ModulePackager, Creator) : ModulePackager.__proto__ = Creator;
    ModulePackager.prototype.constructor = ModulePackager;
    ModulePackager.$super = Creator.prototype;
    ModulePackager.$superClass = Creator;
    Object.defineProperty(ModulePackager.prototype, 'compile', {
        enumerable: false,
        value: (typeof regeneratorRuntime != 'object' ? core.VW.Ecma2015.Parser : undefined, function callee$0$0() {
            var tempdir, uniqid;
            return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
                while (1)
                    switch (context$1$0.prev = context$1$0.next) {
                    case 0:
                        if (!this.originalDir)
                            this.originalDir = this.dir;
                        tempdir = $mod$2.default.tmpdir();
                        if (this.name) {
                            context$1$0.next = 4;
                            break;
                        }
                        throw new core.System.Exception('Debe especificar el nombre del paquete');
                    case 4:
                        ModulePackager._z++;
                        uniqid = Date.now().toString(32) + ModulePackager._z.toString();
                        tempdir = $mod$3.default.join(tempdir, uniqid);
                        if (!Fs.sync.exists(tempdir))
                            Fs.sync.mkdir(tempdir);
                        tempdir = $mod$3.default.join(tempdir, this.name);
                        if (!Fs.sync.exists(tempdir))
                            Fs.sync.mkdir(tempdir);
                        this.dir = tempdir;
                        context$1$0.next = 13;
                        return regeneratorRuntime.awrap(this.copyFiles());
                    case 13:
                    case 'end':
                        return context$1$0.stop();
                    }
            }, null, this);
        })
    });
    Object.defineProperty(ModulePackager.prototype, 'copyFiles', {
        enumerable: false,
        value: (typeof regeneratorRuntime != 'object' ? core.VW.Ecma2015.Parser : undefined, function callee$0$0(src, dest) {
            var files;
            return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
                while (1)
                    switch (context$1$0.prev = context$1$0.next) {
                    case 0:
                        if (src) {
                            context$1$0.next = 5;
                            break;
                        }
                        context$1$0.next = 3;
                        return regeneratorRuntime.awrap(this.copyFiles(this.originalDir, this.dir));
                    case 3:
                        context$1$0.next = 6;
                        break;
                    case 5:
                        files = core.System.IO.Fs;
                    case 6:
                    case 'end':
                        return context$1$0.stop();
                    }
            }, null, this);
        })
    });
}
ModulePackager._z = 0;
exports.default = ModulePackager;