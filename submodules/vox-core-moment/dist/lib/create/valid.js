var $mod$48 = core.VW.Ecma2015.Utils.module(require('../utils/extend'));
var $mod$49 = core.VW.Ecma2015.Utils.module(require('./utc'));
var $mod$50 = core.VW.Ecma2015.Utils.module(require('../create/parsing-flags'));
var $mod$51 = core.VW.Ecma2015.Utils.module(require('../utils/some'));
function isValid(m) {
    if (m._isValid == null) {
        var flags = $mod$50.default(m);
        var parsedParts = $mod$51.default.call(flags.parsedDateParts, function (i) {
            return i != null;
        });
        m._isValid = !isNaN(m._d.getTime()) && flags.overflow < 0 && !flags.empty && !flags.invalidMonth && !flags.invalidWeekday && !flags.nullInput && !flags.invalidFormat && !flags.userInvalidated && (!flags.meridiem || flags.meridiem && parsedParts);
        if (m._strict) {
            m._isValid = m._isValid && flags.charsLeftOver === 0 && flags.unusedTokens.length === 0 && flags.bigHour === undefined;
        }
    }
    return m._isValid;
}
exports.isValid = isValid;
function createInvalid(flags) {
    var m = $mod$49.createUTC(NaN);
    if (flags != null) {
        $mod$48.default($mod$50.default(m), flags);
    } else {
        $mod$50.default(m).userInvalidated = true;
    }
    return m;
}
exports.createInvalid = createInvalid;