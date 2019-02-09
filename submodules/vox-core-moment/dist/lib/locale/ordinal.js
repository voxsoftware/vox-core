var defaultOrdinal = '%d';
exports.defaultOrdinal = defaultOrdinal;
var defaultOrdinalParse = /\d{1,2}/;
exports.defaultOrdinalParse = defaultOrdinalParse;
function ordinal(number) {
    return this._ordinal.replace('%d', number);
}
exports.ordinal = ordinal;