{
    var ConsoleContext = function ConsoleContext() {
        ConsoleContext.$constructor ? ConsoleContext.$constructor.apply(this, arguments) : ConsoleContext.$superClass && ConsoleContext.$superClass.apply(this, arguments);
    };
    ConsoleContext.prototype = Object.create(core.VW.E6Html.Context.prototype);
    ConsoleContext.prototype.constructor = ConsoleContext;
    ConsoleContext.$super = core.VW.E6Html.Context.prototype;
    ConsoleContext.$superClass = core.VW.E6Html.Context;
    ConsoleContext.$constructor = function () {
        ConsoleContext.$superClass.call(this, core.VW.Console);
        this.env = process.env;
    };
}
exports.default = ConsoleContext;