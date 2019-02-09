var $mod$52 = core.VW.Ecma2015.Utils.module(require('./create'));
function addSubtract(duration, input, value, direction) {
    var other = $mod$52.createDuration(input, value);
    duration._milliseconds += direction * other._milliseconds;
    duration._days += direction * other._days;
    duration._months += direction * other._months;
    return duration._bubble();
}
function add(input, value) {
    return addSubtract(this, input, value, 1);
}
exports.add = add;
function subtract(input, value) {
    return addSubtract(this, input, value, -1);
}
exports.subtract = subtract;