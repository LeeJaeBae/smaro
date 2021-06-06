import express from 'express';
import fs from 'fs';
import https from 'https';
import path from 'path';
// import { io } from './socket';
import cors from 'cors';

class App {
	public application: express.Application;
	constructor() {
		this.application = express();
	}
}

const app = new App().application;
app.use(cors());
app.use(express.static('public'));

app.listen(4000, () => console.log('start'));

const options = {
	key: fs.readFileSync(path.resolve('cert.key')),
	cert: fs.readFileSync(path.resolve('cert.crt')),
};

const httpsServer = https.createServer(options, app);

httpsServer.listen(4040);
const io = require('socket.io')(httpsServer, { cors: { origin: '*' } });
io.attach(httpsServer);

const clients = new Map();

io.sockets.on('connection', (socket: any) => {
	console.log('Client connected!');

	let name: string | null = null;
	socket.on('join', (userId: string) => {
		console.log(`${userId} is joined`);
		socket.join(userId);
	});

	socket.on('message', (messageData: { userId: string; message: string }) => {
		console.log(`message to ${messageData.userId}`);
		io.to(messageData.userId).emit('message', messageData.message);
	});

	socket.on('video', (stream: { userId: string; stream: any }) => {
		console.log(stream.userId, stream);
		io.to(stream.userId).emit('video', stream.stream);
	});
});
