exports.hooks = hooks;
exports.setHookCallback = setHookCallback;
var hookCallback;
function hooks() {
    return hookCallback.apply(null, arguments);
}
function setHookCallback(callback) {
    hookCallback = callback;
}