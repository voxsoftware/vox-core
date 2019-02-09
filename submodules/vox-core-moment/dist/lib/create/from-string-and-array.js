var $mod$28 = core.VW.Ecma2015.Utils.module(require('../moment/constructor'));
var $mod$29 = core.VW.Ecma2015.Utils.module(require('./from-string-and-format'));
var $mod$30 = core.VW.Ecma2015.Utils.module(require('./parsing-flags'));
var $mod$31 = core.VW.Ecma2015.Utils.module(require('./valid'));
var $mod$32 = core.VW.Ecma2015.Utils.module(require('../utils/extend'));
function configFromStringAndArray(config) {
    var tempConfig, bestMoment, scoreToBeat, i, currentScore;
    if (config._f.length === 0) {
        $mod$30.default(config).invalidFormat = true;
        config._d = new Date(NaN);
        return;
    }
    for (i = 0; i < config._f.length; i++) {
        currentScore = 0;
        tempConfig = $mod$28.copyConfig({}, config);
        if (config._useUTC != null) {
            tempConfig._useUTC = config._useUTC;
        }
        tempConfig._f = config._f[i];
        $mod$29.configFromStringAndFormat(tempConfig);
        if (!$mod$31.isValid(tempConfig)) {
            continue;
        }
        currentScore += $mod$30.default(tempConfig).charsLeftOver;
        currentScore += $mod$30.default(tempConfig).unusedTokens.length * 10;
        $mod$30.default(tempConfig).score = currentScore;
        if (scoreToBeat == null || currentScore < scoreToBeat) {
            scoreToBeat = currentScore;
            bestMoment = tempConfig;
        }
    }
    $mod$32.default(config, bestMoment || tempConfig);
}
exports.configFromStringAndArray = configFromStringAndArray;