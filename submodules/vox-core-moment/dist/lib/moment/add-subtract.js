var $mod$122 = core.VW.Ecma2015.Utils.module(require('./get-set'));
var $mod$123 = core.VW.Ecma2015.Utils.module(require('../units/month'));
var $mod$124 = core.VW.Ecma2015.Utils.module(require('../duration/create'));
var $mod$125 = core.VW.Ecma2015.Utils.module(require('../utils/deprecate'));
var $mod$126 = core.VW.Ecma2015.Utils.module(require('../utils/hooks'));
var $mod$127 = core.VW.Ecma2015.Utils.module(require('../utils/abs-round'));
function createAdder(direction, name) {
    return function (val, period) {
        var dur, tmp;
        if (period !== null && !isNaN(+period)) {
            $mod$125.deprecateSimple(name, 'moment().' + name + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
            tmp = val;
            val = period;
            period = tmp;
        }
        val = typeof val === 'string' ? +val : val;
        dur = $mod$124.createDuration(val, period);
        addSubtract(this, dur, direction);
        return this;
    };
}
function addSubtract(mom, duration, isAdding, updateOffset) {
    var milliseconds = duration._milliseconds, days = $mod$127.default(duration._days), months = $mod$127.default(duration._months);
    if (!mom.isValid()) {
        return;
    }
    updateOffset = updateOffset == null ? true : updateOffset;
    if (milliseconds) {
        mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
    }
    if (days) {
        $mod$122.set(mom, 'Date', $mod$122.get(mom, 'Date') + days * isAdding);
    }
    if (months) {
        $mod$123.setMonth(mom, $mod$122.get(mom, 'Month') + months * isAdding);
    }
    if (updateOffset) {
        $mod$126.hooks.updateOffset(mom, days || months);
    }
}
exports.addSubtract = addSubtract;
var add = createAdder(1, 'add');
exports.add = add;
var subtract = createAdder(-1, 'subtract');
exports.subtract = subtract;