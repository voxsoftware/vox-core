{
    var ServerCookie = function ServerCookie() {
        ServerCookie.$constructor ? ServerCookie.$constructor.apply(this, arguments) : ServerCookie.$superClass && ServerCookie.$superClass.apply(this, arguments);
    };
    Object.defineProperty(ServerCookie, '$constructor', {
        enumerable: false,
        value: function () {
            this.$json = {};
        }
    });
    Object.defineProperty(ServerCookie.prototype, 'set', {
        enumerable: false,
        value: function (name, value) {
            name = name.toLowerCase().trim();
            this.$json[name] = value.toString();
        }
    });
    Object.defineProperty(ServerCookie.prototype, 'get', {
        enumerable: false,
        value: function (name) {
            return this.$json[name];
        }
    });
    Object.defineProperty(ServerCookie.prototype, 'keys', {
        enumerable: false,
        value: function () {
            return Object.keys(this.$json);
        }
    });
    Object.defineProperty(ServerCookie.prototype, 'toStr', {
        enumerable: false,
        value: function (id) {
            return id + '=' + this.$json[id];
        }
    });
    Object.defineProperty(ServerCookie.prototype, 'toString', {
        enumerable: false,
        value: function () {
            var e = [];
            for (var id in this.$json) {
                e.push(this.toStr(id));
            }
            e.push('');
            return e.join('; ');
        }
    });
    Object.defineProperty(ServerCookie, 'fromString', {
        enumerable: false,
        value: function (str) {
            var d = {}, p, p1, p2;
            var items = str.split(';');
            {
                typeof regeneratorRuntime != 'object' ? core.VW.Ecma2015.Parser : undefined;
                var item;
                var $_iterator0 = regeneratorRuntime.values(items), $_normal0 = false, $_err0;
                try {
                    while (true) {
                        var $_step0 = $_iterator0.next();
                        if ($_step0.done) {
                            $_normal0 = true;
                            break;
                        }
                        {
                            item = $_step0.value;
                            if (item) {
                                p = item.indexOf('=');
                                p1 = item.substring(0, p).trim();
                                p2 = item.substring(p + 1).trim();
                                if (p1) {
                                    d[p1] = p2;
                                }
                            }
                        }
                    }
                } catch (e) {
                    $_normal0 = false;
                    $_err0 = e;
                }
                try {
                    if (!$_normal0 && $_iterator0['return']) {
                        $_iterator0['return']();
                    }
                } catch (e) {
                }
                if ($_err0) {
                    throw $_err0;
                }
            }
            var c = new ServerCookie();
            c.$json = d;
            return c;
        }
    });
    Object.defineProperty(ServerCookie.prototype, 'toJSON', {
        enumerable: false,
        value: function () {
            return this.$json;
        }
    });
}
exports.default = ServerCookie;