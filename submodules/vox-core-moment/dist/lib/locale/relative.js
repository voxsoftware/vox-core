var defaultRelativeTime = {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    m: 'a minute',
    mm: '%d minutes',
    h: 'an hour',
    hh: '%d hours',
    d: 'a day',
    dd: '%d days',
    M: 'a month',
    MM: '%d months',
    y: 'a year',
    yy: '%d years'
};
exports.defaultRelativeTime = defaultRelativeTime;
var $mod$117 = core.VW.Ecma2015.Utils.module(require('../utils/is-function'));
function relativeTime(number, withoutSuffix, string, isFuture) {
    var output = this._relativeTime[string];
    return $mod$117.default(output) ? output(number, withoutSuffix, string, isFuture) : output.replace(/%d/i, number);
}
exports.relativeTime = relativeTime;
function pastFuture(diff, output) {
    var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
    return $mod$117.default(format) ? format(output) : format.replace(/%s/i, output);
}
exports.pastFuture = pastFuture;