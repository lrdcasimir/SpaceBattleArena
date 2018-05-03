import ShipCommand from "./ShipCommand";

export default class Thrust extends ShipCommand {
	constructor(dir : string, duration : number, power : number, block : boolean) {
		super("THRST", {
			"DIR" : dir,
			"DUR" : duration,
			"PER" : power,
			"BLOCK" : block
		});
	}
}