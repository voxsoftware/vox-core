var $mod$74 = core.VW.Ecma2015.Utils.module(require('../utils/abs-floor'));
var abs = Math.abs;
function toISOString() {
    var seconds = abs(this._milliseconds) / 1000;
    var days = abs(this._days);
    var months = abs(this._months);
    var minutes, hours, years;
    minutes = $mod$74.default(seconds / 60);
    hours = $mod$74.default(minutes / 60);
    seconds %= 60;
    minutes %= 60;
    years = $mod$74.default(months / 12);
    months %= 12;
    var Y = years;
    var M = months;
    var D = days;
    var h = hours;
    var m = minutes;
    var s = seconds;
    var total = this.asSeconds();
    if (!total) {
        return 'P0D';
    }
    return (total < 0 ? '-' : '') + 'P' + (Y ? Y + 'Y' : '') + (M ? M + 'M' : '') + (D ? D + 'D' : '') + (h || m || s ? 'T' : '') + (h ? h + 'H' : '') + (m ? m + 'M' : '') + (s ? s + 'S' : '');
}
exports.toISOString = toISOString;