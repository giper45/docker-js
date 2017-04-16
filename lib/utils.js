const cmd = require('node-cmd') 

//Change data,err convention in err ,data convention
exports.cmd = function(command, callback) {
	return cmd.get(command, function(data, err) { callback(err, data) } ) 
}
