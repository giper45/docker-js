yaml = require('js-yaml') ,
util = require('util')




function generate(data) {
	return yaml.dump(data) 
}


exports.generate = generate
