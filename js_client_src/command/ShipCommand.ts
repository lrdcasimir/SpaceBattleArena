interface CommandArgs {
	[key: string] : string | number | boolean
}
export default class ShipCommand {
	protected constructor(name : string, args : CommandArgs){
		this.name = name;
		this.args = args;
	}
	protected name : string;
	protected args : CommandArgs;

	public getMessageData() : any[] {
		return [this.name, this.args]
	}
}