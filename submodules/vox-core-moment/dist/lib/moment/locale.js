var $mod$152 = core.VW.Ecma2015.Utils.module(require('../locale/locales'));
var $mod$153 = core.VW.Ecma2015.Utils.module(require('../utils/deprecate'));
function locale(key) {
    var newLocaleData;
    if (key === undefined) {
        return this._locale._abbr;
    } else {
        newLocaleData = $mod$152.getLocale(key);
        if (newLocaleData != null) {
            this._locale = newLocaleData;
        }
        return this;
    }
}
exports.locale = locale;
var lang = $mod$153.deprecate('moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.', function (key) {
    if (key === undefined) {
        return this.localeData();
    } else {
        return this.locale(key);
    }
});
exports.lang = lang;
function localeData() {
    return this._locale;
}
exports.localeData = localeData;