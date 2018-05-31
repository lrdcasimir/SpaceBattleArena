import ShipCommand from "./ShipCommand";

export default class FireTorpedo extends ShipCommand {
	constructor(direction : "F" | "B") {
		super("FIRE", {"DIR" : direction})
	}
}