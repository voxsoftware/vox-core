var $mod$61 = core.VW.Ecma2015.Utils.module(require('./constructor'));
var $mod$62 = core.VW.Ecma2015.Utils.module(require('../utils/to-int'));
var $mod$63 = core.VW.Ecma2015.Utils.module(require('../utils/has-own-prop'));
var $mod$64 = core.VW.Ecma2015.Utils.module(require('../units/constants'));
var $mod$65 = core.VW.Ecma2015.Utils.module(require('../units/offset'));
var $mod$66 = core.VW.Ecma2015.Utils.module(require('../create/local'));
var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/;
var isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;
function createDuration(input, key) {
    var duration = input, match = null, sign, ret, diffRes;
    if ($mod$61.isDuration(input)) {
        duration = {
            ms: input._milliseconds,
            d: input._days,
            M: input._months
        };
    } else if (typeof input === 'number') {
        duration = {};
        if (key) {
            duration[key] = input;
        } else {
            duration.milliseconds = input;
        }
    } else if (!!(match = aspNetRegex.exec(input))) {
        sign = match[1] === '-' ? -1 : 1;
        duration = {
            y: 0,
            d: $mod$62.default(match[$mod$64.DATE]) * sign,
            h: $mod$62.default(match[$mod$64.HOUR]) * sign,
            m: $mod$62.default(match[$mod$64.MINUTE]) * sign,
            s: $mod$62.default(match[$mod$64.SECOND]) * sign,
            ms: $mod$62.default(match[$mod$64.MILLISECOND]) * sign
        };
    } else if (!!(match = isoRegex.exec(input))) {
        sign = match[1] === '-' ? -1 : 1;
        duration = {
            y: parseIso(match[2], sign),
            M: parseIso(match[3], sign),
            w: parseIso(match[4], sign),
            d: parseIso(match[5], sign),
            h: parseIso(match[6], sign),
            m: parseIso(match[7], sign),
            s: parseIso(match[8], sign)
        };
    } else if (duration == null) {
        duration = {};
    } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
        diffRes = momentsDifference($mod$66.createLocal(duration.from), $mod$66.createLocal(duration.to));
        duration = {};
        duration.ms = diffRes.milliseconds;
        duration.M = diffRes.months;
    }
    ret = new $mod$61.Duration(duration);
    if ($mod$61.isDuration(input) && $mod$63.default(input, '_locale')) {
        ret._locale = input._locale;
    }
    return ret;
}
exports.createDuration = createDuration;
createDuration.fn = $mod$61.Duration.prototype;
function parseIso(inp, sign) {
    var res = inp && parseFloat(inp.replace(',', '.'));
    return (isNaN(res) ? 0 : res) * sign;
}
function positiveMomentsDifference(base, other) {
    var res = {
        milliseconds: 0,
        months: 0
    };
    res.months = other.month() - base.month() + (other.year() - base.year()) * 12;
    if (base.clone().add(res.months, 'M').isAfter(other)) {
        --res.months;
    }
    res.milliseconds = +other - +base.clone().add(res.months, 'M');
    return res;
}
function momentsDifference(base, other) {
    var res;
    if (!(base.isValid() && other.isValid())) {
        return {
            milliseconds: 0,
            months: 0
        };
    }
    other = $mod$65.cloneWithOffset(other, base);
    if (base.isBefore(other)) {
        res = positiveMomentsDifference(base, other);
    } else {
        res = positiveMomentsDifference(other, base);
        res.milliseconds = -res.milliseconds;
        res.months = -res.months;
    }
    return res;
}