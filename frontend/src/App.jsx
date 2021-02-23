import React, { useState, useEffect } from "react"
import { io } from "socket.io-client"
import { FrameViewer } from "./components/FrameViewer"

export const App = () => {
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const socket = io("10.32.239.124:3000")
		socket.on("connect", () => {
			socket.on("get_frame", frame => {
				console.log(frame)
			})
			setLoading(false)
		})
	}, [])

	return loading ? <div className="text-lg">Connecting...</div> : <div></div>
}
