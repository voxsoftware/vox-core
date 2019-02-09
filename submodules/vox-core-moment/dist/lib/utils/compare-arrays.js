var $mod$342 = core.VW.Ecma2015.Utils.module(require('./to-int'));
exports.default = function compareArrays(array1, array2, dontConvert) {
    var len = Math.min(array1.length, array2.length), lengthDiff = Math.abs(array1.length - array2.length), diffs = 0, i;
    for (i = 0; i < len; i++) {
        if (dontConvert && array1[i] !== array2[i] || !dontConvert && $mod$342.default(array1[i]) !== $mod$342.default(array2[i])) {
            diffs++;
        }
    }
    return diffs + lengthDiff;
};