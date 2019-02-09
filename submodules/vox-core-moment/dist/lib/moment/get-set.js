var $mod$149 = core.VW.Ecma2015.Utils.module(require('../units/aliases'));
var $mod$150 = core.VW.Ecma2015.Utils.module(require('../utils/hooks'));
var $mod$151 = core.VW.Ecma2015.Utils.module(require('../utils/is-function'));
function makeGetSet(unit, keepTime) {
    return function (value) {
        if (value != null) {
            set(this, unit, value);
            $mod$150.hooks.updateOffset(this, keepTime);
            return this;
        } else {
            return get(this, unit);
        }
    };
}
exports.makeGetSet = makeGetSet;
function get(mom, unit) {
    return mom.isValid() ? mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
}
exports.get = get;
function set(mom, unit, value) {
    if (mom.isValid()) {
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
    }
}
exports.set = set;
function getSet(units, value) {
    var unit;
    if (typeof units === 'object') {
        for (unit in units) {
            this.set(unit, units[unit]);
        }
    } else {
        units = $mod$149.normalizeUnits(units);
        if ($mod$151.default(this[units])) {
            return this[units](value);
        }
    }
    return this;
}
exports.getSet = getSet;