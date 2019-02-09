var $mod$288 = core.VW.Ecma2015.Utils.module(require('../moment/get-set'));
var $mod$289 = core.VW.Ecma2015.Utils.module(require('../format/format'));
var $mod$290 = core.VW.Ecma2015.Utils.module(require('./aliases'));
var $mod$291 = core.VW.Ecma2015.Utils.module(require('../parse/regex'));
var $mod$292 = core.VW.Ecma2015.Utils.module(require('../parse/token'));
var $mod$293 = core.VW.Ecma2015.Utils.module(require('./constants'));
$mod$289.addFormatToken('s', [
    'ss',
    2
], 0, 'second');
$mod$290.addUnitAlias('second', 's');
$mod$291.addRegexToken('s', $mod$291.match1to2);
$mod$291.addRegexToken('ss', $mod$291.match1to2, $mod$291.match2);
$mod$292.addParseToken([
    's',
    'ss'
], $mod$293.SECOND);
var getSetSecond = $mod$288.makeGetSet('Seconds', false);
exports.getSetSecond = getSetSecond;