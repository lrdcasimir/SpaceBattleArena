import ShipCommand from "./ShipCommand";

export default class Thrust extends ShipCommand {
	constructor(dir : "L" | "F" | "R" | "B" , duration : number, power : number, block : boolean) {
		super("THRST", {
			"DIR" : dir,
			"DUR" : duration,
			"PER" : power,
			"BLOCK" : block
		});
	}
}