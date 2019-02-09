var $mod$3 = core.VW.Ecma2015.Utils.module(require('../utils/is-array'));
var $mod$4 = core.VW.Ecma2015.Utils.module(require('../utils/is-date'));
var $mod$5 = core.VW.Ecma2015.Utils.module(require('../utils/map'));
var $mod$6 = core.VW.Ecma2015.Utils.module(require('./valid'));
var $mod$7 = core.VW.Ecma2015.Utils.module(require('../moment/constructor'));
var $mod$8 = core.VW.Ecma2015.Utils.module(require('../locale/locales'));
var $mod$9 = core.VW.Ecma2015.Utils.module(require('../utils/hooks'));
var $mod$10 = core.VW.Ecma2015.Utils.module(require('./check-overflow'));
var $mod$11 = core.VW.Ecma2015.Utils.module(require('./valid'));
var $mod$12 = core.VW.Ecma2015.Utils.module(require('./from-string-and-array'));
var $mod$13 = core.VW.Ecma2015.Utils.module(require('./from-string-and-format'));
var $mod$14 = core.VW.Ecma2015.Utils.module(require('./from-string'));
var $mod$15 = core.VW.Ecma2015.Utils.module(require('./from-array'));
var $mod$16 = core.VW.Ecma2015.Utils.module(require('./from-object'));
function createFromConfig(config) {
    var res = new $mod$7.Moment($mod$10.default(prepareConfig(config)));
    if (res._nextDay) {
        res.add(1, 'd');
        res._nextDay = undefined;
    }
    return res;
}
function prepareConfig(config) {
    var input = config._i, format = config._f;
    config._locale = config._locale || $mod$8.getLocale(config._l);
    if (input === null || format === undefined && input === '') {
        return $mod$6.createInvalid({ nullInput: true });
    }
    if (typeof input === 'string') {
        config._i = input = config._locale.preparse(input);
    }
    if ($mod$7.isMoment(input)) {
        return new $mod$7.Moment($mod$10.default(input));
    } else if ($mod$3.default(format)) {
        $mod$12.configFromStringAndArray(config);
    } else if (format) {
        $mod$13.configFromStringAndFormat(config);
    } else if ($mod$4.default(input)) {
        config._d = input;
    } else {
        configFromInput(config);
    }
    if (!$mod$11.isValid(config)) {
        config._d = null;
    }
    return config;
}
exports.prepareConfig = prepareConfig;
function configFromInput(config) {
    var input = config._i;
    if (input === undefined) {
        config._d = new Date($mod$9.hooks.now());
    } else if ($mod$4.default(input)) {
        config._d = new Date(input.valueOf());
    } else if (typeof input === 'string') {
        $mod$14.configFromString(config);
    } else if ($mod$3.default(input)) {
        config._a = $mod$5.default(input.slice(0), function (obj) {
            return parseInt(obj, 10);
        });
        $mod$15.configFromArray(config);
    } else if (typeof input === 'object') {
        $mod$16.configFromObject(config);
    } else if (typeof input === 'number') {
        config._d = new Date(input);
    } else {
        $mod$9.hooks.createFromInputFallback(config);
    }
}
function createLocalOrUTC(input, format, locale, strict, isUTC) {
    var c = {};
    if (typeof locale === 'boolean') {
        strict = locale;
        locale = undefined;
    }
    c._isAMomentObject = true;
    c._useUTC = c._isUTC = isUTC;
    c._l = locale;
    c._i = input;
    c._f = format;
    c._strict = strict;
    return createFromConfig(c);
}
exports.createLocalOrUTC = createLocalOrUTC;