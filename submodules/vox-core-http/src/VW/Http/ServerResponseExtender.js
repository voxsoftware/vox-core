var $mod$0 = core.VW.Ecma2015.Utils.module(require('http'));
var SR = {
    writeHead: $mod$0.ServerResponse.prototype.writeHead,
    write: $mod$0.ServerResponse.prototype.write,
    'setHeader': $mod$0.ServerResponse.prototype.setHeader
};
{
    var ServerResponseExtender = function ServerResponseExtender() {
        ServerResponseExtender.$constructor ? ServerResponseExtender.$constructor.apply(this, arguments) : ServerResponseExtender.$superClass && ServerResponseExtender.$superClass.apply(this, arguments);
    };
    Object.defineProperty(ServerResponseExtender.prototype, 'setHeader', {
        enumerable: false,
        value: function () {
            var e = { arguments: arguments };
            this.emit('setheader', e);
            if (!e.arguments[0])
                return;
            return SR.setHeader.apply(this, e.arguments);
        }
    });
    Object.defineProperty(ServerResponseExtender.prototype, 'setCookie', {
        enumerable: false,
        value: function (cookie) {
            if (!(cookie instanceof core.VW.Http.ServerCookie)) {
                throw new core.System.Exception('Debe ser un objeto VW.Http.ServerCookie');
            }
            this._cookie = cookie;
            var json = cookie.toJSON();
            for (var id in json) {
                this.setHeader('set-cookie', cookie.toStr(id));
            }
        }
    });
    Object.defineProperty(ServerResponseExtender.prototype, 'writeHead', {
        enumerable: false,
        value: function () {
            var v = SR.writeHead.apply(this, arguments);
            this.emit('headerssent');
            return v;
        }
    });
    
    Object.defineProperty(ServerResponseExtender.prototype, 'getHeaders', {
        enumerable: false,
        value: function () {
            return this._headers;
        }
    });
    
    
    Object.defineProperty(ServerResponseExtender.prototype, 'write', {
        enumerable: false,
        value: function (data) {
            var v = SR.write.apply(this, arguments);
            if (this.emitWrite && data && data.length > 0) {
                if (!Buffer.isBuffer(data))
                    data = new Buffer(data);
                this.emit('data', data);
            }
            if (this.headersSent)
                this.emit('headerssent');
            return v;
        }
    });
}
$mod$0.ServerResponse.prototype.write = ServerResponseExtender.prototype.write;
$mod$0.ServerResponse.prototype.writeHead = ServerResponseExtender.prototype.writeHead;
if(!$mod$0.ServerResponse.prototype.getHeaders)
    $mod$0.ServerResponse.prototype.getHeaders = ServerResponseExtender.prototype.getHeaders;
$mod$0.ServerResponse.prototype.setHeader = ServerResponseExtender.prototype.setHeader;
$mod$0.ServerResponse.prototype.setCookie = ServerResponseExtender.prototype.setCookie;
$mod$0.ServerResponse.prototype.__defineSetter__('cookie', ServerResponseExtender.prototype.setCookie);
exports.default = ServerResponseExtender;