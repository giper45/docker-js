yaml = require('js-yaml') ,
utils = require('./utils'),
util = require('util'),
docker = require('./docker')




function generate(data) {
	return yaml.dump(data) 
}

function getContainerID(path, service, callback) {
	return utils.cmd('cd '+path+'; docker-compose ps -q '+ service,function(err, data) {

			if(err) 
				callback(err, data)
			else { 
				var containerID = data
				//Replace newlines
				containerID = containerID.replace(/(\r\n|\n|\r)/gm,"");
				callback(null,containerID)
			}

	})	

}

//Call docker-compose up in path and returns the process pid
function up(path, callback) { 
	
	return utils.cmd('cd '+path+'; docker-compose  up -d', callback) 	

}
//Call docker-compose down in path and returns the process pid
function down(path, callback) { 
	
	return utils.cmd('cd '+path+'; docker-compose down', callback) 	

}

function cp(path, service, src, dst, callback) {

		getContainerID(path, service, function(err, data) {
			//No err : get containerID = data
			if(!err)
			{
				var containerID = data
				//Cal docker exec
				return docker.cp(containerID, src, dst, callback) 
			}
			else   {
			callback(err)
			return null
			}

		})

}

function exec(path, service, command, callback, paramsInput) {

	var paramsProto = {
		detached: false	
	}

	//Get the params
	var params = _.extend({}, paramsProto, paramsInput) 

	if(!params.detached)
		return utils.cmd('cd '+path+'; docker-compose exec '+ service + ' ' +command, callback)

	//Workaround for detached mode docker-compose
	else {
		getContainerID(path, service, function(err, data) {
			//No err : get containerID = data
			if(!err)
			{

				var containerID = data
				//Cal docker exec
				return docker.exec(containerID, command, callback, params)

			}
			else callback(err)

		})
	//	return cmd.get('cd '+path+'; docker-compose exec '+ service + ' ' +command, callback)
		}
}

exports.generate = generate
exports.up = up
exports.down = down
exports.exec = exec
exports.cp = cp
exports.getContainerID = getContainerID
