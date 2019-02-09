var $mod$158 = core.VW.Ecma2015.Utils.module(require('../create/local'));
var $mod$159 = core.VW.Ecma2015.Utils.module(require('../create/utc'));
var $mod$160 = core.VW.Ecma2015.Utils.module(require('../create/valid'));
var $mod$161 = core.VW.Ecma2015.Utils.module(require('./constructor'));
var $mod$162 = core.VW.Ecma2015.Utils.module(require('./min-max'));
var $mod$163 = core.VW.Ecma2015.Utils.module(require('./now'));
var $mod$164 = core.VW.Ecma2015.Utils.module(require('./prototype'));
function createUnix(input) {
    return $mod$158.createLocal(input * 1000);
}
function createInZone() {
    return $mod$158.createLocal.apply(null, arguments).parseZone();
}
exports.now = $mod$163.now;
exports.min = $mod$162.min;
exports.max = $mod$162.max;
exports.isMoment = $mod$161.isMoment;
exports.createUTC = $mod$159.createUTC;
exports.createUnix = createUnix;
exports.createLocal = $mod$158.createLocal;
exports.createInZone = createInZone;
exports.createInvalid = $mod$160.createInvalid;
exports.momentPrototype = $mod$164.default;