import * as net from 'net'
import Client from "../networking/Client";
import Ship from "../Ship";
import ShipRegistration from "../ShipRegistration";
import World from "../game/World";
import Thrust from "../command/Thrust";
import Radar from "../command/Radar";
import Rotate from "../command/Rotate";
import {Point, targetVector, cartesianDistance} from "../game/Point";
import Steer from "../command/Steer";
import * as winston from 'winston';
import Idle from '../command/Idle';
import Environment from '../game/Environment';
import FireTorpedo from '../command/FireTorpedo';

winston.configure({
	level: "info",
	transports: [new winston.transports.Console()]
})
let socket = net.connect(2012, 'localhost', () => {
	winston.debug('connected')
})

let client = new Client(socket)
let ship = new Ship(client)
let initialRotation = null
let scanned = false
let aggro = false
ship.on("register", (world) => {
	initialRotation = null
	scanned = false
	aggro = false
	return new ShipRegistration("Jean Luc Picard", 3, [100, 0, 256])
})
ship.on("disconnect", () => process.exit(0))
ship.on("nextCommand", (env: Environment) => {
	if(env.shipdata.currentEnergy && env.shipdata.currentEnergy < 4) {
		winston.info("idle")
		return new Idle(2.0)
	}
	if(!scanned) {
		scanned = true
		return new Radar(5)
	}
	if(env.radardata) {
		aggro = true
		let shipPosition = env.shipdata.position
		let closest = env.radardata.objects
			.map(o => o.position)
			.reduce((last, next) => 
				cartesianDistance(shipPosition, last) > cartesianDistance(shipPosition, next) ? 
					last : next , 
					{x: 0, y: 0})
		let v = targetVector(shipPosition, closest)
		return new Rotate(env.shipdata.rotation - v)
	}
	if(aggro) {
		aggro = false
		return new FireTorpedo("F")
	}
	if(env.shipdata.speed < env.shipdata.maxSpeed 
		&& (initialRotation == null || env.shipdata.rotation == initialRotation)) {
		winston.info(`speed: ${env.shipdata.speed}`)
		initialRotation = env.shipdata.rotation
		return new Thrust("B", 3.1, 0.9, true)
	}
	if(env.shipdata.rotation && env.shipdata.rotation === initialRotation){
		return new Rotate(180)
	}
	let targetRot = Math.abs(env.shipdata.rotation - ((initialRotation + 180) % 360))

	if(env.shipdata.speed > 2 && targetRot < 3){
		winston.info("retro")
		scanned = false
		if(env.shipdata.currentEnergy > 24) {
			return new FireTorpedo("F")
		}
		winston.info(`energy ${env.shipdata.currentEnergy}`)
		return new Thrust("B", 0.2, 0.5, true)
	}
	return new Idle(0.5)
	
})
ship.launch()
