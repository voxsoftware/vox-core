var $mod$346 = core.VW.Ecma2015.Utils.module(require('./has-own-prop'));
exports.default = function extend(a, b) {
    for (var i in b) {
        if ($mod$346.default(b, i)) {
            a[i] = b[i];
        }
    }
    if ($mod$346.default(b, 'toString')) {
        a.toString = b.toString;
    }
    if ($mod$346.default(b, 'valueOf')) {
        a.valueOf = b.valueOf;
    }
    return a;
};