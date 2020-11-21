const gpio = require('rpi-gpio');

const PIR_I_PIN = 24;
const PIR_O_PIN = 40;

let paths = [];

gpio.on('change', function (channel, value) {
	
	if (channel == 24 && value == true && !paths.include(24)) {
		paths.push(24);
	} else if (channel == 40 && value == true && !paths.include(40)) {
		paths.push(40);
	}

	if (paths.include(24) && paths.include(40)) {
		// post	
		const payload = {
			node: 'beta',
			start: paths[0],
			end: path[1]
		};
		
		axois
			.post('http://beta.local/api/path', payload)
			.catch(error => {
				console.error(error);
			});
	
		// reset data
		paths = [];
	}
});

gpio.setup(PIR_I_PIN, gpio.DIR_IN, gpio.EDGE_BOTH);
gpio.setup(PIR_O_PIN, gpio.DIR_IN, gpio.EDGE_BOTH);
