import * as net from "net";
import * as through2 from "through2";
import Message from './networking/Message';
import Client from "./networking/Client";
import Ship from "./Ship";
import ShipRegistration from "./ShipRegistration";
import World from "./game/World";
import Thrust from "./command/Thrust";
import Radar from "./command/Radar";
import Rotate from "./command/Rotate";

const gamesocket = net.connect(2012, 'localhost', () => {
	console.log("connected");
})

const client = new Client(gamesocket);
const ship = new Ship(client);
ship.on("register", (world : World) => {
	console.log("on register");
	return new ShipRegistration("Mal", 1, [128, 0, 255]);
})
let useRadar: boolean = false
let useThrust: boolean = false
ship.on("nextCommand", (env) =>  {
	if(!useRadar && !useThrust) {
		useThrust = true;
		return new Rotate(45)
		
	} else if(!useRadar) {
		useRadar = true
		return new Thrust("B", 3.1, 0.9, true)
	}else {
		useRadar = false;
		useThrust = false;
		return new Radar(2);
	}
});
ship.launch()