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

// Peer variables
let startPeer;
let partnerMousePosition;
let myMousePosition = {};

// What interaction are we running?
// We start with interaction 1
let state = 1;

// Use for developing without partner
// This will mirror one user's mouse
// and will ingnore the mouse over peer connection
let mirror = false;

// Globals for lerping in heartbeat animation
let step = 0.1;
let amount = 0;

// Globals for growing animation
const origSize = 50;
let size = origSize;

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
  WebRTCPeerClient.initSocketClient('https://8c6c8ed51c3c.ngrok.io');

  // Start the peer client
  WebRTCPeerClient.initPeerClient();

  navigator.getUserMedia(
   { video: true, audio: true },
   stream => {
     const localVideo = document.getElementById("local-video");
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

  // Get the incoming data from the peer connection
  const newData = WebRTCPeerClient.getData();

  // Check if there's anything in the data;
  if (newData === null) {
    return;
    // If there is data
  } else {
    // Get the mouse data from newData.data
    // Note: newData.data is the data sent by user
    // Note: newData.userId is the peer ID of the user
    partnerMousePosition = newData.data;
  }

  // Draw a white background with alpha of 50
  background(255, 50);

  // Don't draw the stroke
  noStroke();
}
