var $mod$294 = core.VW.Ecma2015.Utils.module(require('../format/format'));
var $mod$295 = core.VW.Ecma2015.Utils.module(require('../parse/regex'));
var $mod$296 = core.VW.Ecma2015.Utils.module(require('../parse/token'));
var $mod$297 = core.VW.Ecma2015.Utils.module(require('../utils/to-int'));
$mod$294.addFormatToken('X', 0, 0, 'unix');
$mod$294.addFormatToken('x', 0, 0, 'valueOf');
$mod$295.addRegexToken('x', $mod$295.matchSigned);
$mod$295.addRegexToken('X', $mod$295.matchTimestamp);
$mod$296.addParseToken('X', function (input, array, config) {
    config._d = new Date(parseFloat(input, 10) * 1000);
});
$mod$296.addParseToken('x', function (input, array, config) {
    config._d = new Date($mod$297.default(input));
});