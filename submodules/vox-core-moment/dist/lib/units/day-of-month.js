var $mod$208 = core.VW.Ecma2015.Utils.module(require('../moment/get-set'));
var $mod$209 = core.VW.Ecma2015.Utils.module(require('../format/format'));
var $mod$210 = core.VW.Ecma2015.Utils.module(require('./aliases'));
var $mod$211 = core.VW.Ecma2015.Utils.module(require('../parse/regex'));
var $mod$212 = core.VW.Ecma2015.Utils.module(require('../parse/token'));
var $mod$213 = core.VW.Ecma2015.Utils.module(require('./constants'));
var $mod$214 = core.VW.Ecma2015.Utils.module(require('../utils/to-int'));
$mod$209.addFormatToken('D', [
    'DD',
    2
], 'Do', 'date');
$mod$210.addUnitAlias('date', 'D');
$mod$211.addRegexToken('D', $mod$211.match1to2);
$mod$211.addRegexToken('DD', $mod$211.match1to2, $mod$211.match2);
$mod$211.addRegexToken('Do', function (isStrict, locale) {
    return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
});
$mod$212.addParseToken([
    'D',
    'DD'
], $mod$213.DATE);
$mod$212.addParseToken('Do', function (input, array) {
    array[$mod$213.DATE] = $mod$214.default(input.match($mod$211.match1to2)[0], 10);
});
var getSetDayOfMonth = $mod$208.makeGetSet('Date', true);
exports.getSetDayOfMonth = getSetDayOfMonth;