var $mod$47 = core.VW.Ecma2015.Utils.module(require('./from-anything'));
function createUTC(input, format, locale, strict) {
    return $mod$47.createLocalOrUTC(input, format, locale, strict, true).utc();
}
exports.createUTC = createUTC;