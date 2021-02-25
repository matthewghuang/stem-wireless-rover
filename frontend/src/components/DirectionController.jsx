import React, { useState } from "react"

export const DirectionController = () => {
	const [show_position, set_show_position] = useState(false)
	const [position, set_position] = useState({ x: null, y: null })

	const on_touch_start = () => set_show_position(true)

	const on_touch_end = () => {
		set_show_position(false)
	}

	const on_touch_move = event => {
		const { clientX, clientY } = event
		console.log(clientX, clientY)
	}

	const on_mouse_down = () => set_show_position(true)

	const on_mouse_up = () => set_show_position(false)

	const on_mouse_move = event => {
		const { offsetX, offsetY } = event.nativeEvent
		set_position({ x: offsetX, y: offsetY })
	}

	return (
		<svg width="250" height="250">
			<circle
				cx="125"
				cy="125"
				r="125"
				fill="gray"
				onTouchStart={on_touch_start}
				onTouchEnd={on_touch_end}
				onTouchMove={on_touch_move}
				onMouseDown={on_mouse_down}
				onMouseUp={on_mouse_up}
				onMouseMove={on_mouse_move}
			></circle>
			{show_position && (
				<circle
					cx={position.x}
					cy={position.y}
					r="10"
					fill="black"
					style={{ pointerEvents: "none" }}
				></circle>
			)}

			<line
				x1={125}
				x2={position.x}
				y1={125}
				y2={position.y}
				style={{ stroke: "rgb(255, 0, 0)", strokeWidth: "2" }}
			></line>

			<line
				x1={position.x}
				x2={position.x}
				y1={125}
				y2={position.y}
				style={{ stroke: "rgb(255, 0, 0)", strokeWidth: "2" }}
			></line>

			<line
				x1={125}
				x2={position.x}
				y1={125}
				y2={125}
				style={{ stroke: "rgb(255, 0, 0)", strokeWidth: "2" }}
			></line>
		</svg>
	)
}
