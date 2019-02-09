var request = core.VW.Http.LowLevelRequest;
{
    var Cookie = function Cookie() {
        Cookie.$constructor ? Cookie.$constructor.apply(this, arguments) : Cookie.$superClass && Cookie.$superClass.apply(this, arguments);
    };
    Object.defineProperty(Cookie, '$constructor', {
        enumerable: false,
        value: function () {
            this.$jar = request.jar();
            this.$cookies = [];
        }
    });
    Object.defineProperty(Cookie.prototype, 'add', {
        enumerable: false,
        value: function (key, value) {
            this.$cookies.push(request.cookie('' + key + '=' + value + ''));
        }
    });
    Object.defineProperty(Cookie.prototype, 'getJar', {
        enumerable: false,
        value: function (url) {
            var c;
            while (c = this.$cookies.shift()) {
                this.$jar.setCookie(c, url);
            }
            return this.$jar;
        }
    });
}
exports.default = Cookie;