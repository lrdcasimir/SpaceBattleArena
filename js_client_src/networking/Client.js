"use strict";
exports.__esModule = true;
var Message_1 = require("./Message");
var through2 = require("through2");
var Client = /** @class */ (function () {
    function Client(socket) {
        var _this = this;
        this.gamesocket = socket;
        this.gamesocket.pipe(through2.obj(function (chunk, enc, callback) {
            var packet = chunk.toString('utf8');
            var remaining = packet;
            while (remaining.length > 0) {
                var message = Message_1["default"].parse(remaining);
                this.push(message);
                remaining = remaining.substring(remaining.indexOf('[') + message.length);
            }
            callback();
        })).on("data", function (message) {
            if (_this.handler != null) {
                _this.handler(message);
            }
            else {
                console.log("No handler for message", message);
            }
        });
    }
    Client.prototype.on = function (event, handler) {
        this.handler = handler;
    };
    Client.prototype.sendMessage = function (message, cb) {
        return this.gamesocket.write(message.toNetworkString(), cb);
    };
    return Client;
}());
exports["default"] = Client;
//# sourceMappingURL=Client.js.map