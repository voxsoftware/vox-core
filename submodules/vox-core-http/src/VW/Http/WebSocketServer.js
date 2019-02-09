var h = core.VW.Http;
{
    var WebSocketServer = function WebSocketServer() {
        WebSocketServer.$constructor ? WebSocketServer.$constructor.apply(this, arguments) : WebSocketServer.$superClass && WebSocketServer.$superClass.apply(this, arguments);
    };
    Object.defineProperty(WebSocketServer, '$constructor', {
        enumerable: false,
        value: function (server) {
            if (!server instanceof h.Server)
                throw new core.System.ArgumentException('El argumento server debe ser del tipo VW.Http.Server');
            this.server = server;
            this.$funcs = [];
            this.$tasks = [];
            this.$reqs = [];
        }
    });
    Object.defineProperty(WebSocketServer.prototype, 'use', {
        enumerable: false,
        value: function (func) {
            this.$funcs.push(func);
        }
    });
    Object.defineProperty(WebSocketServer.prototype, 'acceptAsync', {
        enumerable: false,
        value: function () {
            var task = core.VW.Task.get();
            this.$tasks.push(task);
            return task;
        }
    });
    Object.defineProperty(WebSocketServer.prototype, 'prepare', {
        enumerable: false,
        value: function () {
            if (this.$prepared)
                return;
            var self = this;
            this.server.$server.on('upgrade', function (req, socket, head) {
                var i = -1, task;
                var args, next = function () {
                        i++;
                        var func = self.$funcs[i], result;
                        if (func) {
                            try {
                                result = func(args);
                                if (typeof result['catch'] === 'function') {
                                    result['catch'](function (err) {
                                        socket.emit('error', e);
                                    });
                                }
                            } catch (e) {
                                socket.emit('error', e);
                            }
                        }
                    };
                args = new h.RequestArgs.fromSocket(req, socket, head);
                self.$reqs.push(args);
                while (task = self.$tasks.shift()) {
                    task.result = self.$reqs.shift();
                    task.finish();
                }
            });
            this.$prepared = true;
        }
    });
    Object.defineProperty(WebSocketServer.prototype, 'stop', {
        enumerable: false,
        value: function () {
            this.server.stop();
        }
    });
    Object.defineProperty(WebSocketServer.prototype, 'listen', {
        enumerable: false,
        value: function () {
            if (!this.server.$prepared)
                throw new core.System.Exception('Debe primero iniciar el Servidor HTTP');
            this.prepare();
        }
    });
}
exports.default = WebSocketServer;