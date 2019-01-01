import * as net from 'net'
import Client from "../networking/Client";
import Ship from "../Ship";
import ShipRegistration from "../ShipRegistration";
import World from "../game/World";
import Thrust from "../command/Thrust";
import Radar from "../command/Radar";
import Rotate from "../command/Rotate";
import Point from "../game/Point";
import {targetVector, cartesianDistance} from "../game/Point";
import Steer from "../command/Steer";
import * as winston from 'winston';
import Idle from '../command/Idle';
import Environment from '../game/Environment';
import FireTorpedo from '../command/FireTorpedo';

winston.configure({
	level: 'info',
	transports: [new winston.transports.Console()]
})
let socket = net.connect(2012, 'localhost', () => {
	winston.info('connected')
})

let client = new Client(socket)
let ship = new Ship(client)
let initialRotation = null
let scanned = false
let aggro = false
let evade = false
let evadeAngle : number = 0
ship.on("register", (world) => {
	initialRotation = null
	scanned = false
	aggro = false
	return new ShipRegistration("Jean Luc Picard", 3, [100, 0, 256])

})
ship.on("disconnect", () => process.exit(0))
ship.on("nextCommand", (env: Environment) => {
	if(env.shipdata.currentEnergy && env.shipdata.currentEnergy < 8) {
		winston.error("idle")
		aggro = false
		scanned = false
		return new Idle(2.1)
	}
	if(!scanned) {
		scanned = true
		return new Radar(5)
	}
	if(env.radardata) {
		
		let shipPosition = env.shipdata.position
		let closest = env.radardata.objects
			
			.reduce((last, next) => {
				winston.debug(`last: ${JSON.stringify(last)} next: ${JSON.stringify(next)}, type ${next.type}  `)
				if(last != null) {
					winston.error(`closest ${cartesianDistance(shipPosition, last.position)}`)
				}
				return last == null ? next :  cartesianDistance(shipPosition, last.position) < cartesianDistance(shipPosition, next.position) ? 
					last : next
			 }, null)
	 
		winston.error(`closest ${JSON.stringify(closest)}`, (e) => {
			if(e) {
				process.stderr.write(JSON.stringify(e.stack))
			}
		})
		if(closest.type == 'Asteroid' || closest.type == 'Torpedo') {
			aggro = true
		} else {
			evade = true
			evadeAngle = (targetVector(shipPosition, closest.position) + 30) % 360
		}
		let v = targetVector(shipPosition, closest.position)
		if(env.shipdata.rotation - v < 2){ 
			return new FireTorpedo("F")
		} else if ((v = 180) % 360 < 2){
			return new FireTorpedo('B')
		}
		return new Rotate(env.shipdata.rotation - v)
	}
	if(aggro && env.shipdata.currentEnergy > 70) {
		aggro = false
		scanned = false
		return new FireTorpedo("F")
	}
	if(evade && env.shipdata.speed < (env.shipdata.maxSpeed / 4)
		&& (Math.abs(env.shipdata.rotation - evadeAngle)) < 2 ) {
		winston.error(`speed: ${env.shipdata.speed}`)
		winston.error(`rotation ${env.shipdata.rotation} evadeAngle ${evadeAngle}`)
		return new Thrust("B", 3.1, 0.9, true)
	}
	if(evade && env.shipdata.rotation && Math.abs(env.shipdata.rotation - evadeAngle) > 2){
		winston.error(`speed ${env.shipdata.speed} rotation ${env.shipdata.rotation} evadeAngle ${evadeAngle}`)
		return new Rotate(env.shipdata.rotation -  evadeAngle)
	}
	let targetRot = Math.abs(env.shipdata.rotation - ((initialRotation + 180) % 360))

	if(env.shipdata.speed > 2 && targetRot < 3){
		winston.error("retro")
		scanned = false
		winston.info(`energy ${env.shipdata.currentEnergy}`)
		return new Thrust("B", 0.2, 0.5, true)
	}
	evade = false
	return new Idle(0.5)
	
})
ship.launch()
