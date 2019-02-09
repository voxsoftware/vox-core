function valueOf$() {
    return this._d.valueOf() - (this._offset || 0) * 60000;
}
exports.valueOf = valueOf$;
function unix() {
    return Math.floor(this.valueOf() / 1000);
}
exports.unix = unix;
function toDate() {
    return this._offset ? new Date(this.valueOf()) : this._d;
}
exports.toDate = toDate;
function toArray() {
    var m = this;
    return [
        m.year(),
        m.month(),
        m.date(),
        m.hour(),
        m.minute(),
        m.second(),
        m.millisecond()
    ];
}
exports.toArray = toArray;
function toObject() {
    var m = this;
    return {
        years: m.year(),
        months: m.month(),
        date: m.date(),
        hours: m.hours(),
        minutes: m.minutes(),
        seconds: m.seconds(),
        milliseconds: m.milliseconds()
    };
}
exports.toObject = toObject;
function toJSON() {
    return this.isValid() ? this.toISOString() : null;
}
exports.toJSON = toJSON;