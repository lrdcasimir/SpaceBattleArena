import Message from "./Message";
import { Socket } from "net";
import * as through2 from "through2";

export default class Client {
	private gamesocket : Socket;
	private handler? : ((message : Message) => boolean)|null;

	constructor(socket: Socket) {
		this.gamesocket = socket;
		
	}
	public init() {
		this.gamesocket.pipe(through2.obj(function (chunk, enc, callback)  {
			const packet : string = chunk.toString('utf8')
			let remaining = packet;
			
			while(remaining.length > 0){
				let message = Message.parse(remaining);
				this.push(message)
				console.log(message)
				remaining = remaining.substring(remaining.indexOf('[') + message.length)
			}
			callback()
		})).on("data", (message : Message) => {
			if(this.handler != null){
				this.handler(message);
			} else {
				console.log("No handler for message", message);
			}
		})
	}

	public on(event : "message", handler : (message : Message) => boolean) {
		this.handler = handler;
	}

	public sendMessage(message : Message) : boolean {
		return this.gamesocket.write(message.toNetworkString())
	}
}