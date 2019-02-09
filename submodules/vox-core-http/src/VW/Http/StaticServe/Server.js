var $mod$2 = core.VW.Ecma2015.Utils.module(require('path'));
var Fs = core.System.IO.Fs;
var $mod$3 = core.VW.Ecma2015.Utils.module(require('fs'));
var StaticServe = core.VW.Http.StaticServe;
var $mod$4 = core.VW.Ecma2015.Utils.module(require('mime-types'));
var $mod$5 = core.VW.Ecma2015.Utils.module(require('zlib'));
var $mod$6 = core.VW.Ecma2015.Utils.module(require('compressible'));
{
    var Server = function Server() {
        Server.$constructor ? Server.$constructor.apply(this, arguments) : Server.$superClass && Server.$superClass.apply(this, arguments);
    };
    Object.defineProperty(Server, '$constructor', {
        enumerable: false,
        value: function () {
            this.$paths = [];
        }
    });
    Object.defineProperty(Server.prototype, 'addPath', {
        enumerable: false,
        value: function (path) {
            this.$paths.push(path);
        }
    });
    Object.defineProperty(Server.prototype, 'removePath', {
        enumerable: false,
        value: function (path) {
            var index = this.$paths.indexOf(path);
            this.$paths[index] = undefined;
        }
    });
    Object.defineProperty(Server.prototype, 'handle', {
        enumerable: false,
        value: (typeof regeneratorRuntime != 'object' ? core.VW.Ecma2015.Parser : undefined, function callee$0$0(args) {
            var url, path, pathO, i;
            return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
                while (1)
                    switch (context$1$0.prev = context$1$0.next) {
                    case 0:
                        url = args.request.url;
                        i = url.indexOf('?');
                        if (i >= 0)
                            url = url.substring(0, i);
                        i = 0;
                    case 4:
                        if (!(i < this.$paths.length)) {
                            context$1$0.next = 16;
                            break;
                        }
                        pathO = this.$paths[i];
                        if (!pathO) {
                            context$1$0.next = 13;
                            break;
                        }
                        path = $mod$2.default.join(pathO, decodeURI(url));
                        context$1$0.next = 10;
                        return regeneratorRuntime.awrap(Fs.sync.exists(path));
                    case 10:
                        if (!context$1$0.sent) {
                            context$1$0.next = 12;
                            break;
                        }
                        return context$1$0.abrupt('break', 16);
                    case 12:
                        path = undefined;
                    case 13:
                        i++;
                        context$1$0.next = 4;
                        break;
                    case 16:
                        if (path) {
                            context$1$0.next = 20;
                            break;
                        }
                        context$1$0.next = 19;
                        return regeneratorRuntime.awrap(this.error404(args));
                    case 19:
                        return context$1$0.abrupt('return', context$1$0.sent);
                    case 20:
                        context$1$0.next = 22;
                        return regeneratorRuntime.awrap(this.responseFile(path, args));
                    case 22:
                        return context$1$0.abrupt('return', context$1$0.sent);
                    case 23:
                    case 'end':
                        return context$1$0.stop();
                    }
            }, null, this);
        })
    });
    Object.defineProperty(Server.prototype, 'responseFile', {
        enumerable: false,
        value: (typeof regeneratorRuntime != 'object' ? core.VW.Ecma2015.Parser : undefined, function callee$0$0(path, args) {
            var task, modified, stat, mtime2, mtime, modifieddate, range, startByte, endByte, dirOrNot, partial, length, len, gzip, deflate, encoding, mtype, charset, head, id, stream2;
            return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
                while (1)
                    switch (context$1$0.prev = context$1$0.next) {
                    case 0:
                        modified = args.request.headers['if-modified-since'];
                        context$1$0.next = 3;
                        return regeneratorRuntime.awrap(Fs.async.stat(path));
                    case 3:
                        stat = context$1$0.sent;
                        mtime2 = stat.mtime;
                        mtime = mtime2.getTime();
                        if (!modified) {
                            context$1$0.next = 11;
                            break;
                        }
                        modifieddate = new Date(modified);
                        modifieddate = modifieddate.getTime();
                        if (!(modifieddate - mtime < 1000)) {
                            context$1$0.next = 11;
                            break;
                        }
                        return context$1$0.abrupt('return', this.notmodified304(args));
                    case 11:
                        range = args.request.headers['range'];
                        if (range && range.startsWith('bytes=')) {
                            range = range.split('=');
                            if (range.length == 2) {
                                range = range[1].split('-');
                                startByte = range[0] | 0;
                                endByte = range[1] | 0;
                            }
                        }
                        dirOrNot = false;
                        if (!Fs.sync.exists(path)) {
                            dirOrNot = true;
                        }
                        context$1$0.next = 17;
                        return regeneratorRuntime.awrap(Fs.async.stat(path));
                    case 17:
                        stat = context$1$0.sent;
                        if (stat.isDirectory())
                            dirOrNot = true;
                        if (!dirOrNot) {
                            context$1$0.next = 23;
                            break;
                        }
                        args.response.writeHead(403);
                        args.response.end();
                        return context$1$0.abrupt('return');
                    case 23:
                        context$1$0.next = 25;
                        return regeneratorRuntime.awrap(Fs.async.stat(path));
                    case 25:
                        stat = context$1$0.sent;
                        stat.position = 0;
                        context$1$0.prev = 27;
                        partial = startByte > 0 || endByte < stat.size - 1;
                        len = stat.size;
                        if (partial) {
                            stat.position = startByte;
                            if (endByte > 0) {
                                stat.maxPosition = endByte + 1;
                                length = stat.maxPosition - stat.position;
                            } else {
                                length = len - stat.position;
                                stat.maxPosition = len;
                            }
                        } else {
                            length = len;
                        }
                        if (args.request.headers['accept-encoding'] && length > 100) {
                            encoding = args.request.headers['accept-encoding'].toUpperCase();
                            gzip = encoding.indexOf('GZIP') >= 0;
                            deflate = encoding.indexOf('DEFLATE') >= 0;
                        }
                        mtype = this.getMimeType(path);
                        charset = $mod$4.default.charsets.lookup(mtype);
                        head = {
                            'last-modified': mtime2.toGMTString(),
                            'accept-range': 'bytes',
                            'accept-ranges': 'bytes',
                            'content-type': mtype + (charset ? ';Charset=' + charset : ''),
                            'cache-control': 'max-age=1800'
                        };
                        head['ETag'] = mtime2.getTime().toString(16);
                        if (partial) {
                            head['content-range'] = 'bytes ' + stat.position.toString() + '-' + ((stat.maxPosition || length) - 1).toString() + '/' + len.toString();
                        }
                        if (!$mod$6.default(mtype)) {
                            deflate = gzip = false;
                        }
                        if (gzip) {
                            head['content-encoding'] = 'gzip';
                        } else {
                            head['content-length'] = length;
                        }
                        if (this.fixedHeaders) {
                            for (id in this.fixedHeaders) {
                                if (this.fixedHeaders[id] === undefined)
                                    delete head[id];
                                else
                                    head[id] = this.fixedHeaders[id];
                            }
                        }
                        args.response.writeHead(partial ? 206 : 200, head);
                        if(this.getHead)
                            return args.response.end()
                        stream2 = $mod$3.default.createReadStream(path, {
                            start: stat.position,
                            end: stat.maxPosition
                        });
                        if (gzip) {
                            process.env.DEBUG && console.info('streaming with gzip');
                            stream2.pipe($mod$5.default.createGzip()).pipe(args.response);
                        } else {
                            process.env.DEBUG && console.info('streaming without compression');
                            stream2.pipe(args.response);
                        }
                        task = new core.VW.Task();
                        args.response.on('finish', function () {
                            task.finish();
                        });
                        context$1$0.next = 47;
                        return regeneratorRuntime.awrap(task);
                    case 47:
                        context$1$0.next = 52;
                        break;
                    case 49:
                        context$1$0.prev = 49;
                        context$1$0.t0 = context$1$0['catch'](27);
                        throw context$1$0.t0;
                    case 52:
                        context$1$0.prev = 52;
                        return context$1$0.finish(52);
                    case 54:
                    case 'end':
                        return context$1$0.stop();
                    }
            }, null, this, [[
                    27,
                    49,
                    52,
                    54
                ]]);
        })
    });
    Object.defineProperty(Server.prototype, 'getMimeType', {
        enumerable: false,
        value: function (file) {
            return $mod$4.default.lookup($mod$2.default.extname(file)) || 'text/plain';
        }
    });
    Object.defineProperty(Server.prototype, 'serverError500', {
        enumerable: false,
        value: function (args, e) {
            args.response.writeHead(500, { 'Content-type': 'text/plain;charset=utf8' });
            args.response.write(e.message);
            args.response.write('\n' + e.stack);
            args.response.end();
        }
    });
    Object.defineProperty(Server.prototype, 'notmodified304', {
        enumerable: false,
        value: function (args) {
            args.response.writeHead(304, {
                'accept-range': 'bytes',
                'cache-control': 'max-age=1800'
            });
            args.response.end();
        }
    });
    Object.defineProperty(Server.prototype, 'error404', {
        enumerable: false,
        value: function (args) {
            return args.continueAsync();
        }
    });
}
exports.default = Server;