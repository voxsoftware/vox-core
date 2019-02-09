var fs = require('fs');
var fs1 = {};
for (var id in fs) {
    if (typeof fs[id] == 'function')
        fs1[id] = fs[id];
}
{
    var VirtualFileSystem = function VirtualFileSystem() {
        VirtualFileSystem.$constructor ? VirtualFileSystem.$constructor.apply(this, arguments) : VirtualFileSystem.$superClass && VirtualFileSystem.$superClass.apply(this, arguments);
    };
    Object.defineProperty(VirtualFileSystem.prototype, 'chown', {
        enumerable: false,
        value: function (path) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path];
            if (file) {
                return file.chown.apply(file, arguments);
            }
            return fs1.chown.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'chownSync', {
        enumerable: false,
        value: function (path) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.handles[path];
            if (file) {
                return file.chownSync.apply(file, arguments);
            }
            return fs1.chownSync.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'close', {
        enumerable: false,
        value: function (fd) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.handles[fd];
            if (file) {
                return file.close.apply(file, arguments);
            }
            return fs1.close.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'closeSync', {
        enumerable: false,
        value: function (fd) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.handles[fd];
            if (file) {
                return file.closeSync.apply(file, arguments);
            }
            return fs1.closeSync.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'copyFile', {
        enumerable: false,
        value: function (path1, path2) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path1];
            if (!file) {
                file = core.org.kodhe.package.VirtualFile.getFileFromProtocol(path1);
            }
            if (file) {
                return file.copyFile.apply(file, arguments);
            }
            return fs1.copyFile.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'copyFileSync', {
        enumerable: false,
        value: function (path1, path2) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path1];
            if (!file) {
                file = core.org.kodhe.package.VirtualFile.getFileFromProtocol(path1);
            }
            if (file) {
                return file.copyFileSync.apply(file, arguments);
            }
            return fs1.copyFileSync.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'exists', {
        enumerable: false,
        value: function (path1) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path1];
            if (!file) {
                file = core.org.kodhe.package.VirtualFile.getFileFromProtocol(path1);
            }
            if (file) {
                return file.exists.apply(file, arguments);
            }
            return fs1.exists.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'existsSync', {
        enumerable: false,
        value: function (path1) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path1];
            if (!file) {
                file = core.org.kodhe.package.VirtualFile.getFileFromProtocol(path1);
            }
            if (file) {
                return file.existsSync.apply(file, arguments);
            }
            return fs1.existsSync.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'fchmod', {
        enumerable: false,
        value: function (fd) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.handles[fd];
            if (file) {
                return file.fchmod.apply(file, arguments);
            }
            return fs1.fchmod.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'fchmodSync', {
        enumerable: false,
        value: function (fd) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.handles[fd];
            if (file) {
                return file.fchmodSync.apply(file, arguments);
            }
            return fs1.fchmodSync.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'fchown', {
        enumerable: false,
        value: function (fd) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.handles[fd];
            if (file) {
                return file.fchown.apply(file, arguments);
            }
            return fs1.fchown.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'fchownSync', {
        enumerable: false,
        value: function (fd) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.handles[fd];
            if (file) {
                return file.fchownSync.apply(file, arguments);
            }
            return fs1.fchownSync.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'fdatasync', {
        enumerable: false,
        value: function (fd) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.handles[fd];
            if (file) {
                return file.fdatasync.apply(file, arguments);
            }
            return fs1.fdatasync.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'fdatasyncSync', {
        enumerable: false,
        value: function (fd) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.handles[fd];
            if (file) {
                return file.fdatasyncSync.apply(file, arguments);
            }
            return fs1.fdatasyncSync.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'fstat', {
        enumerable: false,
        value: function (fd) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.handles[fd];
            if (file) {
                return file.fstat.apply(file, arguments);
            }
            return fs1.fstat.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'fstatSync', {
        enumerable: false,
        value: function (fd) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.handles[fd];
            if (file) {
                return file.fstatSync.apply(file, arguments);
            }
            return fs1.fstatSync.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'fsync', {
        enumerable: false,
        value: function (fd) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.handles[fd];
            if (file) {
                return file.fsync.apply(file, arguments);
            }
            return fs1.fsync.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'fsyncSync', {
        enumerable: false,
        value: function (fd) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.handles[fd];
            if (file) {
                return file.fsyncSync.apply(file, arguments);
            }
            return fs1.fsyncSync.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'ftruncate', {
        enumerable: false,
        value: function (fd) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.handles[fd];
            if (file) {
                return file.ftruncate.apply(file, arguments);
            }
            return fs1.ftruncate.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'ftruncateSync', {
        enumerable: false,
        value: function (fd) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.handles[fd];
            if (file) {
                return file.ftruncateSync.apply(file, arguments);
            }
            return fs1.ftruncateSync.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'futimes', {
        enumerable: false,
        value: function (fd) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.handles[fd];
            if (file) {
                return file.futimes.apply(file, arguments);
            }
            return fs1.futimes.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'futimesSync', {
        enumerable: false,
        value: function (fd) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.handles[fd];
            if (file) {
                return file.futimesSync.apply(file, arguments);
            }
            return fs1.futimesSync.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'lchmod', {
        enumerable: false,
        value: function (path) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path];
            if (!file) {
                file = core.org.kodhe.package.VirtualFile.getFileFromProtocol(path);
            }
            if (file) {
                return file.lchmod.apply(file, arguments);
            }
            return fs1.lchmod.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'lchmodSync', {
        enumerable: false,
        value: function (path) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path];
            if (!file) {
                file = core.org.kodhe.package.VirtualFile.getFileFromProtocol(path);
            }
            if (file) {
                return file.flchmodSync.apply(file, arguments);
            }
            return fs1.flchmodSync.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'lchown', {
        enumerable: false,
        value: function (path) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path];
            if (!file) {
                file = core.org.kodhe.package.VirtualFile.getFileFromProtocol(path1);
            }
            if (file) {
                return file.lchown.apply(file, arguments);
            }
            return fs1.lchown.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'lchownSync', {
        enumerable: false,
        value: function (path) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path];
            if (!file) {
                file = core.org.kodhe.package.VirtualFile.getFileFromProtocol(path);
            }
            if (file) {
                return file.lchownSync.apply(file, arguments);
            }
            return fs1.lchownSync.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'link', {
        enumerable: false,
        value: function (path) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path];
            if (!file) {
                file = core.org.kodhe.package.VirtualFile.getFileFromProtocol(path);
            }
            if (file) {
                return file.link.apply(file, arguments);
            }
            return fs1.link.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'linkSync', {
        enumerable: false,
        value: function (path) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path];
            if (!file) {
                file = core.org.kodhe.package.VirtualFile.getFileFromProtocol(path);
            }
            if (file) {
                return file.linkSync.apply(file, arguments);
            }
            return fs1.linkSync.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'lstat', {
        enumerable: false,
        value: function (path) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path];
            if (!file) {
                file = core.org.kodhe.package.VirtualFile.getFileFromProtocol(path);
            }
            if (file) {
                return file.lstat.apply(file, arguments);
            }
            return fs1.lstat.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'lstatSync', {
        enumerable: false,
        value: function (path) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path];
            if (!file) {
                file = core.org.kodhe.package.VirtualFile.getFileFromProtocol(path);
            }
            if (file) {
                return file.lstatSync.apply(file, arguments);
            }
            return fs1.lstatSync.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'read', {
        enumerable: false,
        value: function (fd) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.handles[fd];
            if (file) {
                return file.read.apply(file, arguments);
            }
            return fs1.read.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'readSync', {
        enumerable: false,
        value: function (fd) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.handles[fd];
            if (file) {
                return file.readSync.apply(file, arguments);
            }
            return fs1.readSync.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'readdir', {
        enumerable: false,
        value: function (path) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path];
            if (file) {
                return file.readdir.apply(file, arguments);
            }
            return fs1.readdir.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'readdirSync', {
        enumerable: false,
        value: function (path) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path];
            if (!file) {
                file = core.org.kodhe.package.VirtualFile.getFileFromProtocol(path);
            }
            if (file) {
                return file.readdirSync.apply(file, arguments);
            }
            return fs1.readdirSync.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'readFile', {
        enumerable: false,
        value: function (path) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path];
            if (!file) {
                file = core.org.kodhe.package.VirtualFile.getFileFromProtocol(path);
            }
            if (file) {
                return file.readFile.apply(file, arguments);
            }
            return fs1.readFile.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'readFileSync', {
        enumerable: false,
        value: function (path) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path];
            if (!file) {
                file = core.org.kodhe.package.VirtualFile.getFileFromProtocol(path);
            }
            if (file) {
                return file.readFileSync.apply(file, arguments);
            }
            return fs1.readFileSync.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'readLink', {
        enumerable: false,
        value: function (path) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path];
            if (!file) {
                file = core.org.kodhe.package.VirtualFile.getFileFromProtocol(path);
            }
            if (file) {
                return file.readLink.apply(file, arguments);
            }
            return fs1.readLink.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'readLinkSync', {
        enumerable: false,
        value: function (path) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path];
            if (!file) {
                file = core.org.kodhe.package.VirtualFile.getFileFromProtocol(path);
            }
            if (file) {
                return file.readLinkSync.apply(file, arguments);
            }
            return fs1.readLinkSync.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'rename', {
        enumerable: false,
        value: function (path) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path];
            if (!file) {
                file = core.org.kodhe.package.VirtualFile.getFileFromProtocol(path);
            }
            if (file) {
                return file.rename.apply(file, arguments);
            }
            return fs1.rename.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'renameSync', {
        enumerable: false,
        value: function (path) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path];
            if (!file) {
                file = core.org.kodhe.package.VirtualFile.getFileFromProtocol(path);
            }
            if (file) {
                return file.renameSync.apply(file, arguments);
            }
            return fs1.renameSync.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'rmdir', {
        enumerable: false,
        value: function (path) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path];
            if (!file) {
                file = core.org.kodhe.package.VirtualFile.getFileFromProtocol(path);
            }
            if (file) {
                return file.rmdir.apply(file, arguments);
            }
            return fs1.rmdir.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'rmdirSync', {
        enumerable: false,
        value: function (path) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path];
            if (!file) {
                file = core.org.kodhe.package.VirtualFile.getFileFromProtocol(path);
            }
            if (file) {
                return file.rmdirSync.apply(file, arguments);
            }
            return fs1.rmdirSync.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'symlink', {
        enumerable: false,
        value: function (path) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path];
            if (!file) {
                file = core.org.kodhe.package.VirtualFile.getFileFromProtocol(path);
            }
            if (file) {
                return file.symlink.apply(file, arguments);
            }
            return fs1.symlink.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'symlinkSync', {
        enumerable: false,
        value: function (path) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path];
            if (!file) {
                file = core.org.kodhe.package.VirtualFile.getFileFromProtocol(path);
            }
            if (file) {
                return file.symlinkSync.apply(file, arguments);
            }
            return fs1.symlinkSync.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'truncate', {
        enumerable: false,
        value: function (path) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path];
            if (!file) {
                file = core.org.kodhe.package.VirtualFile.getFileFromProtocol(path);
            }
            if (file) {
                return file.truncate.apply(file, arguments);
            }
            return fs1.truncate.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'truncateSync', {
        enumerable: false,
        value: function (path) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path];
            if (!file) {
                file = core.org.kodhe.package.VirtualFile.getFileFromProtocol(path);
            }
            if (file) {
                return file.truncateSync.apply(file, arguments);
            }
            return fs1.truncateSync.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'unlink', {
        enumerable: false,
        value: function (path) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path];
            if (!file) {
                file = core.org.kodhe.package.VirtualFile.getFileFromProtocol(path);
            }
            if (file) {
                return file.unlink.apply(file, arguments);
            }
            return fs1.unlink.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'unlinkSync', {
        enumerable: false,
        value: function (path) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path];
            if (!file) {
                file = core.org.kodhe.package.VirtualFile.getFileFromProtocol(path);
            }
            if (file) {
                return file.unlinkSync.apply(file, arguments);
            }
            return fs1.unlinkSync.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'utimes', {
        enumerable: false,
        value: function (path) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path];
            if (!file) {
                file = core.org.kodhe.package.VirtualFile.getFileFromProtocol(path);
            }
            if (file) {
                return file.utimes.apply(file, arguments);
            }
            return fs1.utimes.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'utimesSync', {
        enumerable: false,
        value: function (path) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.filesByPath[path];
            if (!file) {
                file = core.org.kodhe.package.VirtualFile.getFileFromProtocol(path);
            }
            if (file) {
                return file.utimesSync.apply(file, arguments);
            }
            return fs1.utimesSync.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'write', {
        enumerable: false,
        value: function (fd) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.handles[fd];
            if (file) {
                return file.write.apply(file, arguments);
            }
            return fs1.write.apply(fs, arguments);
        }
    });
    Object.defineProperty(VirtualFileSystem.prototype, 'writeSync', {
        enumerable: false,
        value: function (fd) {
            var file = core.org.kodhe.package.VirtualFile.fsystem.handles[fd];
            if (file) {
                return file.writeSync.apply(file, arguments);
            }
            return fs1.writeSync.apply(fs, arguments);
        }
    });
}
var vfs = VirtualFileSystem.prototype;
var keys = Object.getOwnPropertyNames(vfs);
for (var i = 0; i < keys.length; i++) {
    var id = keys[i];
    if (fs[id] && typeof fs[id] == 'function' && typeof vfs[id] == 'function')
        fs[id] = vfs[id];
}
exports.default = VirtualFileSystem;