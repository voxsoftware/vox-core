var $mod$282 = core.VW.Ecma2015.Utils.module(require('../format/format'));
var $mod$283 = core.VW.Ecma2015.Utils.module(require('./aliases'));
var $mod$284 = core.VW.Ecma2015.Utils.module(require('../parse/regex'));
var $mod$285 = core.VW.Ecma2015.Utils.module(require('../parse/token'));
var $mod$286 = core.VW.Ecma2015.Utils.module(require('./constants'));
var $mod$287 = core.VW.Ecma2015.Utils.module(require('../utils/to-int'));
$mod$282.addFormatToken('Q', 0, 'Qo', 'quarter');
$mod$283.addUnitAlias('quarter', 'Q');
$mod$284.addRegexToken('Q', $mod$284.match1);
$mod$285.addParseToken('Q', function (input, array) {
    array[$mod$286.MONTH] = ($mod$287.default(input) - 1) * 3;
});
function getSetQuarter(input) {
    return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
}
exports.getSetQuarter = getSetQuarter;