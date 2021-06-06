import React, { LegacyRef, MouseEventHandler, Ref, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
const socket = io('https://localhost:4040');
const App: React.FC = () => {
	const [userId, setUserId] = useState('test');
	const [mediaStream, setMediaStream] = useState<any>(undefined);
	const text: LegacyRef<HTMLInputElement> = useRef(null);
	const media: LegacyRef<HTMLVideoElement> = useRef(null);
	const targetMedia: LegacyRef<HTMLVideoElement> = useRef(null);
	const getMedia = async () => {
		const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
		media.current!.srcObject = mediaStream;
		return mediaStream;
	};

	useEffect(() => {
		socket.emit('join', userId);
		socket.on('message', (message) => {
			console.log(message);
		});
		socket.on('video', (stream) => {
			console.log(stream);
			// if (stream) targetMedia.current!.srcObject = stream;
		});
		setMediaStream(getMedia());
	}, []);

	useEffect(() => {
		if (mediaStream) {
			socket.emit('video', { userId: 'test', stream: mediaStream });
		}
	}, [mediaStream]);

	const handleClick: MouseEventHandler<HTMLInputElement> = (e) => {
		socket.emit('message', { userId: userId, message: text.current!.value });
	};
	return (
		<div className='App'>
			<input type='text' ref={text} />
			<input type='button' value='test' onClick={handleClick} />
			<video ref={media} id='local' autoPlay={true} width='480px' height='480px' />
			<video ref={targetMedia} id='target' autoPlay={true} width='480px' />
		</div>
	);
};

export default App;
