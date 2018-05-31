import * as winston from 'winston';
winston.configure({
	level: 'info',
	transports : [
		new winston.transports.Console()
	]
})
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
import Point from "./game/Point";
import Steer from "./command/Steer";

const gamesocket = net.connect(2012, 'localhost', () => {
	console.log("connected");
})

const client = new Client(gamesocket);
const ship = new Ship(client);
ship.on("register", (world : World) => {
	console.log("registered")
	return new ShipRegistration("Mal", 1, [128, 0, 255]);
})
let useRadar: boolean = false
let useThrust: boolean = false
let useSteer: boolean = false
ship.on("nextCommand", (env) =>  {
	if(env.radardata && env.radardata.objects.length > 0) {
		console.log("cartesian distance: " + cartesianDistance(env.radardata.objects[0].position, env.shipdata.position))
	}
	if(!useRadar && !useThrust) {
		useThrust = true;
		return new Rotate(45)
		
	} else if(!useRadar) {
		useRadar = true
		return new Thrust("B", 3.1, 0.9, true)
	} else if(!useSteer) {
		useSteer = true
		return new Radar(2);
	} else {
		useRadar = false
		useThrust = false
		useSteer = false
		return new Steer(-20, false)
	}
});

function cartesianDistance(a: Point, b: Point) {
	const dx = a.x - b.x
	const dy = a.y - b.y
	return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
}
ship.launch()