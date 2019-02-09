var Fs = core.System.IO.Fs;
var $mod$0 = core.VW.Ecma2015.Utils.module(require('path'));
var $mod$1 = core.VW.Ecma2015.Utils.module(require('zlib'));
{
    var Creator = function Creator() {
        Creator.$constructor ? Creator.$constructor.apply(this, arguments) : Creator.$superClass && Creator.$superClass.apply(this, arguments);
    };
    Object.defineProperty(Creator, '$constructor', {
        enumerable: false,
        value: function (dir, out) {
            this.dir = dir;
            this.out = out;
            this.files = [];
            this.open();
        }
    });
    Object.defineProperty(Creator.prototype, 'open', {
        enumerable: false,
        value: function () {
            var out = this.out;
            if (out instanceof core.System.IO.Stream) {
                this.stream = out;
            } else {
                var stream = new core.System.IO.FileStream(out, core.System.IO.FileMode.Truncate, core.System.IO.FileAccess.Write);
                this.stream = stream;
            }
        }
    });
    Object.defineProperty(Creator.prototype, 'compile', {
        enumerable: false,
        value: (typeof regeneratorRuntime != 'object' ? core.VW.Ecma2015.Parser : undefined, function callee$0$0() {
            return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
                while (1)
                    switch (context$1$0.prev = context$1$0.next) {
                    case 0:
                        context$1$0.next = 2;
                        return regeneratorRuntime.awrap(this.process(this.dir));
                    case 2:
                        context$1$0.next = 4;
                        return regeneratorRuntime.awrap(this.end());
                    case 4:
                    case 'end':
                        return context$1$0.stop();
                    }
            }, null, this);
        })
    });
    Object.defineProperty(Creator.prototype, 'end', {
        enumerable: false,
        value: (typeof regeneratorRuntime != 'object' ? core.VW.Ecma2015.Parser : undefined, function callee$0$0() {
            var buf;
            return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
                while (1)
                    switch (context$1$0.prev = context$1$0.next) {
                    case 0:
                        buf = new Buffer(JSON.stringify(this.files));
                        context$1$0.next = 3;
                        return regeneratorRuntime.awrap(this.stream.writeAsync(buf, 0, buf.length));
                    case 3:
                    case 'end':
                        return context$1$0.stop();
                    }
            }, null, this);
        })
    });
    Object.defineProperty(Creator.prototype, 'process', {
        enumerable: false,
        value: (typeof regeneratorRuntime != 'object' ? core.VW.Ecma2015.Parser : undefined, function callee$0$0(path) {
            var files, file, stat, content, gziped, buf, ufile, i;
            return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
                while (1)
                    switch (context$1$0.prev = context$1$0.next) {
                    case 0:
                        context$1$0.next = 2;
                        return regeneratorRuntime.awrap(Fs.async.readdir(path));
                    case 2:
                        files = context$1$0.sent;
                        i = 0;
                    case 4:
                        if (!(i < files.length)) {
                            context$1$0.next = 27;
                            break;
                        }
                        file = files[i];
                        ufile = $mod$0.default.join(path, file);
                        context$1$0.next = 9;
                        return regeneratorRuntime.awrap(Fs.async.stat(ufile));
                    case 9:
                        stat = context$1$0.sent;
                        if (!stat.isDirectory()) {
                            context$1$0.next = 15;
                            break;
                        }
                        context$1$0.next = 13;
                        return regeneratorRuntime.awrap(this.process(ufile));
                    case 13:
                        context$1$0.next = 24;
                        break;
                    case 15:
                        context$1$0.next = 17;
                        return regeneratorRuntime.awrap(Fs.async.readFile(ufile));
                    case 17:
                        content = context$1$0.sent;
                        gziped = $mod$1.default.gzipSync(content, { level: 8 });
                        stat.isdirectory = stat.isDirectory();
                        stat.isfile = stat.isFile();
                        this.files.push({
                            file: $mod$0.default.relative(this.dir, ufile),
                            offset: this.stream.position,
                            length: gziped.length,
                            stat: stat
                        });
                        context$1$0.next = 24;
                        return regeneratorRuntime.awrap(this.stream.writeAsync(gziped, 0, gziped.length));
                    case 24:
                        i++;
                        context$1$0.next = 4;
                        break;
                    case 27:
                    case 'end':
                        return context$1$0.stop();
                    }
            }, null, this);
        })
    });
}
exports.default = Creator;