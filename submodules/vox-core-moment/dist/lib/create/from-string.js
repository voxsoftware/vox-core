var $mod$42 = core.VW.Ecma2015.Utils.module(require('./from-string-and-format'));
var $mod$43 = core.VW.Ecma2015.Utils.module(require('../utils/hooks'));
var $mod$44 = core.VW.Ecma2015.Utils.module(require('../utils/deprecate'));
var $mod$45 = core.VW.Ecma2015.Utils.module(require('./parsing-flags'));
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;
var isoDates = [
    [
        'YYYYYY-MM-DD',
        /[+-]\d{6}-\d\d-\d\d/
    ],
    [
        'YYYY-MM-DD',
        /\d{4}-\d\d-\d\d/
    ],
    [
        'GGGG-[W]WW-E',
        /\d{4}-W\d\d-\d/
    ],
    [
        'GGGG-[W]WW',
        /\d{4}-W\d\d/,
        false
    ],
    [
        'YYYY-DDD',
        /\d{4}-\d{3}/
    ],
    [
        'YYYY-MM',
        /\d{4}-\d\d/,
        false
    ],
    [
        'YYYYYYMMDD',
        /[+-]\d{10}/
    ],
    [
        'YYYYMMDD',
        /\d{8}/
    ],
    [
        'GGGG[W]WWE',
        /\d{4}W\d{3}/
    ],
    [
        'GGGG[W]WW',
        /\d{4}W\d{2}/,
        false
    ],
    [
        'YYYYDDD',
        /\d{7}/
    ]
];
var isoTimes = [
    [
        'HH:mm:ss.SSSS',
        /\d\d:\d\d:\d\d\.\d+/
    ],
    [
        'HH:mm:ss,SSSS',
        /\d\d:\d\d:\d\d,\d+/
    ],
    [
        'HH:mm:ss',
        /\d\d:\d\d:\d\d/
    ],
    [
        'HH:mm',
        /\d\d:\d\d/
    ],
    [
        'HHmmss.SSSS',
        /\d\d\d\d\d\d\.\d+/
    ],
    [
        'HHmmss,SSSS',
        /\d\d\d\d\d\d,\d+/
    ],
    [
        'HHmmss',
        /\d\d\d\d\d\d/
    ],
    [
        'HHmm',
        /\d\d\d\d/
    ],
    [
        'HH',
        /\d\d/
    ]
];
var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;
function configFromISO(config) {
    var i, l, string = config._i, match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string), allowTime, dateFormat, timeFormat, tzFormat;
    if (match) {
        $mod$45.default(config).iso = true;
        for (i = 0, l = isoDates.length; i < l; i++) {
            if (isoDates[i][1].exec(match[1])) {
                dateFormat = isoDates[i][0];
                allowTime = isoDates[i][2] !== false;
                break;
            }
        }
        if (dateFormat == null) {
            config._isValid = false;
            return;
        }
        if (match[3]) {
            for (i = 0, l = isoTimes.length; i < l; i++) {
                if (isoTimes[i][1].exec(match[3])) {
                    timeFormat = (match[2] || ' ') + isoTimes[i][0];
                    break;
                }
            }
            if (timeFormat == null) {
                config._isValid = false;
                return;
            }
        }
        if (!allowTime && timeFormat != null) {
            config._isValid = false;
            return;
        }
        if (match[4]) {
            if (tzRegex.exec(match[4])) {
                tzFormat = 'Z';
            } else {
                config._isValid = false;
                return;
            }
        }
        config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
        $mod$42.configFromStringAndFormat(config);
    } else {
        config._isValid = false;
    }
}
exports.configFromISO = configFromISO;
function configFromString(config) {
    var matched = aspNetJsonRegex.exec(config._i);
    if (matched !== null) {
        config._d = new Date(+matched[1]);
        return;
    }
    configFromISO(config);
    if (config._isValid === false) {
        delete config._isValid;
        $mod$43.hooks.createFromInputFallback(config);
    }
}
exports.configFromString = configFromString;
$mod$43.hooks.createFromInputFallback = $mod$44.deprecate('moment construction falls back to js Date. This is ' + 'discouraged and will be removed in upcoming major ' + 'release. Please refer to ' + 'https://github.com/moment/moment/issues/1407 for more info.', function (config) {
    config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
});