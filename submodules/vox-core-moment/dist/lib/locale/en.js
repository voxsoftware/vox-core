var $mod$87 = core.VW.Ecma2015.Utils.module(require('./prototype'));
var $mod$88 = core.VW.Ecma2015.Utils.module(require('./locales'));
var $mod$89 = core.VW.Ecma2015.Utils.module(require('../utils/to-int'));
$mod$88.getSetGlobalLocale('en', {
    ordinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal: function (number) {
        var b = number % 10, output = $mod$89.default(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
        return number + output;
    }
});