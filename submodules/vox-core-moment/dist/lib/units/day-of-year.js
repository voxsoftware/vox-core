var $mod$225 = core.VW.Ecma2015.Utils.module(require('../format/format'));
var $mod$226 = core.VW.Ecma2015.Utils.module(require('./aliases'));
var $mod$227 = core.VW.Ecma2015.Utils.module(require('../parse/regex'));
var $mod$228 = core.VW.Ecma2015.Utils.module(require('./year'));
var $mod$229 = core.VW.Ecma2015.Utils.module(require('../create/date-from-array'));
var $mod$230 = core.VW.Ecma2015.Utils.module(require('../parse/token'));
var $mod$231 = core.VW.Ecma2015.Utils.module(require('../utils/to-int'));
$mod$225.addFormatToken('DDD', [
    'DDDD',
    3
], 'DDDo', 'dayOfYear');
$mod$226.addUnitAlias('dayOfYear', 'DDD');
$mod$227.addRegexToken('DDD', $mod$227.match1to3);
$mod$227.addRegexToken('DDDD', $mod$227.match3);
$mod$230.addParseToken([
    'DDD',
    'DDDD'
], function (input, array, config) {
    config._dayOfYear = $mod$231.default(input);
});
function getSetDayOfYear(input) {
    var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 86400000) + 1;
    return input == null ? dayOfYear : this.add(input - dayOfYear, 'd');
}
exports.getSetDayOfYear = getSetDayOfYear;