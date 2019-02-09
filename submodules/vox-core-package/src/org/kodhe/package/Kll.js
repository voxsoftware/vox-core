var Path = require('path');
{
    var Kll = function Kll() {
        Kll.$constructor ? Kll.$constructor.apply(this, arguments) : Kll.$superClass && Kll.$superClass.apply(this, arguments);
    };
    Object.defineProperty(Kll, '$constructor', {
        enumerable: false,
        value: function (stream) {
            this.stream = stream;
            this.files = [];
        }
    });
    Object.defineProperty(Kll.prototype, 'read', {
        enumerable: false,
        value: function (name) {
            var files;
            if (!name)
                name = this.name || '';
            var stream = this.stream;
            var buf, lbuf, leer, y, p, content, p1, f1;
            leer = Math.min(stream.length, 1024);
            stream.position = stream.length - leer;
            while (true) {
                buf = Buffer.allocUnsafe(leer);
                p1 = stream.position;
                stream.read(buf, 0, leer);
                if (lbuf)
                    buf = Buffer.concat([
                        buf,
                        lbuf
                    ]);
                y = buf.toString().lastIndexOf('[');
                if (y >= 0)
                    break;
                lbuf = buf;
                leer = Math.min(stream.length, 1024);
                p = p1 - leer;
                if (p <= 0)
                    throw new core.System.FormatException();
                stream.position = p;
            }
            if (y >= 0) {
                content = buf.toString().substring(y);
                files = JSON.parse(content);
                for (var i = 0; i < files.length; i++) {
                    f1 = new core.org.kodhe.package.VirtualFile(files[i], name, null, stream);
                    this.files.push(f1);
                }
            }
        }
    });
}
exports.default = Kll;