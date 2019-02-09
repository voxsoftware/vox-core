var $mod$205 = core.VW.Ecma2015.Utils.module(require('../utils/has-own-prop'));
var $mod$206 = core.VW.Ecma2015.Utils.module(require('../utils/to-int'));
var tokens = {};
function addParseToken(token, callback) {
    var i, func = callback;
    if (typeof token === 'string') {
        token = [token];
    }
    if (typeof callback === 'number') {
        func = function (input, array) {
            array[callback] = $mod$206.default(input);
        };
    }
    for (i = 0; i < token.length; i++) {
        tokens[token[i]] = func;
    }
}
exports.addParseToken = addParseToken;
function addWeekParseToken(token, callback) {
    addParseToken(token, function (input, array, config, token) {
        config._w = config._w || {};
        callback(input, config._w, config, token);
    });
}
exports.addWeekParseToken = addWeekParseToken;
function addTimeToArrayFromToken(token, input, config) {
    if (input != null && $mod$205.default(tokens, token)) {
        tokens[token](input, config._a, config, token);
    }
}
exports.addTimeToArrayFromToken = addTimeToArrayFromToken;