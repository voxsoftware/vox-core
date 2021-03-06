var $mod$73 = core.VW.Ecma2015.Utils.module(require('./create'));
var round = Math.round;
var thresholds = {
    s: 45,
    m: 45,
    h: 22,
    d: 26,
    M: 11
};
function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
    return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
}
function relativeTime(posNegDuration, withoutSuffix, locale) {
    var duration = $mod$73.createDuration(posNegDuration).abs();
    var seconds = round(duration.as('s'));
    var minutes = round(duration.as('m'));
    var hours = round(duration.as('h'));
    var days = round(duration.as('d'));
    var months = round(duration.as('M'));
    var years = round(duration.as('y'));
    var a = seconds < thresholds.s && [
        's',
        seconds
    ] || minutes <= 1 && ['m'] || minutes < thresholds.m && [
        'mm',
        minutes
    ] || hours <= 1 && ['h'] || hours < thresholds.h && [
        'hh',
        hours
    ] || days <= 1 && ['d'] || days < thresholds.d && [
        'dd',
        days
    ] || months <= 1 && ['M'] || months < thresholds.M && [
        'MM',
        months
    ] || years <= 1 && ['y'] || [
        'yy',
        years
    ];
    a[2] = withoutSuffix;
    a[3] = +posNegDuration > 0;
    a[4] = locale;
    return substituteTimeAgo.apply(null, a);
}
function getSetRelativeTimeThreshold(threshold, limit) {
    if (thresholds[threshold] === undefined) {
        return false;
    }
    if (limit === undefined) {
        return thresholds[threshold];
    }
    thresholds[threshold] = limit;
    return true;
}
exports.getSetRelativeTimeThreshold = getSetRelativeTimeThreshold;
function humanize(withSuffix) {
    var locale = this.localeData();
    var output = relativeTime(this, !withSuffix, locale);
    if (withSuffix) {
        output = locale.pastFuture(+this, output);
    }
    return locale.postformat(output);
}
exports.humanize = humanize;