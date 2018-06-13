import RadarResults from "./RadarResults";
import ObjectStatus from "./ObjectStatus";
import * as winston from 'winston';
import * as JSON5 from 'json5'
export default class Environment {
	messages : string[]
	radarlevel: number
	radardata: RadarResults
	shipdata: ObjectStatus

	static fromMessage(message: string) : Environment {
		try {
			const env = JSON5.parse(message)
			winston.debug(`shipdata: ${JSON.stringify(env.SHIPDATA)}`)
			return {
				messages: env.MESSAGES,
				radarlevel: env.RADARLEVEL as number,
				radardata: env.RADARDATA == null ? null : RadarResults.fromMessage(env.RADARDATA),
				shipdata: ObjectStatus.fromMessage(env.SHIPDATA)
			}
		} catch (e) {
			winston.error(e)
		}
		
	}
}