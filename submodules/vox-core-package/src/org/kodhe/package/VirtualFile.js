var Path = require('path');
var Os = require('os');
var fs = require('fs');
var Zlib = require('zlib');
var FsSystem;
{
    var VirtualFile = function VirtualFile() {
        VirtualFile.$constructor ? VirtualFile.$constructor.apply(this, arguments) : VirtualFile.$superClass && VirtualFile.$superClass.apply(this, arguments);
    };
    Object.defineProperty(VirtualFile, '$constructor', {
        enumerable: false,
        value: function (fileObject, parent, file, stream) {
            this.fileObject = fileObject;
            this.parent = parent;
            this.file = file;
            this.stream = stream;
        }
    });
    Object.defineProperty(VirtualFile.prototype, 'readAll', {
        enumerable: false,
        value: function () {
            var off = this.fileObject.offset;
            this.stream.position = off;
            var buf = Buffer.allocUnsafe(this.fileObject.length);
            this.stream.read(buf, 0, buf.length);
            return Zlib.gunzipSync(buf);
        }
    });
    VirtualFile.prototype.__defineGetter__('virtualPath', function () {
        return this._rpath;
    });
    Object.defineProperty(VirtualFile, 'transformStat', {
        enumerable: false,
        value: function (stat) {
            if (typeof stat.isDirectory !== 'function') {
                stat.isDirectory = function () {
                    return this.isdirectory;
                };
            }
            if (typeof stat.isFile !== 'function') {
                stat.isFile = function () {
                    return this.isfile;
                };
            }
            if (!(stat.mtime instanceof Date)) {
                stat.mtime = new Date(stat.mtime);
                stat.atime = new Date(stat.atime);
                stat.ctime = new Date(stat.ctime);
            }
            return stat;
        }
    });
    Object.defineProperty(VirtualFile.prototype, 'lstat', {
        enumerable: false,
        value: function (self, callback) {
            callback(null, VirtualFile.transformStat(this.fileObject.stat));
        }
    });
    Object.defineProperty(VirtualFile.prototype, 'lstatSync', {
        enumerable: false,
        value: function () {
            return VirtualFile.transformStat(this.fileObject.stat);
        }
    });
    Object.defineProperty(VirtualFile.prototype, 'stat', {
        enumerable: false,
        value: function (self, callback) {
            callback(null, VirtualFile.transformStat(this.fileObject.stat));
        }
    });
    Object.defineProperty(VirtualFile.prototype, 'exists', {
        enumerable: false,
        value: function (callback) {
            callback(true);
        }
    });
    Object.defineProperty(VirtualFile.prototype, 'existsSync', {
        enumerable: false,
        value: function () {
            return true;
        }
    });
    Object.defineProperty(VirtualFile.prototype, 'statSync', {
        enumerable: false,
        value: function () {
            return VirtualFile.transformStat(this.fileObject.stat);
        }
    });
    Object.defineProperty(VirtualFile.prototype, 'fstat', {
        enumerable: false,
        value: function (self, callback) {
            callback(null, VirtualFile.transformStat(this.fileObject.stat));
        }
    });
    Object.defineProperty(VirtualFile.prototype, 'fstatSync', {
        enumerable: false,
        value: function () {
            return VirtualFile.transformStat(this.fileObject.stat);
        }
    });
    Object.defineProperty(VirtualFile.prototype, 'open', {
        enumerable: false,
        value: function (self, options, callback) {
            var num = this.virtualOpen();
            this.openOptions = options;
            return callback(null, num);
        }
    });
    Object.defineProperty(VirtualFile.prototype, 'openSync', {
        enumerable: false,
        value: function (self, options, callback) {
            var num = this.virtualOpen();
            this.openOptions = options;
            return num;
        }
    });
    Object.defineProperty(VirtualFile.prototype, 'close', {
        enumerable: false,
        value: function (self, callback) {
            var num = this.virtualClose();
            delete this.openOptions;
            return callback(null, num);
        }
    });
    Object.defineProperty(VirtualFile.prototype, 'closeSync', {
        enumerable: false,
        value: function (self, callback) {
            var num = this.virtualClose();
            delete this.openOptions;
            return num;
        }
    });
    Object.defineProperty(VirtualFile.prototype, 'virtualOpen', {
        enumerable: false,
        value: function () {
            if (this.num == undefined) {
                this.num = VirtualFile.num = VirtualFile.num === undefined ? -1 : VirtualFile.num - 1;
                VirtualFile.fsystem.handles[this.num] = this;
            }
            return this.num;
        }
    });
    Object.defineProperty(VirtualFile.prototype, 'virtualClose', {
        enumerable: false,
        value: function () {
            delete this.cachedData;
            VirtualFile.fsystem.handles[this.num] = null;
            this.num = undefined;
        }
    });
    Object.defineProperty(VirtualFile.prototype, 'read', {
        enumerable: false,
        value: function () {
            return this.virtualRead.apply(this, Array.prototype.slice.call(arguments, 1));
        }
    });
    Object.defineProperty(VirtualFile.prototype, 'readSync', {
        enumerable: false,
        value: function () {
            return this.virtualRead.apply(this, Array.prototype.slice.call(arguments, 1));
        }
    });
    Object.defineProperty(VirtualFile.prototype, 'write', {
        enumerable: false,
        value: function () {
            throw new core.System.NotImplementedException();
        }
    });
    Object.defineProperty(VirtualFile.prototype, 'writeSync', {
        enumerable: false,
        value: function () {
            throw new core.System.NotImplementedException();
        }
    });
    Object.defineProperty(VirtualFile.prototype, 'readdir', {
        enumerable: false,
        value: function () {
            if (!this.fileObject.stat.isdirectory) {
                var e = new core.System.Exception('Invalid operation. Not a directory');
                e.code = 'ENOENT';
                throw e;
            }
            throw new core.System.NotImplementedException();
        }
    });
    Object.defineProperty(VirtualFile.prototype, 'readdirSync', {
        enumerable: false,
        value: function () {
            if (!this.fileObject.stat.isdirectory) {
                var e = new core.System.Exception('Invalid operation. Not a directory');
                e.code = 'ENOENT';
                throw e;
            }
            throw new core.System.NotImplementedException();
        }
    });
    Object.defineProperty(VirtualFile.prototype, 'readFileSync', {
        enumerable: false,
        value: function (self, encoding) {
            return this.readFile(self, encoding);
        }
    });
    Object.defineProperty(VirtualFile.prototype, 'readFile', {
        enumerable: false,
        value: function (self, encoding, callback) {
            var options = {};
            if (typeof encoding == 'object') {
                options = encoding || {};
                encoding = options.encoding;
            }
            try {
                self = this;
                this.openOptions = options;
                var r = this.virtualRead(undefined, 0, this.fileObject.stat.size, 0);
                if (encoding) {
                    r = r.toString(encoding);
                    delete self.openOptions;
                    return callback ? callback(null, r) : r;
                }
            } catch (er) {
                delete self.openOptions;
                if (callback)
                    return callback(er);
                throw er;
            }
        }
    });
    Object.defineProperty(VirtualFile.prototype, 'virtualRead', {
        enumerable: false,
        value: function (buffer, offset, length, position, callback) {
            position = position || 0;
            if (this.fileObject.stat.size < length || this.fileObject.stat.size < position + length)
                throw new core.System.Exception('Invalid length');
            if (!this.cachedData) {
                this.cachedData = this.readAll();
            }
            var r;
            if (buffer === undefined)
                r = this.cachedData.slice(position, position + length);
            else
                r = this.cachedData.copy(buffer, offset, position, position + length);
            if (typeof callback == 'function') {
                callback(null, r);
                return;
            }
            return r;
        }
    });
    Object.defineProperty(VirtualFile, 'getProtocol', {
        enumerable: false,
        value: function (file) {
            if (VirtualFile.protocols) {
                for (var id in VirtualFile.protocols) {
                    if (file.length > id.length && file.substring(0, id.length) == id) {
                        return VirtualFile.protocols[id];
                    }
                }
            }
        }
    });
    Object.defineProperty(VirtualFile, 'getFileFromProtocol', {
        enumerable: false,
        value: function (file, options) {
            var proc = VirtualFile.getProtocol(file);
            if (proc) {
                return proc.get(file, options);
            }
        }
    });
    Object.defineProperty(VirtualFile, 'addProtocol', {
        enumerable: false,
        value: function (id, protocol) {
            VirtualFile.protocols = VirtualFile.protocols || {};
            VirtualFile.protocols[id] = protocol;
        }
    });
    Object.defineProperty(VirtualFile, 'removeProtocol', {
        enumerable: false,
        value: function (id) {
            delete VirtualFile.protocols[id];
        }
    });
    Object.defineProperty(VirtualFile, 'register', {
        enumerable: false,
        value: function (virtualFile) {
            var absoluto = Path.isAbsolute(virtualFile.parent);
            var path, base, f;
            base = Os.platform() == 'win32' ? 'C:\\HDD$vox-core\\node_modules' : '/HDD$vox-core/node_modules';
            f = Path.normalize(virtualFile.fileObject.file);
            if (absoluto)
                path = Path.join(virtualFile.parent, f);
            else
                path = Path.join(base, virtualFile.parent, f);
            VirtualFile.fsystem.files.push(path);
            VirtualFile.fsystem.filesByPath[path] = virtualFile;
            virtualFile._rpath = path;
        }
    });
}
VirtualFile.fsystem = {};
VirtualFile.fsystem.files = [];
VirtualFile.fsystem.filesByPath = {};
VirtualFile.fsystem.handles = {};
var Module = require('module').Module;
var copias = { _resolveFilename: Module._resolveFilename.bind(Module) };
var bestFile = function (file1, file2, parent) {
    if (!file2 || (parent && parent.filename && parent.filename.indexOf('HDD$vox-core') >= 0))
        return file1;
    var h1 = file1.lastIndexOf('node_modules');
    var h2 = file2.lastIndexOf('node_modules');
    var p1, p2;
    if (h1 >= 0 && h2 >= 0) {
        p1 = file1.substring(h1).split('/');
        p2 = file2.substring(h2).split('/');
        if (p2[1] == p1[1])
            return file2;
    }
    return file1;
};
Module._resolveFilename = function (request, parent, isMain) {
    var er, possibleFile;
    try {
        var file = copias._resolveFilename(request, parent, isMain);
        possibleFile = file;
    } catch (e) {
        er = e;
    }
    var virtual, f, data, fi, doble, time = 0, original = request, co;
    while (time < 3) {
        time++;
        request = original;
        if (!Path.isAbsolute(request)) {
            if (request.startsWith('.')) {
                if (!parent || !parent.filename)
                    request = Path.resolve(request);
                else
                    request = Path.resolve(Path.dirname(parent.filename), request);
                time = 3;
            } else {
                if (time == 1) {
                    request = Path.join(Os.platform() == 'win32' ? 'C:\\HDD$vox-core/node_modules' : '/HDD$vox-core/node_modules', request);
                    doble = true;
                } else if (time == 2) {
                    doble = false;
                    if (parent && parent.filename)
                        request = Path.join(Path.dirname(parent.filename), 'node_modules', original);
                    else
                        break;
                } else if (time == 3) {
                    break;
                }
            }
        }
        f = Path.normalize(request);
        virtual = VirtualFile.fsystem.files.indexOf(f);
        if (virtual < 0) {
            f = Path.normalize(Path.join(request, 'package.json'));
            virtual = VirtualFile.fsystem.files.indexOf(f);
            if (virtual >= 0) {
                data = fs.readFileSync(f, 'utf8');
                data = JSON.parse(data);
                virtual = -1;
                if (data.main) {
                    f = Path.resolve(request, data.main);
                    virtual = VirtualFile.fsystem.files.indexOf(f);
                    co = f;
                    if (virtual < 0) {
                        for (var id in require.extensions) {
                            f = co + id;
                            virtual = VirtualFile.fsystem.files.indexOf(f);
                            if (virtual >= 0)
                                break;
                        }
                    }
                }
            }
        }
        if (virtual < 0) {
            for (var id in require.extensions) {
                f = request + id;
                virtual = VirtualFile.fsystem.files.indexOf(f);
                if (virtual >= 0)
                    break;
            }
        }
        if (virtual < 0) {
            for (var id in require.extensions) {
                f = Path.normalize(Path.join(request, 'index' + id));
                virtual = VirtualFile.fsystem.files.indexOf(f);
                if (virtual >= 0)
                    break;
            }
        }
        if (virtual >= 0) {
            return bestFile(f, possibleFile, parent);
        }
    }
    if (possibleFile)
        return possibleFile;
    throw er;
};
exports.default = VirtualFile;
