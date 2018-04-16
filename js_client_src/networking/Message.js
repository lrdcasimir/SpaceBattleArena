"use strict";
exports.__esModule = true;
var Message = /** @class */ (function () {
    function Message(id, command, data, length) {
        this.id = id;
        this.command = command;
        this.data = data;
        this.length = length;
    }
    Message.prototype.toNetworkString = function () {
        var idString = JSON.stringify(this.id);
        var command = JSON.stringify(this.command);
        var data = JSON.stringify(this.data);
        var message = idString + "," + command + "," + data;
        return "" + message.length + message;
    };
    Message.parse = function (packet) {
        var messageLength = Message.getMessageLength(packet);
        var messageString = Message.getMessageString(packet, messageLength);
        var command = Message.getCommand(messageString);
        return new Message(Message.getMessageId(messageString), command, Message.getData(messageString, command.length), messageLength);
    };
    Message.getMessageString = function (message, messageLength) {
        return message.substr(message.indexOf('['), messageLength);
    };
    ;
    Message.getMessageLength = function (message) {
        if (message.indexOf('[') < 0) {
            return -1;
        }
        return parseInt(message.substring(0, message.indexOf['[']), 10);
    };
    ;
    Message.getMessageId = function (message) {
        return JSON.parse(message.substring(0, message.indexOf(']') + 1));
    };
    ;
    Message.getCommand = function (message) {
        return JSON.parse(message.substring(message.indexOf(']') + 2, message.indexOf('"', message.indexOf('"') + 1) + 1));
    };
    ;
    Message.getData = function (message, commandLength) {
        var idLength = message.indexOf(']') + 1;
        return message.substring(idLength + commandLength + 4);
    };
    return Message;
}());
exports["default"] = Message;
//# sourceMappingURL=Message.js.map