var $mod$347 = core.VW.Ecma2015.Utils.module(require('./has-own-prop'));
var keys;
if (Object.keys) {
    keys = Object.keys;
} else {
    keys = function (obj) {
        var i, res = [];
        for (i in obj) {
            if ($mod$347.default(obj, i)) {
                res.push(i);
            }
        }
        return res;
    };
}
exports.default = keys;