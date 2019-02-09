var match1 = /\d/;
exports.match1 = match1;
var match2 = /\d\d/;
exports.match2 = match2;
var match3 = /\d{3}/;
exports.match3 = match3;
var match4 = /\d{4}/;
exports.match4 = match4;
var match6 = /[+-]?\d{6}/;
exports.match6 = match6;
var match1to2 = /\d\d?/;
exports.match1to2 = match1to2;
var match3to4 = /\d\d\d\d?/;
exports.match3to4 = match3to4;
var match5to6 = /\d\d\d\d\d\d?/;
exports.match5to6 = match5to6;
var match1to3 = /\d{1,3}/;
exports.match1to3 = match1to3;
var match1to4 = /\d{1,4}/;
exports.match1to4 = match1to4;
var match1to6 = /[+-]?\d{1,6}/;
exports.match1to6 = match1to6;
var matchUnsigned = /\d+/;
exports.matchUnsigned = matchUnsigned;
var matchSigned = /[+-]?\d+/;
exports.matchSigned = matchSigned;
var matchOffset = /Z|[+-]\d\d:?\d\d/gi;
exports.matchOffset = matchOffset;
var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi;
exports.matchShortOffset = matchShortOffset;
var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/;
exports.matchTimestamp = matchTimestamp;
var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;
exports.matchWord = matchWord;
var $mod$203 = core.VW.Ecma2015.Utils.module(require('../utils/has-own-prop'));
var $mod$204 = core.VW.Ecma2015.Utils.module(require('../utils/is-function'));
var regexes = {};
function addRegexToken(token, regex, strictRegex) {
    regexes[token] = $mod$204.default(regex) ? regex : function (isStrict, localeData) {
        return isStrict && strictRegex ? strictRegex : regex;
    };
}
exports.addRegexToken = addRegexToken;
function getParseRegexForToken(token, config) {
    if (!$mod$203.default(regexes, token)) {
        return new RegExp(unescapeFormat(token));
    }
    return regexes[token](config._strict, config._locale);
}
exports.getParseRegexForToken = getParseRegexForToken;
function unescapeFormat(s) {
    return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
        return p1 || p2 || p3 || p4;
    }));
}
function regexEscape(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
exports.regexEscape = regexEscape;