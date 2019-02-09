var $mod$132 = core.VW.Ecma2015.Utils.module(require('./constructor'));
var $mod$133 = core.VW.Ecma2015.Utils.module(require('../units/aliases'));
var $mod$134 = core.VW.Ecma2015.Utils.module(require('../create/local'));
var $mod$135 = core.VW.Ecma2015.Utils.module(require('../utils/is-undefined'));
function isAfter(input, units) {
    var localInput = $mod$132.isMoment(input) ? input : $mod$134.createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = $mod$133.normalizeUnits(!$mod$135.default(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() > localInput.valueOf();
    } else {
        return localInput.valueOf() < this.clone().startOf(units).valueOf();
    }
}
exports.isAfter = isAfter;
function isBefore(input, units) {
    var localInput = $mod$132.isMoment(input) ? input : $mod$134.createLocal(input);
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = $mod$133.normalizeUnits(!$mod$135.default(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() < localInput.valueOf();
    } else {
        return this.clone().endOf(units).valueOf() < localInput.valueOf();
    }
}
exports.isBefore = isBefore;
function isBetween(from, to, units, inclusivity) {
    inclusivity = inclusivity || '()';
    return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) && (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
}
exports.isBetween = isBetween;
function isSame(input, units) {
    var localInput = $mod$132.isMoment(input) ? input : $mod$134.createLocal(input), inputMs;
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = $mod$133.normalizeUnits(units || 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() === localInput.valueOf();
    } else {
        inputMs = localInput.valueOf();
        return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
    }
}
exports.isSame = isSame;
function isSameOrAfter(input, units) {
    return this.isSame(input, units) || this.isAfter(input, units);
}
exports.isSameOrAfter = isSameOrAfter;
function isSameOrBefore(input, units) {
    return this.isSame(input, units) || this.isBefore(input, units);
}
exports.isSameOrBefore = isSameOrBefore;