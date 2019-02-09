var $mod$25 = core.VW.Ecma2015.Utils.module(require('../units/aliases'));
var $mod$26 = core.VW.Ecma2015.Utils.module(require('./from-array'));
var $mod$27 = core.VW.Ecma2015.Utils.module(require('../utils/map'));
function configFromObject(config) {
    if (config._d) {
        return;
    }
    var i = $mod$25.normalizeObjectUnits(config._i);
    config._a = $mod$27.default([
        i.year,
        i.month,
        i.day || i.date,
        i.hour,
        i.minute,
        i.second,
        i.millisecond
    ], function (obj) {
        return obj && parseInt(obj, 10);
    });
    $mod$26.configFromArray(config);
}
exports.configFromObject = configFromObject;