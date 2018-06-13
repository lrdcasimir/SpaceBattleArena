export interface Point {
	x : number;
	y : number;
}

export function cartesianDistance(first: Point, second: Point) {
	let xsq = Math.pow(first.x - second.x, 2)
	let ysq = Math.pow(first.y - second.y, 2)
	return Math.sqrt(xsq + ysq)
}

export function targetVector(origin: Point, target: Point) {
	let deltax = target.x - origin.x
	let deltay = -1 * (target.y - origin.y)
	return (((Math.PI/180) * Math.atan2(deltay, deltax)) + 360) % 360;
}