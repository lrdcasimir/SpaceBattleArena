import ObjectStatus from "./ObjectStatus";

 export default class RadarResults {
	objects : ObjectStatus[]

	public static fromMessage(results: any) : RadarResults {
		const objects : ObjectStatus[] = results ?
			results.map(ObjectStatus.fromMessage) : [];
		return {
			objects
		}
	}
}
