
// Convertido de ES6 a JS con vox-core

var $mod$0 = require('fs');
$mod$0.default= $mod$0

{
    var FsBase = function FsBase() {
        FsBase.$constructor ? FsBase.$constructor.apply(this, arguments) : FsBase.$super && FsBase.$super.constructor.apply(this, arguments);
    };
    FsBase.prototype.initAsync = function () {
        for (var id in $mod$0.default) {
            if (!id.endsWith('Sync')) {
                if (id == 'exists')
                    this[id] = this.special($mod$0.default[id], $mod$0.default);
                else
                    this[id] = core.VW.Task.fromFunctionWithCallback($mod$0.default[id], $mod$0.default);
            }
        }
    };
    FsBase.prototype.initSync = function () {
        for (var id in $mod$0.default) {
            if (id.endsWith('Sync'))
                this[id.substring(0, id.length - 4)] = $mod$0.default[id];
        }
    };
    FsBase.prototype.special = function (func, self) {
        return function () {
            var task = new core.VW.Task();
            var args = Array.prototype.slice.call(arguments, 0, arguments.length);
            args.push(function (value) {
                task.result = value;
                task.finish();
            });
            func.apply(self || this, args);
            return task;
        };
    };
}
{
    var FsAsync = function FsAsync() {
        FsAsync.$constructor ? FsAsync.$constructor.apply(this, arguments) : FsAsync.$super && FsAsync.$super.constructor.apply(this, arguments);
    };
    FsAsync.prototype = Object.create(FsBase.prototype);
    FsAsync.prototype.constructor = FsAsync;
    FsAsync.$super = FsBase.prototype;
    FsAsync.$constructor = function () {
        this.initAsync();
    };
}
{
    var FsSync = function FsSync() {
        FsSync.$constructor ? FsSync.$constructor.apply(this, arguments) : FsSync.$super && FsSync.$super.constructor.apply(this, arguments);
    };
    FsSync.prototype = Object.create(FsBase.prototype);
    FsSync.prototype.constructor = FsSync;
    FsSync.$super = FsBase.prototype;
    FsSync.$constructor = function () {
        this.initSync();
    };
}
{
    var FsSyncAndSync = function FsSyncAndSync() {
        FsSyncAndSync.$constructor ? FsSyncAndSync.$constructor.apply(this, arguments) : FsSyncAndSync.$super && FsSyncAndSync.$super.constructor.apply(this, arguments);
    };
    FsSyncAndSync.__defineGetter__('sync', function () {
        if (!FsSyncAndSync._fss)
            FsSyncAndSync._fss = new FsSync();
        return FsSyncAndSync._fss;
    });
    FsSyncAndSync.__defineGetter__('async', function () {
        if (!FsSyncAndSync._fsa)
            FsSyncAndSync._fsa = new FsAsync();
        return FsSyncAndSync._fsa;
    });
}
exports.default = FsSyncAndSync;
