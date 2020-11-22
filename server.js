const axios = require('axios');
const gpio = require('rpi-gpio');

const PIR_I_PIN = 24;
const PIR_O_PIN = 40;

let paths = [];

gpio.setup(PIR_I_PIN, gpio.DIR_IN, gpio.EDGE_BOTH);
gpio.setup(PIR_O_PIN, gpio.DIR_IN, gpio.EDGE_BOTH);
gpio.on('change', function (channel, value) {

	if (channel == 24 && value == true && !paths.includes(24)) {
		paths.push(24);
	} else if (channel == 40 && value == true && !paths.includes(40)) {
		paths.push(40);
	}

	if (paths.includes(24) && paths.includes(40)) {
		// post	
		const payload = {
			node: 'alpha',
			start: paths[0],
			end: paths[1]
		};
	
		const options = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		axios
			.post('http://beta/api/path', payload, options)
			.catch(error => {
				console.error(error);
			});
	
		// reset data
		paths = [];
	}
});

