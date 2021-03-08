const i2c = require("i2c-bus")

const __MODE1 = 0x00
const __PRESCALE = 0xfe
const __LED0_ON_L = 0x06
const __LED0_ON_H = 0x07
const __LED0_OFF_L = 0x08
const __LED0_OFF_H = 0x09

const sleep = ms => {
	return new Promise((res, rej) => {
		setTimeout(() => {
			res()
		}, ms)
	})
}

class PCA9685 {
	constructor(address, debug) {
		this.bus = i2c.openSync(1)
		this.address = address
		this.debug = debug

		if (this.debug) console.log("Resetting PCA9685")

		this.write(__MODE1, 0x00)
	}

	write(reg, value) {
		this.bus.writeByteSync(this.address, reg, value)

		if (this.debug)
			console.log(
				`I2C: Write 0x${value.toString(16)} to register 0x${reg.toString(16)}`
			)
	}

	read(reg) {
		const res = this.bus.readByteSync(this.address, reg)

		if (this.debug)
			console.log(
				`I2C: Device 0x${this.address.toString(16)} returned 0x${(
					res & 0xff
				).toString(16)} from register 0x${reg.toString(16)}`
			)

		return res
	}

	async set_pwm_freq(freq) {
		let prescaleval = 25000000.0
		prescaleval = prescaleval / 4096
		prescaleval = prescaleval / freq
		prescaleval = prescaleval - 1.0

		if (this.debug) {
			console.log(`Setting PWM frequency to ${freq} hz`)
			console.log(`Estimated pre-scale: ${prescaleval}`)
		}

		const prescale = Math.floor(prescaleval + 0.5)

		if (this.debug) console.log(`Final pre-scale: ${prescale}`)

		const old_mode = this.read(__MODE1)
		const new_mode = (old_mode & 0x7f) | 0x10

		this.write(__MODE1, new_mode)
		this.write(__PRESCALE, Math.floor(prescale))
		this.write(__MODE1, old_mode)

		await sleep(5)

		this.write(__MODE1, 0x80)
	}

	set_pwm(channel, on, off) {
		this.write(__LED0_ON_L + 4 * channel, on & 0xff)
		this.write(__LED0_ON_H + 4 * channel, 0xff & (on >> 8))
		this.write(__LED0_OFF_L + 4 * channel, off & 0xff)
		this.write(__LED0_OFF_H + 4 * channel, 0xff & (off >> 8))

		if (this.debug)
			console.log(`channel: ${channel}  LED_ON: ${on}  LED_OFF: ${off}`)
	}

	set_dutycycle(channel, pulse) {
		this.set_pwm(channel, 0, Math.floor(pulse * Math.floor(4096 / 100)))
	}

	set_level(channel, value) {
		if (value == 1) this.set_pwm(channel, 0, 4095)
		else this.set_pwm(channel, 0, 0)
	}
}

module.exports = PCA9685
