{
    var HttpFileSystemProtocol = function HttpFileSystemProtocol() {
        HttpFileSystemProtocol.$constructor ? HttpFileSystemProtocol.$constructor.apply(this, arguments) : HttpFileSystemProtocol.$superClass && HttpFileSystemProtocol.$superClass.apply(this, arguments);
    };
    Object.defineProperty(HttpFileSystemProtocol.prototype, 'get', {
        enumerable: false,
        value: function (file, options) {
            var virtualfile = new core.org.kodhe.httpfilesystem.HttpVirtualFile(file, options);
            return virtualfile;
        }
    });
}
exports.default = HttpFileSystemProtocol;