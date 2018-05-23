import ObjectStatus from "./ObjectStatus";

 export default class RadarResults {
	objects : ObjectStatus[]

	public static fromMessage(results: any) : RadarResults {
		const objects = results ? results.map(result => 
			({
				id: result.ID,
				position : {
					x: result.POSITION[0],
					y: result.POSITION[1]
				}
			})) : [];
		return {
			objects
		}
	}
}
