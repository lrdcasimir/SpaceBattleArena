 export default class RadarResults {
	objects : ObjectStatus[]
}

class ObjectStatus {
	id : number
	position : Point
}

class Point {
	x : number;
	y : number;
}