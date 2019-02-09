var $mod$241 = core.VW.Ecma2015.Utils.module(require('../moment/get-set'));
var $mod$242 = core.VW.Ecma2015.Utils.module(require('../format/format'));
var $mod$243 = core.VW.Ecma2015.Utils.module(require('./aliases'));
var $mod$244 = core.VW.Ecma2015.Utils.module(require('../parse/regex'));
var $mod$245 = core.VW.Ecma2015.Utils.module(require('../parse/token'));
var $mod$246 = core.VW.Ecma2015.Utils.module(require('./constants'));
var $mod$247 = core.VW.Ecma2015.Utils.module(require('../utils/to-int'));
$mod$242.addFormatToken('S', 0, 0, function () {
    return ~~(this.millisecond() / 100);
});
$mod$242.addFormatToken(0, [
    'SS',
    2
], 0, function () {
    return ~~(this.millisecond() / 10);
});
$mod$242.addFormatToken(0, [
    'SSS',
    3
], 0, 'millisecond');
$mod$242.addFormatToken(0, [
    'SSSS',
    4
], 0, function () {
    return this.millisecond() * 10;
});
$mod$242.addFormatToken(0, [
    'SSSSS',
    5
], 0, function () {
    return this.millisecond() * 100;
});
$mod$242.addFormatToken(0, [
    'SSSSSS',
    6
], 0, function () {
    return this.millisecond() * 1000;
});
$mod$242.addFormatToken(0, [
    'SSSSSSS',
    7
], 0, function () {
    return this.millisecond() * 10000;
});
$mod$242.addFormatToken(0, [
    'SSSSSSSS',
    8
], 0, function () {
    return this.millisecond() * 100000;
});
$mod$242.addFormatToken(0, [
    'SSSSSSSSS',
    9
], 0, function () {
    return this.millisecond() * 1000000;
});
$mod$243.addUnitAlias('millisecond', 'ms');
$mod$244.addRegexToken('S', $mod$244.match1to3, $mod$244.match1);
$mod$244.addRegexToken('SS', $mod$244.match1to3, $mod$244.match2);
$mod$244.addRegexToken('SSS', $mod$244.match1to3, $mod$244.match3);
var token;
for (token = 'SSSS'; token.length <= 9; token += 'S') {
    $mod$244.addRegexToken(token, $mod$244.matchUnsigned);
}
function parseMs(input, array) {
    array[$mod$246.MILLISECOND] = $mod$247.default(('0.' + input) * 1000);
}
for (token = 'S'; token.length <= 9; token += 'S') {
    $mod$245.addParseToken(token, parseMs);
}
var getSetMillisecond = $mod$241.makeGetSet('Milliseconds', false);
exports.getSetMillisecond = getSetMillisecond;