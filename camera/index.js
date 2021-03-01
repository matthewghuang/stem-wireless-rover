const node_webcam = require("node-webcam")
const io = require("socket.io-client")

const socket = io("ws://localhost:3000")

const opts = {
	width: 1280,
	height: 720,
	quality: 100,
	frames: 60,
	saveShots: true,
	output: "jpeg",
	device: false,
	callbackReturn: "base64",
	verbose: false
}

const webcam = node_webcam.create(opts)

socket.on("connect", () => {
	setInterval(() => {
		webcam.capture("frame", (err, data) => socket.send("set_frame", data))
	}, 1000 / 30)
})
