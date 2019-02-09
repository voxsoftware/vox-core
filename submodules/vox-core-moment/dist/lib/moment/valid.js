var $mod$200 = core.VW.Ecma2015.Utils.module(require('../create/valid'));
var $mod$201 = core.VW.Ecma2015.Utils.module(require('../utils/extend'));
var $mod$202 = core.VW.Ecma2015.Utils.module(require('../create/parsing-flags'));
function isValid() {
    return $mod$200.isValid(this);
}
exports.isValid = isValid;
function parsingFlags() {
    return $mod$201.default({}, $mod$202.default(this));
}
exports.parsingFlags = parsingFlags;
function invalidAt() {
    return $mod$202.default(this).overflow;
}
exports.invalidAt = invalidAt;