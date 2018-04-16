import Message from "./Message";
import World from "../game/World";

export default class Request {
	imagelength : number;
	worldwidth: number;
	worldheight: number;
	gamename: string;
	constructor(imagelength : number, worldwidth : number, worldheight : number, gamename : string) {
		this.imagelength = imagelength;
		this.worldwidth = worldwidth;
		this.worldheight = worldheight;
		this.gamename = gamename;
	}

	public world() : World {
		return {
			numImages: this.imagelength,
			width: this.worldwidth,
			height: this.worldheight,
			gametype: this.gamename
		};
	}
	public static fromMessage(message : Message) : Request {
		if(message.command != 'REQUEST'){
			throw new Error(`${message.command} is not a REQUEST`)
		}
		const requestMap = JSON.parse(message.data);
		return new Request(requestMap.IMAGELENGTH, requestMap.WORLDWIDTH,
			requestMap.WORLDHEIGHT,requestMap.GAMENAME);
		
	}
}