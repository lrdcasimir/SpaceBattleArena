import ShipCommand from "../command/ShipCommand";

export default class Message {
	id: [number, number];
	command: string;
	data: any;
	length?: number|null;
	constructor(id : [number, number], command : string, data : any, length? : number|null) {
		this.id = id;
		this.command = command;
		this.data = data;
		this.length = length;
	}
	public toNetworkString() : string {
		const idString = JSON.stringify(this.id);
		const command  = JSON.stringify(this.command);
		const data = this.data.getMessageData ? JSON.stringify(this.data.getMessageData()) : JSON.stringify(this.data);
		const message = `${idString},${command},${data}`;
		return `${message.length}${message}`;
	}

	public static fromCommand(shipId : number, command : ShipCommand) : Message  {
		return new Message([shipId, 0], "SCMD", command.getMessageData())
	}

	static parse (packet: string) : Message {
		const messageLength = Message.getMessageLength(packet);
		const messageString = Message.getMessageString(packet, messageLength);
		const command = Message.getCommand(messageString);
		return new Message( Message.getMessageId(messageString),
			command, Message.getData(messageString, command.length),
			messageLength);
	}

	private static getMessageString (message : string , messageLength : number) : string {
		return message.substr(message.indexOf('['), messageLength);
	};

	private static getMessageLength (message : string) : number {
		if (message.indexOf('[') < 0) {
			return -1;
		}
		return parseInt(message.substring(0, message.indexOf['[']), 10);
	};

	private static getMessageId (message : string) : [number, number] {
		return JSON.parse(message.substring(0, message.indexOf(']') + 1));
	};

	private static getCommand (message : string) : string {
		try {
			return JSON.parse(message.substring(message.indexOf(']') + 2, message.indexOf('"', message.indexOf('"') + 1) + 1));
		} catch(e) {
			console.error(e)
			console.error(message)
		}
	};

	private static getData(message : string, commandLength : number) : string { 
		const idLength = message.indexOf(']') + 1
		return message.substring(idLength + commandLength + 4);
	}

}