import express from 'express';
import fs from 'fs';
import https from 'https';
import path from 'path';
import { io } from './socket';

class App {
	public application: express.Application;
	constructor() {
		this.application = express();
	}
}

const app = new App().application;

app.use(express.static('public'));

app.listen(4000, () => console.log('start'));

const options = {
	key: fs.readFileSync(path.resolve('cert.key')),
	cert: fs.readFileSync(path.resolve('cert.crt')),
};

const httpsServer = https.createServer(options, app);

httpsServer.listen(4040);

io.attach(httpsServer);

const clients = new Map();

io.sockets.on('connection', (socket) => {
	console.log('Client connected!');

	let name: any = null;

	socket.on('init', (initName) => {
		console.log(`Client name registered. ${socket.id} = ${initName}`);

		clients.set(initName, socket.id);
		name = initName;
	});

	socket.on('request_connection', (remoteName, callback) => {
		if (!clients.has(remoteName)) {
			if (typeof callback === 'function') callback('There is no target');
			return;
		}

		console.log(`Client ${name} request connect to ${remoteName}`);

		io.to(clients.get(remoteName)).emit('request_connection', name);
		if (typeof callback === 'function') callback(null);
	});

	socket.on('cancle_connection', (remoteName, callback) => {
		if (!clients.has(remoteName)) {
			if (typeof callback === 'function') callback('There is no target');
			return;
		}

		console.log(`Client ${name} cancel connect with ${remoteName}`);

		io.to(clients.get(remoteName)).emit('cancel_connection', name);
		if (typeof callback === 'function') callback(null);
	});

	socket.on('connection_info', (data, callback) => {
		if (!clients.has(data.remoteName)) {
			if (typeof callback === 'function') callback('There is no target');
			return;
		}

		console.log(
			`Sending connection information from ${name} to ${data.remoteName}, type: ${data.type}`
		);

		io.to(clients.get(data.remoteName)).emit('connection_info', data);
		if (typeof callback === 'function') callback(null);
	});

	socket.on('disconnect', () => {
		console.log(`Client ${name} disconnected`);

		if (clients.has(name)) {
			clients.delete(name);
		}
	});
});
