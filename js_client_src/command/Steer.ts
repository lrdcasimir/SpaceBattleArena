import ShipCommand from "./ShipCommand";

export default class Steer extends ShipCommand {
	constructor(deg : number, block : boolean){
		super("STEER", {"DEG": deg, "BLOCK": block})
	}
}