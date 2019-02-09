var H = core.VW.Http;
{
    var SecureServer = function SecureServer() {
        SecureServer.$constructor ? SecureServer.$constructor.apply(this, arguments) : SecureServer.$superClass && SecureServer.$superClass.apply(this, arguments);
    };
    SecureServer.prototype = Object.create(H.Server.prototype);
    Object.setPrototypeOf ? Object.setPrototypeOf(SecureServer, H.Server) : SecureServer.__proto__ = H.Server;
    SecureServer.prototype.constructor = SecureServer;
    SecureServer.$super = H.Server.prototype;
    SecureServer.$superClass = H.Server;
    Object.defineProperty(SecureServer, '$constructor', {
        enumerable: false,
        value: function (options) {
            this.$secure = true;
            this.$options = options;
            SecureServer.$superClass.call(this);
        }
    });
}
exports.default = SecureServer;