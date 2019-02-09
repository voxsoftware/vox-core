var now = function () {
    return Date.now ? Date.now() : +new Date();
};
exports.now = now;