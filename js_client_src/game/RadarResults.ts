import ObjectStatus from "./ObjectStatus";

 export default class RadarResults {
	objects : ObjectStatus[]

	public static fromMessage(results: any) : RadarResults {
		return results.RADARDATA.map(result => ({
			id: result.ID,
			position : {
				x: result.X,
				y: result.Y
			}
		}))
	}
}
