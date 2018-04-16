import * as net from "net";
import * as through2 from "through2";
import Message from './networking/Message';
import Client from "./networking/Client";
import Ship from "./Ship";
import ShipRegistration from "./ShipRegistration";
import World from "./game/World";

const gamesocket = net.connect(2012, 'localhost',() => {
	console.log("connected");
})

const client = new Client(gamesocket);
const ship = new Ship(client);
ship.on("register", (world : World) => {
	console.log("on register");
	return new ShipRegistration("Mal", 0, [128, 0, 255]);
})
ship.launch()