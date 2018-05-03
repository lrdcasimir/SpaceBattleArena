export default class ShipCommand {
	protected constructor(name : string, args : any[keyof string]){
		this.name = name;
		this.args = args;
	}
	protected name : string;
	protected args : string[keyof string];

	public getMessageData() : any[] {
		return [this.name, this.args]
	}
}