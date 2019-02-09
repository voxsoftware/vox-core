var $mod$143 = core.VW.Ecma2015.Utils.module(require('../format/format'));
var $mod$144 = core.VW.Ecma2015.Utils.module(require('../utils/hooks'));
var $mod$145 = core.VW.Ecma2015.Utils.module(require('../utils/is-function'));
$mod$144.hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
$mod$144.hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';
function toString$() {
    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
}
exports.toString = toString$;
function toISOString() {
    var m = this.clone().utc();
    if (0 < m.year() && m.year() <= 9999) {
        if ($mod$145.default(Date.prototype.toISOString)) {
            return this.toDate().toISOString();
        } else {
            return $mod$143.formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        }
    } else {
        return $mod$143.formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
    }
}
exports.toISOString = toISOString;
function format(inputString) {
    if (!inputString) {
        inputString = this.isUtc() ? $mod$144.hooks.defaultFormatUtc : $mod$144.hooks.defaultFormat;
    }
    var output = $mod$143.formatMoment(this, inputString);
    return this.localeData().postformat(output);
}
exports.format = format;