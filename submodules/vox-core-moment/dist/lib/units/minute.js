var $mod$248 = core.VW.Ecma2015.Utils.module(require('../moment/get-set'));
var $mod$249 = core.VW.Ecma2015.Utils.module(require('../format/format'));
var $mod$250 = core.VW.Ecma2015.Utils.module(require('./aliases'));
var $mod$251 = core.VW.Ecma2015.Utils.module(require('../parse/regex'));
var $mod$252 = core.VW.Ecma2015.Utils.module(require('../parse/token'));
var $mod$253 = core.VW.Ecma2015.Utils.module(require('./constants'));
$mod$249.addFormatToken('m', [
    'mm',
    2
], 0, 'minute');
$mod$250.addUnitAlias('minute', 'm');
$mod$251.addRegexToken('m', $mod$251.match1to2);
$mod$251.addRegexToken('mm', $mod$251.match1to2, $mod$251.match2);
$mod$252.addParseToken([
    'm',
    'mm'
], $mod$253.MINUTE);
var getSetMinute = $mod$248.makeGetSet('Minutes', false);
exports.getSetMinute = getSetMinute;