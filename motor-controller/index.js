const io = require("socket.io-client")
const PCA9685 = require("./PCA9685")

const socket = io("ws://localhost:3000")

const pwm = new PCA9685(0x40, false)
pwm.set_pwm_freq(50)

const PWMA = 0
const AIN1 = 1
const AIN2 = 2
const PWMB = 5
const BIN1 = 3
const BIN2 = 4

class MotorDriver {
	run(motor, direction, speed) {
		if (speed > 100) return

		if (motor == 0) {
			pwm.set_dutycycle(PWMA, speed)
			if (direction == 0) {
				pwm.set_level(AIN1, 0)
				pwm.set_level(AIN2, 1)
			} else {
				pwm.set_level(AIN1, 1)
				pwm.set_level(AIN2, 0)
			}
		} else {
			pwm.set_dutycycle(PWMB, speed)
			if (direction == 0) {
				pwm.set_level(BIN1, 0)
				pwm.set_level(BIN2, 1)
			} else {
				pwm.set_level(BIN1, 1)
				pwm.set_level(BIN2, 0)
			}
		}
	}

	stop(motor) {
		if (motor == 0) pwm.set_dutycycle(PWMA, 0)
		else pwm.set_dutycycle(PWMB, 0)
	}
}

// console.log("this is a motor driver test code")
const motor = new MotorDriver()

// console.log("forward 2 s")
// motor.run(0, 0, 100)
// motor.run(1, 0, 100)

// setTimeout(() => {
// 	console.log("backward 2 s")
// 	motor.run(0, 1, 100)
// 	motor.run(1, 1, 100)
// }, 2000)

// setTimeout(() => {
// 	console.log("stop")
// 	motor.stop(0)
// 	motor.stop(1)
// }, 5000)

socket.on("connect", () => {
	socket.on("get_direction", direction => {
		if (direction == "") {
			motor.stop(0)
			motor.stop(1)
		} else if (direction == "left") {
			motor.run(0, 0, 25)
			motor.run(1, 1, 25)
		} else if (direction == "right") {
			motor.run(0, 1, 25)
			motor.run(1, 0, 25)
		} else if (direction == "up") {
			motor.run(0, 0, 50)
			motor.run(1, 0, 50)
		} else if (direction == "down") {
			motor.run(0, 1, 50)
			motor.run(1, 1, 50)
		}
	})
})
