let localStream = null;

if (navigator.getUserMedia) {
	navigator.getUserMedia(
		{ video: true, audio: true },
		(resultStream) => {
			localStream = resultStream;
			$('#video-preview')[0].srcObject = resultStream;
		},
		(error) => {
			console.log('웹캠 권한을 거부하였거나 오류가 발생했습니다.');
			console.error(error);
		}
	);
} else {
	console.log('브라우저가 웹캠을 지원하지 않습니다.');
}

let socket = null;
$('#connect').on('click', (event) => {
	let name = null;
	name = $('#name').val();

	if (!name) {
		alert('이름을 입력해주세요!');
		return;
	}

	socket = io();

	socket.on('connect', () => {
		$('#connect').text('접속 완료');
		$('#connect').prop('disabled', true);
		$('#request').prop('disabled', false);

		socket.emit('init', name);
	});

	socket.on('disconnect', () => {
		$('#connect').text('접속 끊김');
	});

	// 연결 요청을 받은 경우
	socket.on('request_connection', (remoteName) => {
		requestConnection(remoteName);
	});

	// 상대방이 연결 요청을 거절한 경우.
	socket.on('cancel_connection', () => {
		alert('상대방이 연결을 거절하였습니다.');
	});

	// 연결 중에 통신하는 내용.
	socket.on('connection_info', (data) => {
		connectionInfo(data);
	});
});

let peerConnection = null;

// PeerConnection을 생성하는 부분은 2곳에서 사용되므로 함수로 작성하자.
const createPeerConnection = () => {
	if (peerConnection) return;

	// STUN 서버는 Google의 공개된 서버를 사용한다.
	peerConnection = new RTCPeerConnection({
		iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
	});

	peerConnection.onicecandidate = (event) => {
		// 이 이벤트가 발생하면 ICE 교환을 시작해야 한다.
		onIceCandidate(event);
	};

	peerConnection.ontrack = (event) => {
		// 원격에서 스트림(트랙)을 받으면 그 스트림을 화면에 표시해줘야 한다.
		$('#video-remote')[0].srcObject = event.streams[0];
	};
};
