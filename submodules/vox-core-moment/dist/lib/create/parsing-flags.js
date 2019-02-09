function defaultParsingFlags() {
    return {
        empty: false,
        unusedTokens: [],
        unusedInput: [],
        overflow: -2,
        charsLeftOver: 0,
        nullInput: false,
        invalidMonth: null,
        invalidFormat: false,
        userInvalidated: false,
        iso: false,
        parsedDateParts: [],
        meridiem: null
    };
}
exports.default = function getParsingFlags(m) {
    if (m._pf == null) {
        m._pf = defaultParsingFlags();
    }
    return m._pf;
};