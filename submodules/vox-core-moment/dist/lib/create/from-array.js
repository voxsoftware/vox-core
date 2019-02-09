var $mod$17 = core.VW.Ecma2015.Utils.module(require('../utils/hooks'));
var $mod$18 = core.VW.Ecma2015.Utils.module(require('./date-from-array'));
var $mod$19 = core.VW.Ecma2015.Utils.module(require('../units/year'));
var $mod$20 = core.VW.Ecma2015.Utils.module(require('../units/week-calendar-utils'));
var $mod$21 = core.VW.Ecma2015.Utils.module(require('../units/constants'));
var $mod$22 = core.VW.Ecma2015.Utils.module(require('./local'));
var $mod$23 = core.VW.Ecma2015.Utils.module(require('../utils/defaults'));
var $mod$24 = core.VW.Ecma2015.Utils.module(require('./parsing-flags'));
function currentDateArray(config) {
    var nowValue = new Date($mod$17.hooks.now());
    if (config._useUTC) {
        return [
            nowValue.getUTCFullYear(),
            nowValue.getUTCMonth(),
            nowValue.getUTCDate()
        ];
    }
    return [
        nowValue.getFullYear(),
        nowValue.getMonth(),
        nowValue.getDate()
    ];
}
function configFromArray(config) {
    var i, date, input = [], currentDate, yearToUse;
    if (config._d) {
        return;
    }
    currentDate = currentDateArray(config);
    if (config._w && config._a[$mod$21.DATE] == null && config._a[$mod$21.MONTH] == null) {
        dayOfYearFromWeekInfo(config);
    }
    if (config._dayOfYear) {
        yearToUse = $mod$23.default(config._a[$mod$21.YEAR], currentDate[$mod$21.YEAR]);
        if (config._dayOfYear > $mod$19.daysInYear(yearToUse)) {
            $mod$24.default(config)._overflowDayOfYear = true;
        }
        date = $mod$18.createUTCDate(yearToUse, 0, config._dayOfYear);
        config._a[$mod$21.MONTH] = date.getUTCMonth();
        config._a[$mod$21.DATE] = date.getUTCDate();
    }
    for (i = 0; i < 3 && config._a[i] == null; ++i) {
        config._a[i] = input[i] = currentDate[i];
    }
    for (; i < 7; i++) {
        config._a[i] = input[i] = config._a[i] == null ? i === 2 ? 1 : 0 : config._a[i];
    }
    if (config._a[$mod$21.HOUR] === 24 && config._a[$mod$21.MINUTE] === 0 && config._a[$mod$21.SECOND] === 0 && config._a[$mod$21.MILLISECOND] === 0) {
        config._nextDay = true;
        config._a[$mod$21.HOUR] = 0;
    }
    config._d = (config._useUTC ? $mod$18.createUTCDate : $mod$18.createDate).apply(null, input);
    if (config._tzm != null) {
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
    }
    if (config._nextDay) {
        config._a[$mod$21.HOUR] = 24;
    }
}
exports.configFromArray = configFromArray;
function dayOfYearFromWeekInfo(config) {
    var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;
    w = config._w;
    if (w.GG != null || w.W != null || w.E != null) {
        dow = 1;
        doy = 4;
        weekYear = $mod$23.default(w.GG, config._a[$mod$21.YEAR], $mod$20.weekOfYear($mod$22.createLocal(), 1, 4).year);
        week = $mod$23.default(w.W, 1);
        weekday = $mod$23.default(w.E, 1);
        if (weekday < 1 || weekday > 7) {
            weekdayOverflow = true;
        }
    } else {
        dow = config._locale._week.dow;
        doy = config._locale._week.doy;
        weekYear = $mod$23.default(w.gg, config._a[$mod$21.YEAR], $mod$20.weekOfYear($mod$22.createLocal(), dow, doy).year);
        week = $mod$23.default(w.w, 1);
        if (w.d != null) {
            weekday = w.d;
            if (weekday < 0 || weekday > 6) {
                weekdayOverflow = true;
            }
        } else if (w.e != null) {
            weekday = w.e + dow;
            if (w.e < 0 || w.e > 6) {
                weekdayOverflow = true;
            }
        } else {
            weekday = dow;
        }
    }
    if (week < 1 || week > $mod$20.weeksInYear(weekYear, dow, doy)) {
        $mod$24.default(config)._overflowWeeks = true;
    } else if (weekdayOverflow != null) {
        $mod$24.default(config)._overflowWeekday = true;
    } else {
        temp = $mod$20.dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
        config._a[$mod$21.YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
    }
}