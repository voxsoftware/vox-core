var $mod$197 = core.VW.Ecma2015.Utils.module(require('../duration/create'));
var $mod$198 = core.VW.Ecma2015.Utils.module(require('../create/local'));
var $mod$199 = core.VW.Ecma2015.Utils.module(require('../moment/constructor'));
function to(time, withoutSuffix) {
    if (this.isValid() && ($mod$199.isMoment(time) && time.isValid() || $mod$198.createLocal(time).isValid())) {
        return $mod$197.createDuration({
            from: this,
            to: time
        }).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}
exports.to = to;
function toNow(withoutSuffix) {
    return this.to($mod$198.createLocal(), withoutSuffix);
}
exports.toNow = toNow;