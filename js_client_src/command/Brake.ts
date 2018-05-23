import ShipCommand from "./ShipCommand";

export default class Brake extends ShipCommand {
	constructor(power : number) {
		super("BRAKE", {"PER" : power})
	}
}