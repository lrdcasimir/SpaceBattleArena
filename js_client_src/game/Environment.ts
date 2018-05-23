import RadarResults from "./RadarResults";
import ObjectStatus from "./ObjectStatus";
export default class Environment {
	messages : string[]
	radarlevel: number
	radardata: RadarResults
	shipdata: ObjectStatus

	static fromMessage(message: string) : Environment {
		const env = JSON.parse(message)
		return {
			messages: env.MESSAGES,
			radarlevel: env.RADARLEVEL as number,
			radardata: env.RADARDATA == null ? null : RadarResults.fromMessage(env.RADARDATA),
			shipdata: {
				id: env.SHIPDATA.ID as number,
				position: {
					x: env.SHIPDATA.POSITION[0],
					y: env.SHIPDATA.POSITION[1]
				}
			}
		}
	}
}