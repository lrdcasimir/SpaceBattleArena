import Point from "./Point";

export default class ObjectStatus {
	id : number
	position : Point
	rotation? : number
	rotationSpeed?: number
	currentEnergy?: number
	currentShield?: number
	currentHealth?: number
	inBody? : boolean
	speed: number
	maxSpeed: number
	type: String

	public static fromMessage(result : any) : ObjectStatus {
		return {
			id: result.ID,
			position : {
				x: result.POSITION[0],
				y: result.POSITION[1]
			},
			rotation: result.ROTATION || null,
			currentEnergy: result.CURENERGY || null,
			currentShield: result.CURSHIELD || null,
			inBody: result.INBODY,
			speed : result.SPEED !== undefined ? result.SPEED : null,
			maxSpeed : result.MAXSPEED !== undefined ? result.MAXSPEED : null,
			type : result.TYPE || null
		}
	}
}