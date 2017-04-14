yaml = require('js-yaml') ,
cmd=require('node-cmd'),
util = require('util')




function generate(data) {
	return yaml.dump(data) 
}



//Call docker-compose up in path and returns the process pid
function up(path, callback) { 
	
	return cmd.get('cd '+path+'; docker-compose  up -d', callback) 	

}
//Call docker-compose down in path and returns the process pid
function down(path, callback) { 
	
	return cmd.get('cd '+path+'; docker-compose down', callback) 	

}

function exec(path, service, command, callback) {
	return cmd.get('cd '+path+'; docker-compose exec '+ service + ' ' +command, callback)

}

exports.generate = generate
exports.up = up
exports.down = down
exports.exec = exec
