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
				shipdata: {
					id: env.SHIPDATA.ID as number,
					position: {
						x: env.SHIPDATA.POSITION[0],
						y: env.SHIPDATA.POSITION[1]
					},
					rotation: env.SHIPDATA.ROTATION || null,
					rotationSpeed: env.SHIPDATA.ROTATIONSPEED || null,
					currentEnergy: env.SHIPDATA.CURENERGY !== undefined ? env.SHIPDATA.CURENERGY : null,
					currentShield: env.SHIPDATA.CURSHIELD || null,
					inBody: env.SHIPDATA.INBODY || null,
					speed: env.SHIPDATA.SPEED !== undefined ? env.SHIPDATA.SPEED : null,
					maxSpeed: env.SHIPDATA.MAXSPEED || null
				}
			}
		} catch (e) {
			winston.error(e)
		}
		
	}
}