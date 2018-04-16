"use strict";
exports.__esModule = true;
var Request = /** @class */ (function () {
    function Request(imagelength, worldwidth, worldheight, gamename) {
        this.imagelength = imagelength;
        this.worldwidth = worldwidth;
        this.worldheight = worldheight;
        this.gamename = gamename;
    }
    Request.prototype.world = function () {
        return {
            numImages: this.imagelength,
            width: this.worldwidth,
            height: this.worldheight,
            gametype: this.gamename
        };
    };
    Request.fromMessage = function (message) {
        if (message.command != 'REQUEST') {
            throw new Error(message.command + " is not a REQUEST");
        }
        var requestMap = JSON.parse(message.data);
        return new Request(requestMap.IMAGELENGTH, requestMap.WORLDWIDTH, requestMap.WORLDHEIGHT, requestMap.GAMENAME);
    };
    return Request;
}());
exports["default"] = Request;
//# sourceMappingURL=Request.js.map