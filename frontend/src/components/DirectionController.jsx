import React, { useState, useEffect } from "react"
import { get_socket } from "../socket"

export const DirectionController = () => {
	const [direction, set_direction] = useState("")

	useEffect(() => {
		const socket = get_socket()

		socket.emit("set_direction", direction)
	}, [direction])

	useEffect(() => {
		addEventListener("keydown", event => {
			const key = event.key

			if (key == "ArrowUp" || key == "w") set_direction("up")
			else if (key == "ArrowLeft" || key == "a") set_direction("left")
			else if (key == "ArrowRight" || key == "d") set_direction("right")
			else if (key == "ArrowDown" || key == "s") set_direction("down")
		})

		addEventListener("keyup", event => {
			const key = event.key

			if (key == "ArrowUp" || key == "w") set_direction("")
			else if (key == "ArrowLeft" || key == "a") set_direction("")
			else if (key == "ArrowRight" || key == "d") set_direction("")
			else if (key == "ArrowDown" || key == "s") set_direction("")
		})
	}, [])

	return (
		<div className="grid grid-cols-3">
			<div></div>
			<DirectionButton direction="up" cur={direction} set={set_direction}>
				↑
			</DirectionButton>
			<div></div>
			<DirectionButton direction="left" cur={direction} set={set_direction}>
				←
			</DirectionButton>
			<div></div>
			<DirectionButton direction="right" cur={direction} set={set_direction}>
				→
			</DirectionButton>
			<div></div>
			<DirectionButton direction="down" cur={direction} set={set_direction}>
				↓
			</DirectionButton>
			<div></div>
		</div>
	)
}

const DirectionButton = props => {
	const { direction, cur, set } = props

	const on_down = () => {
		set(direction)
	}

	const on_up = () => {
		set("")
	}

	return (
		<button
			className={`flex justify-center items-center text-4xl ${
				cur == direction && "bg-red-300"
			}`}
			onMouseDown={on_down}
			onMouseUp={on_up}
			onTouchStart={on_down}
			onTouchEnd={on_up}
		>
			{props.children}
		</button>
	)
}
