import Message from "./Message";
import { Socket } from "net";
import * as through2 from "through2";
import * as winston from "winston";
export default class Client {
	private gamesocket : Socket;
	private handler? : ((message : Message) => boolean)|null;

	constructor(socket: Socket) {
		this.gamesocket = socket;
		
	}
	public init() {
		let last = ""
		this.gamesocket.pipe(through2.obj(function (chunk, enc, callback)  {
			const packet : string = chunk.toString('utf8')
			winston.debug(`packet length ${packet.length}`)
			let remaining = (last + packet);
			
			while(remaining.length > 0){
				try {
					let message = Message.parse(remaining);
					if(typeof message === "string") {
						winston.debug(`accum len ${last.length}, returned message length ${message.length}`)
						last = message
						remaining = ""
					} else {
						last = ""
						this.push(message)
						remaining = remaining.substring(remaining.indexOf('[') + message.length)
						winston.debug(`remaining after parse ${remaining.length}`)
					}
					
				} catch (e) {
					console.error(remaining)
					console.error(e.stack)
					break;
				}
				
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