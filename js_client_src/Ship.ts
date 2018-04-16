import ShipRegistration from "./ShipRegistration";
import World from "./game/World";
import Client from "./networking/Client";
import Message from "./networking/Message";
import Request from "./networking/Request";

export default class Ship {
	private client : Client;
	private id? : number|null;
	private registerHandler? : (world : World) => ShipRegistration;
	
	constructor(client : Client) {
		this.client = client
	}
	public on(event: "register", handler : (world : World) => ShipRegistration) {
		this.registerHandler = handler;
	}

	public launch(){
		this.client.on("message", (message : Message) => {
			console.log("ship message ", message);
			try { 
				if(message.command == "MWNL2_ASSIGNMENT") {
					console.log("id of: ", message.data);
					this.id = parseInt(message.data, 10);
					return true;
				}
				if(message.command == 'REQUEST') {
					if(this.registerHandler != null){
						const request = Request.fromMessage(message);
						const reg : ShipRegistration = this.registerHandler(request.world())
						this.client.sendMessage(new Message([this.id, 0], "REGISTER", reg))

					} else {
						return false;
					}
				}
			} catch(e) {
				return false;
			}		
		})
		this.client.init();
	}
	
}