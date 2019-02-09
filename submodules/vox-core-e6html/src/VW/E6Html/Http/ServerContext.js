{
    var ServerContext = function ServerContext() {
        ServerContext.$constructor ? ServerContext.$constructor.apply(this, arguments) : ServerContext.$superClass && ServerContext.$superClass.apply(this, arguments);
    };
    ServerContext.prototype = Object.create(core.VW.E6Html.Context.prototype);
    ServerContext.prototype.constructor = ServerContext;
    ServerContext.$super = core.VW.E6Html.Context.prototype;
    ServerContext.$superClass = core.VW.E6Html.Context;
    ServerContext.$constructor = function (server, req, res, next) {
        ServerContext.$superClass.call(this);
        this.out = this;
        this.request = this.in = req;
        this.response = res;
        this.continue = next;
        this.server = server;
    };
    ServerContext.prototype.include = function (source, args) {
        if (this.viewManager) {
            return this.viewManager.include(source, this, {
                context: this,
                arguments: args || this.arguments
            });
        }
        return ServerContext.$super.include.call(this, source, args);
    };
    ServerContext.prototype.writeHeaders = function () {
        var v = this.response.writeHead.apply(this.response, arguments);
        this.$writedHeaders = true;
        return v;
    };
    ServerContext.prototype.write = function (obj) {
        obj = this.transform(obj);
        if (!this.$writedHeaders) {
            try {
                this.writeHeaders(200, { 'Content-type': 'text/html;Charset=utf8' });
            } catch (e) {
            }
        }
        this.response.write(obj);
    };
}
exports.default = ServerContext;