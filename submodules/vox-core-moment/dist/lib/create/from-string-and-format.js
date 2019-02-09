var $mod$33 = core.VW.Ecma2015.Utils.module(require('./from-string'));
var $mod$34 = core.VW.Ecma2015.Utils.module(require('./from-array'));
var $mod$35 = core.VW.Ecma2015.Utils.module(require('../parse/regex'));
var $mod$36 = core.VW.Ecma2015.Utils.module(require('../parse/token'));
var $mod$37 = core.VW.Ecma2015.Utils.module(require('../format/format'));
var $mod$38 = core.VW.Ecma2015.Utils.module(require('./check-overflow'));
var $mod$39 = core.VW.Ecma2015.Utils.module(require('../units/constants'));
var $mod$40 = core.VW.Ecma2015.Utils.module(require('../utils/hooks'));
var $mod$41 = core.VW.Ecma2015.Utils.module(require('./parsing-flags'));
$mod$40.hooks.ISO_8601 = function () {
};
function configFromStringAndFormat(config) {
    if (config._f === $mod$40.hooks.ISO_8601) {
        $mod$33.configFromISO(config);
        return;
    }
    config._a = [];
    $mod$41.default(config).empty = true;
    var string = '' + config._i, i, parsedInput, tokens, token, skipped, stringLength = string.length, totalParsedInputLength = 0;
    tokens = $mod$37.expandFormat(config._f, config._locale).match($mod$37.formattingTokens) || [];
    for (i = 0; i < tokens.length; i++) {
        token = tokens[i];
        parsedInput = (string.match($mod$35.getParseRegexForToken(token, config)) || [])[0];
        if (parsedInput) {
            skipped = string.substr(0, string.indexOf(parsedInput));
            if (skipped.length > 0) {
                $mod$41.default(config).unusedInput.push(skipped);
            }
            string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
            totalParsedInputLength += parsedInput.length;
        }
        if ($mod$37.formatTokenFunctions[token]) {
            if (parsedInput) {
                $mod$41.default(config).empty = false;
            } else {
                $mod$41.default(config).unusedTokens.push(token);
            }
            $mod$36.addTimeToArrayFromToken(token, parsedInput, config);
        } else if (config._strict && !parsedInput) {
            $mod$41.default(config).unusedTokens.push(token);
        }
    }
    $mod$41.default(config).charsLeftOver = stringLength - totalParsedInputLength;
    if (string.length > 0) {
        $mod$41.default(config).unusedInput.push(string);
    }
    if ($mod$41.default(config).bigHour === true && config._a[$mod$39.HOUR] <= 12 && config._a[$mod$39.HOUR] > 0) {
        $mod$41.default(config).bigHour = undefined;
    }
    $mod$41.default(config).parsedDateParts = config._a.slice(0);
    $mod$41.default(config).meridiem = config._meridiem;
    config._a[$mod$39.HOUR] = meridiemFixWrap(config._locale, config._a[$mod$39.HOUR], config._meridiem);
    $mod$34.configFromArray(config);
    $mod$38.default(config);
}
exports.configFromStringAndFormat = configFromStringAndFormat;
function meridiemFixWrap(locale, hour, meridiem) {
    var isPm;
    if (meridiem == null) {
        return hour;
    }
    if (locale.meridiemHour != null) {
        return locale.meridiemHour(hour, meridiem);
    } else if (locale.isPM != null) {
        isPm = locale.isPM(meridiem);
        if (isPm && hour < 12) {
            hour += 12;
        }
        if (!isPm && hour === 12) {
            hour = 0;
        }
        return hour;
    } else {
        return hour;
    }
}