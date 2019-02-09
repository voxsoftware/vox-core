var $mod$46 = core.VW.Ecma2015.Utils.module(require('./from-anything'));
function createLocal(input, format, locale, strict) {
    return $mod$46.createLocalOrUTC(input, format, locale, strict, false);
}
exports.createLocal = createLocal;