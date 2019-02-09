var $mod$343 = core.VW.Ecma2015.Utils.module(require('./extend'));
var $mod$344 = core.VW.Ecma2015.Utils.module(require('./hooks'));
var $mod$345 = core.VW.Ecma2015.Utils.module(require('./is-undefined'));
function warn(msg) {
    if ($mod$344.hooks.suppressDeprecationWarnings === false && typeof console !== 'undefined' && console.warn) {
        console.warn('Deprecation warning: ' + msg);
    }
}
function deprecate(msg, fn) {
    var firstTime = true;
    return $mod$343.default(function () {
        if ($mod$344.hooks.deprecationHandler != null) {
            $mod$344.hooks.deprecationHandler(null, msg);
        }
        if (firstTime) {
            warn(msg + '\nArguments: ' + Array.prototype.slice.call(arguments).join(', ') + '\n' + new Error().stack);
            firstTime = false;
        }
        return fn.apply(this, arguments);
    }, fn);
}
exports.deprecate = deprecate;
var deprecations = {};
function deprecateSimple(name, msg) {
    if ($mod$344.hooks.deprecationHandler != null) {
        $mod$344.hooks.deprecationHandler(name, msg);
    }
    if (!deprecations[name]) {
        warn(msg);
        deprecations[name] = true;
    }
}
exports.deprecateSimple = deprecateSimple;
$mod$344.hooks.suppressDeprecationWarnings = false;
$mod$344.hooks.deprecationHandler = null;