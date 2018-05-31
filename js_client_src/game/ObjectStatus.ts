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
}