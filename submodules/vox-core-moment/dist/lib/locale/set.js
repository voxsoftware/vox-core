var $mod$118 = core.VW.Ecma2015.Utils.module(require('../utils/is-function'));
var $mod$119 = core.VW.Ecma2015.Utils.module(require('../utils/extend'));
var $mod$120 = core.VW.Ecma2015.Utils.module(require('../utils/is-object'));
var $mod$121 = core.VW.Ecma2015.Utils.module(require('../utils/has-own-prop'));
function set(config) {
    var prop, i;
    for (i in config) {
        prop = config[i];
        if ($mod$118.default(prop)) {
            this[i] = prop;
        } else {
            this['_' + i] = prop;
        }
    }
    this._config = config;
    this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + /\d{1,2}/.source);
}
exports.set = set;
function mergeConfigs(parentConfig, childConfig) {
    var res = $mod$119.default({}, parentConfig), prop;
    for (prop in childConfig) {
        if ($mod$121.default(childConfig, prop)) {
            if ($mod$120.default(parentConfig[prop]) && $mod$120.default(childConfig[prop])) {
                res[prop] = {};
                $mod$119.default(res[prop], parentConfig[prop]);
                $mod$119.default(res[prop], childConfig[prop]);
            } else if (childConfig[prop] != null) {
                res[prop] = childConfig[prop];
            } else {
                delete res[prop];
            }
        }
    }
    return res;
}
exports.mergeConfigs = mergeConfigs;