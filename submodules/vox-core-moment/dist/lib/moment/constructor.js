var $mod$136 = core.VW.Ecma2015.Utils.module(require('../utils/hooks'));
var $mod$137 = core.VW.Ecma2015.Utils.module(require('../utils/has-own-prop'));
var $mod$138 = core.VW.Ecma2015.Utils.module(require('../utils/is-undefined'));
var $mod$139 = core.VW.Ecma2015.Utils.module(require('../create/parsing-flags'));
var momentProperties = $mod$136.hooks.momentProperties = [];
function copyConfig(to, from) {
    var i, prop, val;
    if (!$mod$138.default(from._isAMomentObject)) {
        to._isAMomentObject = from._isAMomentObject;
    }
    if (!$mod$138.default(from._i)) {
        to._i = from._i;
    }
    if (!$mod$138.default(from._f)) {
        to._f = from._f;
    }
    if (!$mod$138.default(from._l)) {
        to._l = from._l;
    }
    if (!$mod$138.default(from._strict)) {
        to._strict = from._strict;
    }
    if (!$mod$138.default(from._tzm)) {
        to._tzm = from._tzm;
    }
    if (!$mod$138.default(from._isUTC)) {
        to._isUTC = from._isUTC;
    }
    if (!$mod$138.default(from._offset)) {
        to._offset = from._offset;
    }
    if (!$mod$138.default(from._pf)) {
        to._pf = $mod$139.default(from);
    }
    if (!$mod$138.default(from._locale)) {
        to._locale = from._locale;
    }
    if (momentProperties.length > 0) {
        for (i in momentProperties) {
            prop = momentProperties[i];
            val = from[prop];
            if (!$mod$138.default(val)) {
                to[prop] = val;
            }
        }
    }
    return to;
}
exports.copyConfig = copyConfig;
var updateInProgress = false;
function Moment(config) {
    copyConfig(this, config);
    this._d = new Date(config._d != null ? config._d.getTime() : NaN);
    if (updateInProgress === false) {
        updateInProgress = true;
        $mod$136.hooks.updateOffset(this);
        updateInProgress = false;
    }
}
exports.Moment = Moment;
function isMoment(obj) {
    return obj instanceof Moment || obj != null && obj._isAMomentObject != null;
}
exports.isMoment = isMoment;