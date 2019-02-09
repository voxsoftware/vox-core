{
    var HttpVirtualFile = function HttpVirtualFile() {
        HttpVirtualFile.$constructor ? HttpVirtualFile.$constructor.apply(this, arguments) : HttpVirtualFile.$superClass && HttpVirtualFile.$superClass.apply(this, arguments);
    };
    HttpVirtualFile.prototype = Object.create(core.org.kodhe.package.VirtualFile.prototype);
    Object.setPrototypeOf ? Object.setPrototypeOf(HttpVirtualFile, core.org.kodhe.package.VirtualFile) : HttpVirtualFile.__proto__ = core.org.kodhe.package.VirtualFile;
    HttpVirtualFile.prototype.constructor = HttpVirtualFile;
    HttpVirtualFile.$super = core.org.kodhe.package.VirtualFile.prototype;
    HttpVirtualFile.$superClass = core.org.kodhe.package.VirtualFile;
    Object.defineProperty(HttpVirtualFile, '$constructor', {
        enumerable: false,
        value: function (file) {
            this.file = file;
        }
    });
    Object.defineProperty(HttpVirtualFile.prototype, 'readFileSync', {
        enumerable: false,
        value: function () {
            throw new core.System.NotImplementedException();
        }
    });
    Object.defineProperty(HttpVirtualFile.prototype, 'readFile', {
        enumerable: false,
        value: function (self, encoding, callback) {
            var options = {};
            if (typeof encoding == 'object') {
                options = encoding;
                encoding = options.encoding;
            }
            self = this;
            this.openOptions = options;
            this.virtualRead(undefined, 0, undefined, 0).then(function (r) {
                if (encoding)
                    r = r.toString(encoding);
                delete self.openOptions;
                callback(null, r);
            }).catch(function (er) {
                delete self.openOptions;
                callback(er);
            });
        }
    });
    Object.defineProperty(HttpVirtualFile.prototype, 'createReadStream', {
        enumerable: false,
        value: function (self, options) {
            this.getStream = true;
            try {
                var req = this.virtualRead(undefined, 0, undefined, 0);
                return req;
            } catch (e) {
                throw e;
            } finally {
                this.getStream = false;
            }
        }
    });
    Object.defineProperty(HttpVirtualFile.prototype, 'copyFile', {
        enumerable: false,
        value: (typeof regeneratorRuntime != 'object' ? core.VW.Ecma2015.Parser : undefined, function callee$0$0(self, fileOut, callback) {
            var stat, portion, stream, offset, buf;
            return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
                while (1)
                    switch (context$1$0.prev = context$1$0.next) {
                    case 0:
                        context$1$0.next = 2;
                        return regeneratorRuntime.awrap(this._stat());
                    case 2:
                        stat = context$1$0.sent;
                        vw.info('STAT:', stat);
                        portion = Math.min(4 * 1024 * 1024, stat.size);
                        stream = new core.System.IO.FileStream(fileOut, core.System.IO.FileMode.OpenOrCreate, core.System.IO.FileAccess.Write);
                        context$1$0.prev = 6;
                        stream.position = 0;
                        offset = 0;
                    case 9:
                        if (!true) {
                            context$1$0.next = 23;
                            break;
                        }
                        context$1$0.next = 12;
                        return regeneratorRuntime.awrap(this.virtualRead(undefined, 0, Math.min(stat.size - offset, portion), offset));
                    case 12:
                        buf = context$1$0.sent;
                        if (!(buf.length == 0)) {
                            context$1$0.next = 15;
                            break;
                        }
                        return context$1$0.abrupt('break', 23);
                    case 15:
                        vw.info('BUF:', buf);
                        context$1$0.next = 18;
                        return regeneratorRuntime.awrap(stream.writeAsync(buf, 0, buf.length));
                    case 18:
                        offset += buf.length;
                        if (!(this.len <= offset)) {
                            context$1$0.next = 21;
                            break;
                        }
                        return context$1$0.abrupt('break', 23);
                    case 21:
                        context$1$0.next = 9;
                        break;
                    case 23:
                        callback(true);
                        context$1$0.next = 29;
                        break;
                    case 26:
                        context$1$0.prev = 26;
                        context$1$0.t0 = context$1$0['catch'](6);
                        callback(context$1$0.t0);
                    case 29:
                        context$1$0.prev = 29;
                        if (stream) {
                            stream.close();
                        }
                        return context$1$0.finish(29);
                    case 32:
                    case 'end':
                        return context$1$0.stop();
                    }
            }, null, this, [[
                    6,
                    26,
                    29,
                    32
                ]]);
        })
    });
    Object.defineProperty(HttpVirtualFile.prototype, 'stat', {
        enumerable: false,
        value: (typeof regeneratorRuntime != 'object' ? core.VW.Ecma2015.Parser : undefined, function callee$0$0(callback) {
            var info;
            return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
                while (1)
                    switch (context$1$0.prev = context$1$0.next) {
                    case 0:
                        context$1$0.prev = 0;
                        context$1$0.next = 3;
                        return regeneratorRuntime.awrap(this._stat());
                    case 3:
                        info = context$1$0.sent;
                        callback(null, info);
                        context$1$0.next = 10;
                        break;
                    case 7:
                        context$1$0.prev = 7;
                        context$1$0.t0 = context$1$0['catch'](0);
                        callback(context$1$0.t0);
                    case 10:
                    case 'end':
                        return context$1$0.stop();
                    }
            }, null, this, [[
                    0,
                    7
                ]]);
        })
    });
    Object.defineProperty(HttpVirtualFile.prototype, '_stat', {
        enumerable: false,
        value: (typeof regeneratorRuntime != 'object' ? core.VW.Ecma2015.Parser : undefined, function callee$0$0() {
            var d, stat;
            return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
                while (1)
                    switch (context$1$0.prev = context$1$0.next) {
                    case 0:
                        if (!this.$stat) {
                            context$1$0.next = 2;
                            break;
                        }
                        return context$1$0.abrupt('return', this.$stat);
                    case 2:
                        d = Date.now();
                        context$1$0.next = 5;
                        return regeneratorRuntime.awrap(this.virtualRead(undefined, 0, 1, 0));
                    case 5:
                        stat = {
                            'dev': 43,
                            'mode': 438,
                            'nlink': 1,
                            'uid': 1,
                            'gid': 1,
                            'rdev': 0,
                            'blksize': 5120,
                            'ino': 2266601,
                            'size': this.len,
                            'blocks': 5,
                            'atimeMs': d,
                            'mtimeMs': d,
                            'ctimeMs': d,
                            'birthtimeMs': d,
                            'atime': new Date(d),
                            'mtime': new Date(d),
                            'ctime': new Date(d),
                            'birthtime': new Date(d),
                            'isdirectory': false,
                            'isfile': true
                        };
                        return context$1$0.abrupt('return', this.$stat = stat);
                    case 7:
                    case 'end':
                        return context$1$0.stop();
                    }
            }, null, this);
        })
    });
    Object.defineProperty(HttpVirtualFile.prototype, 'virtualRead', {
        enumerable: false,
        value: (typeof regeneratorRuntime != 'object' ? core.VW.Ecma2015.Parser : undefined, function callee$0$0(buffer, offset, length, position, callback) {
            var req, response, buffers, task, len, self, checked, buf, r, id;
            return regeneratorRuntime.async(function callee$0$0$(context$1$0) {
                while (1)
                    switch (context$1$0.prev = context$1$0.next) {
                    case 0:
                        this.openOptions = this.openOptions || {};
                        req = new core.VW.Http.Request(this.file);
                        req.method = this.openOptions.method || 'GET';
                        buffers = [], self = this;
                        len = this.len;
                        task = new core.VW.Task();
                        context$1$0.prev = 6;
                        if (!(len !== undefined && !len)) {
                            context$1$0.next = 9;
                            break;
                        }
                        throw new core.System.Exception('Invalid URI File');
                    case 9:
                        if (this.openOptions.contentType)
                            req.contentType = this.openOptions.contentType;
                        if (this.openOptions.userAgent)
                            req.userAgent = this.openOptions.userAgent;
                        if (this.openOptions.headers) {
                            for (id in this.openOptions.headers) {
                                req.headers[id] = this.openOptions.headers[id];
                            }
                        }
                        req.headers['connection'] = 'keep-alive';
                        req.analizeResponse = false;
                        req.headers['range'] = 'bytes=' + position + '-';
                        if (length != undefined)
                            req.headers['range'] += position + length - 1;
                        req.beginGetResponse();
                        if (!this.getStream) {
                            context$1$0.next = 19;
                            break;
                        }
                        return context$1$0.abrupt('return', req);
                    case 19:
                        req.innerRequest.on('response', function (r) {
                            response = r;
                        });
                        req.innerRequest.on('end', function () {
                            task.finish();
                        });
                        req.innerRequest.on('abort', function () {
                            vw.info('abortd');
                            task.finish();
                        });
                        req.innerRequest.on('data', function (buf) {
                            if (len === undefined && !checked) {
                                len = response.headers['content-length'];
                                if (len !== undefined) {
                                    len = parseInt(len || 0);
                                    self.len = len;
                                }
                            }
                            if (!checked) {
                                if (response.statusCode != 206) {
                                    if (response.statusCode != 200) {
                                        task.exception = 'Invalid status response';
                                        req.innerRequest.abort();
                                        return;
                                    }
                                    if (len != length) {
                                        if (length !== undefined && position != 0) {
                                            task.exception = 'Invalid status response';
                                            req.innerRequest.abort();
                                            return;
                                        }
                                    }
                                }
                                checked = true;
                            }
                            buffers.push(buf);
                        });
                        context$1$0.next = 25;
                        return regeneratorRuntime.awrap(task);
                    case 25:
                        if (buffer == undefined || length === undefined) {
                            r = Buffer.concat(buffers);
                        } else {
                            buf = Buffer.concat(buffers);
                            r = buf.copy(buffer, offset, position, position + length);
                        }
                        if (!(typeof callback == 'function')) {
                            context$1$0.next = 30;
                            break;
                        }
                        callback(null, r);
                        context$1$0.next = 31;
                        break;
                    case 30:
                        return context$1$0.abrupt('return', r);
                    case 31:
                        context$1$0.next = 38;
                        break;
                    case 33:
                        context$1$0.prev = 33;
                        context$1$0.t0 = context$1$0['catch'](6);
                        if (!(typeof callback == 'function')) {
                            context$1$0.next = 37;
                            break;
                        }
                        return context$1$0.abrupt('return', callback(context$1$0.t0));
                    case 37:
                        throw context$1$0.t0;
                    case 38:
                        context$1$0.prev = 38;
                        if (req.innerRequest && req.innerRequest.callback)
                            delete req.innerRequest.callback;
                        return context$1$0.finish(38);
                    case 41:
                    case 'end':
                        return context$1$0.stop();
                    }
            }, null, this, [[
                    6,
                    33,
                    38,
                    41
                ]]);
        })
    });
}
exports.default = HttpVirtualFile;