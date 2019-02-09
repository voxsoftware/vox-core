var $mod$59 = core.VW.Ecma2015.Utils.module(require('../units/aliases'));
var $mod$60 = core.VW.Ecma2015.Utils.module(require('../locale/locales'));
function Duration(duration) {
    var normalizedInput = $mod$59.normalizeObjectUnits(duration), years = normalizedInput.year || 0, quarters = normalizedInput.quarter || 0, months = normalizedInput.month || 0, weeks = normalizedInput.week || 0, days = normalizedInput.day || 0, hours = normalizedInput.hour || 0, minutes = normalizedInput.minute || 0, seconds = normalizedInput.second || 0, milliseconds = normalizedInput.millisecond || 0;
    this._milliseconds = +milliseconds + seconds * 1000 + minutes * 60000 + hours * 1000 * 60 * 60;
    this._days = +days + weeks * 7;
    this._months = +months + quarters * 3 + years * 12;
    this._data = {};
    this._locale = $mod$60.getLocale();
    this._bubble();
}
exports.Duration = Duration;
function isDuration(obj) {
    return obj instanceof Duration;
}
exports.isDuration = isDuration;