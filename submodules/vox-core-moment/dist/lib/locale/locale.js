var $mod$92 = core.VW.Ecma2015.Utils.module(require('./prototype'));
var $mod$93 = core.VW.Ecma2015.Utils.module(require('./locales'));
var $mod$94 = core.VW.Ecma2015.Utils.module(require('./lists'));
exports.getSetGlobalLocale = $mod$93.getSetGlobalLocale;
exports.defineLocale = $mod$93.defineLocale;
exports.updateLocale = $mod$93.updateLocale;
exports.getLocale = $mod$93.getLocale;
exports.listLocales = $mod$93.listLocales;
exports.listMonths = $mod$94.listMonths;
exports.listMonthsShort = $mod$94.listMonthsShort;
exports.listWeekdays = $mod$94.listWeekdays;
exports.listWeekdaysShort = $mod$94.listWeekdaysShort;
exports.listWeekdaysMin = $mod$94.listWeekdaysMin;
var $mod$95 = core.VW.Ecma2015.Utils.module(require('../utils/deprecate'));
var $mod$96 = core.VW.Ecma2015.Utils.module(require('../utils/hooks'));
$mod$96.hooks.lang = $mod$95.deprecate('moment.lang is deprecated. Use moment.locale instead.', $mod$93.getSetGlobalLocale);
$mod$96.hooks.langData = $mod$95.deprecate('moment.langData is deprecated. Use moment.localeData instead.', $mod$93.getLocale);
var $mod$97 = core.VW.Ecma2015.Utils.module(require('./en'));