var $mod$98 = core.VW.Ecma2015.Utils.module(require('../utils/is-array'));
var $mod$99 = core.VW.Ecma2015.Utils.module(require('../utils/is-undefined'));
var $mod$100 = core.VW.Ecma2015.Utils.module(require('../utils/compare-arrays'));
var $mod$101 = core.VW.Ecma2015.Utils.module(require('../utils/deprecate'));
var $mod$102 = core.VW.Ecma2015.Utils.module(require('./set'));
var $mod$103 = core.VW.Ecma2015.Utils.module(require('./constructor'));
var $mod$104 = core.VW.Ecma2015.Utils.module(require('../utils/keys'));
var locales = {};
var globalLocale;
function normalizeLocale(key) {
    return key ? key.toLowerCase().replace('_', '-') : key;
}
function chooseLocale(names) {
    var i = 0, j, next, locale, split;
    while (i < names.length) {
        split = normalizeLocale(names[i]).split('-');
        j = split.length;
        next = normalizeLocale(names[i + 1]);
        next = next ? next.split('-') : null;
        while (j > 0) {
            locale = loadLocale(split.slice(0, j).join('-'));
            if (locale) {
                return locale;
            }
            if (next && next.length >= j && $mod$100.default(split, next, true) >= j - 1) {
                break;
            }
            j--;
        }
        i++;
    }
    return null;
}
function loadLocale(name) {
    var oldLocale = null;
    if (!locales[name] && typeof module !== 'undefined' && module && module.exports) {
        try {
            oldLocale = globalLocale._abbr;
            require('./locale/' + name);
            getSetGlobalLocale(oldLocale);
        } catch (e) {
        }
    }
    return locales[name];
}
function getSetGlobalLocale(key, values) {
    var data;
    if (key) {
        if ($mod$99.default(values)) {
            data = getLocale(key);
        } else {
            data = defineLocale(key, values);
        }
        if (data) {
            globalLocale = data;
        }
    }
    return globalLocale._abbr;
}
exports.getSetGlobalLocale = getSetGlobalLocale;
function defineLocale(name, config) {
    if (config !== null) {
        config.abbr = name;
        if (locales[name] != null) {
            $mod$101.deprecateSimple('defineLocaleOverride', 'use moment.updateLocale(localeName, config) to change ' + 'an existing locale. moment.defineLocale(localeName, ' + 'config) should only be used for creating a new locale');
            config = $mod$102.mergeConfigs(locales[name]._config, config);
        } else if (config.parentLocale != null) {
            if (locales[config.parentLocale] != null) {
                config = $mod$102.mergeConfigs(locales[config.parentLocale]._config, config);
            } else {
                $mod$101.deprecateSimple('parentLocaleUndefined', 'specified parentLocale is not defined yet');
            }
        }
        locales[name] = new $mod$103.Locale(config);
        getSetGlobalLocale(name);
        return locales[name];
    } else {
        delete locales[name];
        return null;
    }
}
exports.defineLocale = defineLocale;
function updateLocale(name, config) {
    if (config != null) {
        var locale;
        if (locales[name] != null) {
            config = $mod$102.mergeConfigs(locales[name]._config, config);
        }
        locale = new $mod$103.Locale(config);
        locale.parentLocale = locales[name];
        locales[name] = locale;
        getSetGlobalLocale(name);
    } else {
        if (locales[name] != null) {
            if (locales[name].parentLocale != null) {
                locales[name] = locales[name].parentLocale;
            } else if (locales[name] != null) {
                delete locales[name];
            }
        }
    }
    return locales[name];
}
exports.updateLocale = updateLocale;
function getLocale(key) {
    var locale;
    if (key && key._locale && key._locale._abbr) {
        key = key._locale._abbr;
    }
    if (!key) {
        return globalLocale;
    }
    if (!$mod$98.default(key)) {
        locale = loadLocale(key);
        if (locale) {
            return locale;
        }
        key = [key];
    }
    return chooseLocale(key);
}
exports.getLocale = getLocale;
function listLocales() {
    return $mod$104.default(locales);
}
exports.listLocales = listLocales;