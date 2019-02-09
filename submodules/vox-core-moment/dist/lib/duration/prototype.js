var $mod$75 = core.VW.Ecma2015.Utils.module(require('./constructor'));
var proto = $mod$75.Duration.prototype;
var $mod$76 = core.VW.Ecma2015.Utils.module(require('./abs'));
var $mod$77 = core.VW.Ecma2015.Utils.module(require('./add-subtract'));
var $mod$78 = core.VW.Ecma2015.Utils.module(require('./as'));
var $mod$79 = core.VW.Ecma2015.Utils.module(require('./bubble'));
var $mod$80 = core.VW.Ecma2015.Utils.module(require('./get'));
var $mod$81 = core.VW.Ecma2015.Utils.module(require('./humanize'));
var $mod$82 = core.VW.Ecma2015.Utils.module(require('./iso-string'));
var $mod$83 = core.VW.Ecma2015.Utils.module(require('../moment/locale'));
proto.abs = $mod$76.abs;
proto.add = $mod$77.add;
proto.subtract = $mod$77.subtract;
proto.as = $mod$78.as;
proto.asMilliseconds = $mod$78.asMilliseconds;
proto.asSeconds = $mod$78.asSeconds;
proto.asMinutes = $mod$78.asMinutes;
proto.asHours = $mod$78.asHours;
proto.asDays = $mod$78.asDays;
proto.asWeeks = $mod$78.asWeeks;
proto.asMonths = $mod$78.asMonths;
proto.asYears = $mod$78.asYears;
proto.valueOf = $mod$78.valueOf;
proto._bubble = $mod$79.bubble;
proto.get = $mod$80.get;
proto.milliseconds = $mod$80.milliseconds;
proto.seconds = $mod$80.seconds;
proto.minutes = $mod$80.minutes;
proto.hours = $mod$80.hours;
proto.days = $mod$80.days;
proto.weeks = $mod$80.weeks;
proto.months = $mod$80.months;
proto.years = $mod$80.years;
proto.humanize = $mod$81.humanize;
proto.toISOString = $mod$82.toISOString;
proto.toString = $mod$82.toISOString;
proto.toJSON = $mod$82.toISOString;
proto.locale = $mod$83.locale;
proto.localeData = $mod$83.localeData;
var $mod$84 = core.VW.Ecma2015.Utils.module(require('../utils/deprecate'));
proto.toIsoString = $mod$84.deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', $mod$82.toISOString);
proto.lang = $mod$83.lang;