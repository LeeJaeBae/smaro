const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');
const cors = require('cors');
const ss = require('socket.io-stream');

const app = express();

app.use(cors());
app.listen(4000);

const options = {
	key: fs.readFileSync(path.resolve('cert.key')),
	cert: fs.readFileSync(path.resolve('cert.crt')),
};

const httpsServer = https.createServer(options, app);

httpsServer.listen(4040, () => console.log('start'));
const io = require('socket.io')(50005, { cors: { origin: '*' } });
io.attach(httpsServer);

const clients = new Map();

io.sockets.on('connection', (socket) => {
	console.log('Client connected!');

	let name = null;
	socket.on('join', (userId) => {
		console.log(`${userId} is joined`);
		socket.join(userId);
	});

	socket.on('message', (messageData) => {
		console.log(`message to ${messageData.targetUser}`);
		io.to(messageData.targetUser).emit('message', messageData.message);
		io.to(messageDate.sendUser).emit('message', messageData.message);
	});

	socket.on('streaming', (stream) => {
		io.to(stream.userId).emit('streaming', stream.stream);
	});

	ss(socket).on('video-chunk', (stream, data) => {
		console.log('VIDEO CHUNK CALLED');
		console.log(typeof data);
		console.log(Object.keys(stream));
		ss(socket).emit('video-chunk', data);
		console.log('STREAMING');
	});
});
