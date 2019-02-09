var util= require("util")
{
    var Context = function Context() {
        Context.$constructor ? Context.$constructor.apply(this, arguments) : Context.$superClass && Context.$superClass.apply(this, arguments);
    };
    Context.$constructor = function (stream) {
        this.out = stream;
        this.sections = {};
    };
    Context.prototype.section = function (section) {
        var func, self = this;
        while (self) {
            if (self.sections) {
                func = self.sections[section];
                if (func)
                    break;
            }
            self = self.parent;
        }
        if (func)
            return func();
    };
    Context.prototype.include = function (source, args) {
        if (this.e6htmlFolder) {
            return this.e6htmlFolder.invoke(source, this, args);
        }
    };
    Context.prototype.transform = function (obj) {
        if (obj === undefined || obj === null) {
            obj = '';
        }
        if (typeof obj != 'string' && !Buffer.isBuffer(obj)) {
            obj = util.inspect(obj);
        }
        return obj;
    };
    Context.prototype.write = function (obj) {
        return this.out.write(this.transform(obj));
    };
}
exports.default = Context;
