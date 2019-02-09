var $mod$267 = core.VW.Ecma2015.Utils.module(require('../utils/zero-fill'));
var $mod$268 = core.VW.Ecma2015.Utils.module(require('../duration/create'));
var $mod$269 = core.VW.Ecma2015.Utils.module(require('../moment/add-subtract'));
var $mod$270 = core.VW.Ecma2015.Utils.module(require('../moment/constructor'));
var $mod$271 = core.VW.Ecma2015.Utils.module(require('../format/format'));
var $mod$272 = core.VW.Ecma2015.Utils.module(require('../parse/regex'));
var $mod$273 = core.VW.Ecma2015.Utils.module(require('../parse/token'));
var $mod$274 = core.VW.Ecma2015.Utils.module(require('../create/local'));
var $mod$275 = core.VW.Ecma2015.Utils.module(require('../create/from-anything'));
var $mod$276 = core.VW.Ecma2015.Utils.module(require('../create/utc'));
var $mod$277 = core.VW.Ecma2015.Utils.module(require('../utils/is-date'));
var $mod$278 = core.VW.Ecma2015.Utils.module(require('../utils/to-int'));
var $mod$279 = core.VW.Ecma2015.Utils.module(require('../utils/is-undefined'));
var $mod$280 = core.VW.Ecma2015.Utils.module(require('../utils/compare-arrays'));
var $mod$281 = core.VW.Ecma2015.Utils.module(require('../utils/hooks'));
function offset(token, separator) {
    $mod$271.addFormatToken(token, 0, 0, function () {
        var offset = this.utcOffset();
        var sign = '+';
        if (offset < 0) {
            offset = -offset;
            sign = '-';
        }
        return sign + $mod$267.default(~~(offset / 60), 2) + separator + $mod$267.default(~~offset % 60, 2);
    });
}
offset('Z', ':');
offset('ZZ', '');
$mod$272.addRegexToken('Z', $mod$272.matchShortOffset);
$mod$272.addRegexToken('ZZ', $mod$272.matchShortOffset);
$mod$273.addParseToken([
    'Z',
    'ZZ'
], function (input, array, config) {
    config._useUTC = true;
    config._tzm = offsetFromString($mod$272.matchShortOffset, input);
});
var chunkOffset = /([\+\-]|\d\d)/gi;
function offsetFromString(matcher, string) {
    var matches = (string || '').match(matcher) || [];
    var chunk = matches[matches.length - 1] || [];
    var parts = (chunk + '').match(chunkOffset) || [
        '-',
        0,
        0
    ];
    var minutes = +(parts[1] * 60) + $mod$278.default(parts[2]);
    return parts[0] === '+' ? minutes : -minutes;
}
function cloneWithOffset(input, model) {
    var res, diff;
    if (model._isUTC) {
        res = model.clone();
        diff = ($mod$270.isMoment(input) || $mod$277.default(input) ? input.valueOf() : $mod$274.createLocal(input).valueOf()) - res.valueOf();
        res._d.setTime(res._d.valueOf() + diff);
        $mod$281.hooks.updateOffset(res, false);
        return res;
    } else {
        return $mod$274.createLocal(input).local();
    }
}
exports.cloneWithOffset = cloneWithOffset;
function getDateOffset(m) {
    return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
}
$mod$281.hooks.updateOffset = function () {
};
function getSetOffset(input, keepLocalTime) {
    var offset = this._offset || 0, localAdjust;
    if (!this.isValid()) {
        return input != null ? this : NaN;
    }
    if (input != null) {
        if (typeof input === 'string') {
            input = offsetFromString($mod$272.matchShortOffset, input);
        } else if (Math.abs(input) < 16) {
            input = input * 60;
        }
        if (!this._isUTC && keepLocalTime) {
            localAdjust = getDateOffset(this);
        }
        this._offset = input;
        this._isUTC = true;
        if (localAdjust != null) {
            this.add(localAdjust, 'm');
        }
        if (offset !== input) {
            if (!keepLocalTime || this._changeInProgress) {
                $mod$269.addSubtract(this, $mod$268.createDuration(input - offset, 'm'), 1, false);
            } else if (!this._changeInProgress) {
                this._changeInProgress = true;
                $mod$281.hooks.updateOffset(this, true);
                this._changeInProgress = null;
            }
        }
        return this;
    } else {
        return this._isUTC ? offset : getDateOffset(this);
    }
}
exports.getSetOffset = getSetOffset;
function getSetZone(input, keepLocalTime) {
    if (input != null) {
        if (typeof input !== 'string') {
            input = -input;
        }
        this.utcOffset(input, keepLocalTime);
        return this;
    } else {
        return -this.utcOffset();
    }
}
exports.getSetZone = getSetZone;
function setOffsetToUTC(keepLocalTime) {
    return this.utcOffset(0, keepLocalTime);
}
exports.setOffsetToUTC = setOffsetToUTC;
function setOffsetToLocal(keepLocalTime) {
    if (this._isUTC) {
        this.utcOffset(0, keepLocalTime);
        this._isUTC = false;
        if (keepLocalTime) {
            this.subtract(getDateOffset(this), 'm');
        }
    }
    return this;
}
exports.setOffsetToLocal = setOffsetToLocal;
function setOffsetToParsedOffset() {
    if (this._tzm) {
        this.utcOffset(this._tzm);
    } else if (typeof this._i === 'string') {
        this.utcOffset(offsetFromString($mod$272.matchOffset, this._i));
    }
    return this;
}
exports.setOffsetToParsedOffset = setOffsetToParsedOffset;
function hasAlignedHourOffset(input) {
    if (!this.isValid()) {
        return false;
    }
    input = input ? $mod$274.createLocal(input).utcOffset() : 0;
    return (this.utcOffset() - input) % 60 === 0;
}
exports.hasAlignedHourOffset = hasAlignedHourOffset;
function isDaylightSavingTime() {
    return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
exports.isDaylightSavingTime = isDaylightSavingTime;
function isDaylightSavingTimeShifted() {
    if (!$mod$279.default(this._isDSTShifted)) {
        return this._isDSTShifted;
    }
    var c = {};
    $mod$270.copyConfig(c, this);
    c = $mod$275.prepareConfig(c);
    if (c._a) {
        var other = c._isUTC ? $mod$276.createUTC(c._a) : $mod$274.createLocal(c._a);
        this._isDSTShifted = this.isValid() && $mod$280.default(c._a, other.toArray()) > 0;
    } else {
        this._isDSTShifted = false;
    }
    return this._isDSTShifted;
}
exports.isDaylightSavingTimeShifted = isDaylightSavingTimeShifted;
function isLocal() {
    return this.isValid() ? !this._isUTC : false;
}
exports.isLocal = isLocal;
function isUtcOffset() {
    return this.isValid() ? this._isUTC : false;
}
exports.isUtcOffset = isUtcOffset;
function isUtc() {
    return this.isValid() ? this._isUTC && this._offset === 0 : false;
}
exports.isUtc = isUtc;