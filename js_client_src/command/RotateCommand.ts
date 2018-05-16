import ShipCommand from "./ShipCommand";

export default class RotateCommand extends ShipCommand {
	constructor(deg: number) {
		super("ROTATE", {"DEG": deg})
	}
}