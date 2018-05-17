import ShipCommand from "./ShipCommand";

export default class Rotate extends ShipCommand {
	constructor(deg: number) {
		super("ROT", {"DEG": deg})
	}
}