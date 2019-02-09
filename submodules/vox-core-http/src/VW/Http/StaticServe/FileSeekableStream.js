var $mod$1 = core.VW.Ecma2015.Utils.module(require('stream'));
{
    var FileSeekableStream = function FileSeekableStream() {
        FileSeekableStream.$constructor ? FileSeekableStream.$constructor.apply(this, arguments) : FileSeekableStream.$superClass && FileSeekableStream.$superClass.apply(this, arguments);
    };
    Object.defineProperty(FileSeekableStream, '_read', {
        enumerable: false,
        value: (typeof regeneratorRuntime != 'object' ? core.VW.Ecma2015.Parser : undefined, function callee$0$0() {
            var len, buf, readed;
            return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
                while (1)
                    switch (context$1$0.prev = context$1$0.next) {
                    case 0:
                        if (!this.$length) {
                            this.$length = this.maxPosition !== undefined ? this.maxPosition : this.$stream.length;
                            this.$position = this.$stream.position;
                        }
                        len = Math.min(8192 * 3, this.$length - this.$position);
                        if (!(len == 0)) {
                            context$1$0.next = 4;
                            break;
                        }
                        return context$1$0.abrupt('return', this.push(null));
                    case 4:
                        buf = new Buffer(len);
                        context$1$0.next = 7;
                        return regeneratorRuntime.awrap(this.$stream.readAsync(buf, 0, len));
                    case 7:
                        readed = context$1$0.sent;
                        this.$position += readed;
                        return context$1$0.abrupt('return', this.push(buf));
                    case 10:
                    case 'end':
                        return context$1$0.stop();
                    }
            }, null, this);
        })
    });
    Object.defineProperty(FileSeekableStream, 'createStream', {
        enumerable: false,
        value: function (fileStream) {
            var readable = new $mod$1.Readable();
            readable._read = FileSeekableStream._read;
            readable.$stream = fileStream;
            return readable;
        }
    });
}
exports.default = FileSeekableStream;