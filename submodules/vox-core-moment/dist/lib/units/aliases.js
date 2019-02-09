var $mod$207 = core.VW.Ecma2015.Utils.module(require('../utils/has-own-prop'));
var aliases = {};
function addUnitAlias(unit, shorthand) {
    var lowerCase = unit.toLowerCase();
    aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
}
exports.addUnitAlias = addUnitAlias;
function normalizeUnits(units) {
    return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
}
exports.normalizeUnits = normalizeUnits;
function normalizeObjectUnits(inputObject) {
    var normalizedInput = {}, normalizedProp, prop;
    for (prop in inputObject) {
        if ($mod$207.default(inputObject, prop)) {
            normalizedProp = normalizeUnits(prop);
            if (normalizedProp) {
                normalizedInput[normalizedProp] = inputObject[prop];
            }
        }
    }
    return normalizedInput;
}
exports.normalizeObjectUnits = normalizeObjectUnits;