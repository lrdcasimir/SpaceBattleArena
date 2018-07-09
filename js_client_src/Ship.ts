import ShipRegistration from "./ShipRegistration";
import World from "./game/World";
import Client from "./networking/Client";
import Message from "./networking/Message";
import Request from "./networking/Request";
import ShipCommand from "./command/ShipCommand";
import Environment from "./game/Environment";
import * as winston from 'winston';

type RegisterHandler = (world : World) => ShipRegistration;
type NextCommandHandler = (env : Environment) => ShipCommand;
type DisconnectHandler = () => any
export default class Ship {
	private client : Client;
	private id? : number|null;
	private registerHandler? : (world : World) => ShipRegistration;
	private commandHandler? : (env : Environment) => ShipCommand;
	private disconnectHandler? : () => any
	constructor(client : Client) {
		this.client = client
	}

	
	public on(event: "register", handler : RegisterHandler);
	public on(event: "nextCommand", handler : NextCommandHandler);
	public on(event: "disconnect", hand)
	public on(event: string, handler: RegisterHandler|NextCommandHandler) {
		if(event == "register") {
			this.registerHandler = <RegisterHandler>handler;
		}
		if(event == "nextCommand") {
			this.commandHandler = <NextCommandHandler>handler;
		}
		if(event == "disconnect") {
			this.disconnectHandler = <DisconnectHandler>handler;
		}
		
	}

	public launch(){
		this.client.on("message", (message : Message) => {
			winston.silly(`SHIP MESSAGE: ${JSON.stringify(message)}`)
			try { 
				if(message.command == "MWNL2_ASSIGNMENT") {
					winston.info("id of: ", message.data);
					this.id = parseInt(message.data, 10);
					return true;
				}
				if(message.command == 'REQUEST') {
					if(this.registerHandler != null){
						const request = Request.fromMessage(message);
						const reg : ShipRegistration = this.registerHandler(request.world())
						this.sendMessage(new Message([this.id, 0], "REGISTER", reg))

					} else {
						return false;
					}
				}
				if(message.command == 'ENV') {
					if(this.commandHandler != null) {
						const env = Environment.fromMessage(message.data)
						try {
							const cmd = this.commandHandler(env);
							const m = Message.fromCommand(this.id, cmd);
							this.sendMessage(m);
						} catch (e) {
							winston.error(message.data)
							winston.error(e.stack)
						}	
					}
				}
				if(message.command == 'ERROR') {
					winston.error(message.data)
				}
				if(message.command == "MWNL2_DISCONNECT"){
					winston.error("disconnect");
					if(this.disconnectHandler) {
						this.disconnectHandler()
					}
				}
			} catch(e) {
				console.error(e)
				return false;
			}		
		})
		this.client.init();
	}
	

	private sendMessage(m: Message) {
		this.client.sendMessage(m);
	}
}