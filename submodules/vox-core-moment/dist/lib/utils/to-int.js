var $mod$348 = core.VW.Ecma2015.Utils.module(require('./abs-floor'));
exports.default = function toInt(argumentForCoercion) {
    var coercedNumber = +argumentForCoercion, value = 0;
    if (coercedNumber !== 0 && isFinite(coercedNumber)) {
        value = $mod$348.default(coercedNumber);
    }
    return value;
};