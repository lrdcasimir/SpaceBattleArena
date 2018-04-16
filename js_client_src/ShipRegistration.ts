export default class ShipRegistration {
	NAME : string;
	IMAGEINDEX : number;
	COLOR: [number, number, number]
	constructor(name : string, image : number, color : [number, number, number]) {
		this.NAME = name;
		this.IMAGEINDEX = image;
		this.COLOR = color;
	}
}