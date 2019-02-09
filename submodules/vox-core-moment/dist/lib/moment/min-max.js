var $mod$154 = core.VW.Ecma2015.Utils.module(require('../utils/deprecate'));
var $mod$155 = core.VW.Ecma2015.Utils.module(require('../utils/is-array'));
var $mod$156 = core.VW.Ecma2015.Utils.module(require('../create/local'));
var $mod$157 = core.VW.Ecma2015.Utils.module(require('../create/valid'));
var prototypeMin = $mod$154.deprecate('moment().min is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548', function () {
    var other = $mod$156.createLocal.apply(null, arguments);
    if (this.isValid() && other.isValid()) {
        return other < this ? this : other;
    } else {
        return $mod$157.createInvalid();
    }
});
exports.prototypeMin = prototypeMin;
var prototypeMax = $mod$154.deprecate('moment().max is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548', function () {
    var other = $mod$156.createLocal.apply(null, arguments);
    if (this.isValid() && other.isValid()) {
        return other > this ? this : other;
    } else {
        return $mod$157.createInvalid();
    }
});
exports.prototypeMax = prototypeMax;
function pickBy(fn, moments) {
    var res, i;
    if (moments.length === 1 && $mod$155.default(moments[0])) {
        moments = moments[0];
    }
    if (!moments.length) {
        return $mod$156.createLocal();
    }
    res = moments[0];
    for (i = 1; i < moments.length; ++i) {
        if (!moments[i].isValid() || moments[i][fn](res)) {
            res = moments[i];
        }
    }
    return res;
}
function min() {
    var args = [].slice.call(arguments, 0);
    return pickBy('isBefore', args);
}
exports.min = min;
function max() {
    var args = [].slice.call(arguments, 0);
    return pickBy('isAfter', args);
}
exports.max = max;