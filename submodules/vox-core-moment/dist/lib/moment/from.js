var $mod$146 = core.VW.Ecma2015.Utils.module(require('../duration/create'));
var $mod$147 = core.VW.Ecma2015.Utils.module(require('../create/local'));
var $mod$148 = core.VW.Ecma2015.Utils.module(require('../moment/constructor'));
function from(time, withoutSuffix) {
    if (this.isValid() && ($mod$148.isMoment(time) && time.isValid() || $mod$147.createLocal(time).isValid())) {
        return $mod$146.createDuration({
            to: this,
            from: time
        }).locale(this.locale()).humanize(!withoutSuffix);
    } else {
        return this.localeData().invalidDate();
    }
}
exports.from = from;
function fromNow(withoutSuffix) {
    return this.from($mod$147.createLocal(), withoutSuffix);
}
exports.fromNow = fromNow;