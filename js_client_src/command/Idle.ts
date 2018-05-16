import ShipCommand from "./ShipCommand";

export default class Idle extends ShipCommand {
	constructor(duration: number) {
		super("IDLE",[{duration: duration}])
	}
}