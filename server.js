const gpio = require('rpi-gpio');

const PIR_PIN = 24;

gpio.on('change', function (channel, value) {
	console.log(`Channel ${channel} value is now ${value}`);
});

gpio.setup(PIR_PIN, gpio.DIR_IN, gpio.EDGE_BOTH);
