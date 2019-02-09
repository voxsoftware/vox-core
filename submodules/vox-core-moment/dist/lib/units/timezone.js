var $mod$298 = core.VW.Ecma2015.Utils.module(require('../format/format'));
$mod$298.addFormatToken('z', 0, 0, 'zoneAbbr');
$mod$298.addFormatToken('zz', 0, 0, 'zoneName');
function getZoneAbbr() {
    return this._isUTC ? 'UTC' : '';
}
exports.getZoneAbbr = getZoneAbbr;
function getZoneName() {
    return this._isUTC ? 'Coordinated Universal Time' : '';
}
exports.getZoneName = getZoneName;