import React, { useState, useEffect } from "react"
import { FrameViewer } from "./components/FrameViewer"
import { DirectionController } from "./components/DirectionController"
import { init } from "./socket"

export const App = () => {
	const [loading, set_loading] = useState(true)

	useEffect(() => {
		const socket = init()

		socket.on("connect", () => {
			set_loading(false)
		})
	}, [])

	return loading ? (
		<div className="text-lg">Connecting...</div>
	) : (
		<div>
			<DirectionController></DirectionController>
			<FrameViewer></FrameViewer>
		</div>
	)
}
