// The Body Everywhere and Here Class 2: Example 1 — Mouse over webRTC
// https://github.com/lisajamhoury/The-Body-Everywhere-And-Here/

// This example allows for two users to draw on the same p5 canvas
// using webRTC peer connections. By default it runs over localhost.
// Use with ngrok pointing to localhost:80 to run over the public internet.
// Use keys 1-4 to switch between four animation states

// p5 code goes here

// Include this for to use p5 autofill in vscode
// See https://stackoverflow.com/questions/30136319/what-is-reference-path-in-vscode
/// <reference path="../shared/p5.d/p5.d.ts" />
/// <reference path="../shared/p5.d/p5.global-mode.d.ts" />

const localVideo = document.getElementById("local-video");

// Setup() is a p5 function
// See this example if this is new to you
// https://p5js.org/examples/structure-setup-and-draw.html
function setup() {
  // Make a p5 canvas 500 pixels wide and 500 pixels high
  createCanvas(500, 500);

  // Fix the framerate to throttle data sending and receiving
  frameRate(30);

  // Set to true to turn on logging for the webrtc client
  WebRTCPeerClient.setDebug(false);

  // Start socket client automatically on load
  // By default it connects to http://localhost:80
  // WebRTCPeerClient.initSocketClient();

  // To connect to server over public internet pass the ngrok address
  // See https://github.com/lisajamhoury/WebRTC-Simple-Peer-Examples#to-run-signal-server-online-with-ngrok
  WebRTCPeerClient.initSocketClient('https://b37a46966008.ngrok.io');

  // Start the peer client
  const stream = localVideo.srcObject;
  WebRTCPeerClient.initPeerClient(stream);

  navigator.getUserMedia(
   { video: true, audio: true },
   stream => {
     if (localVideo) {
       localVideo.srcObject = stream;
     }
   },
   error => {
     console.error(error.message);
   }
  );
}

function draw() {
  // Only proceed if the peer connection is started
  if (!WebRTCPeerClient.isPeerStarted()) {
    return;
  }

  // WebRTCPeerClient.sendData();

  // Get the incoming data from the peer connection
  const newData = WebRTCPeerClient.getData();

  sendVideo();

  // Draw a white background with alpha of 50
  background(255, 50);

  // Don't draw the stroke
  noStroke();
}

function sendVideo() {
  // const peerConnection = new RTCPeerConnection(config);
  // peerConnections[id] = peerConnection;
    
  // peerConnection.onicecandidate = event => {
  //   if (event.candidate) {
  //     socket.emit("candidate", id, event.candidate);
  //   }
  // };

  // peerConnection
  //   .createOffer()
  //   .then(sdp => peerConnection.setLocalDescription(sdp))
  //   .then(() => {
  //     socket.emit("offer", id, peerConnection.localDescription);
  //   });
}
