import ShipCommand from "./ShipCommand";

export default class Radar extends ShipCommand {
	constructor(level: number, target?: number){
		let args = target ?
			 {"TARGET": target, "LVL": level} : 
			 {"LVL": level, "TARGET": 0}
		super("RADAR", args)
	}
}