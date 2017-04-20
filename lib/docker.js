const yaml = require('js-yaml') ,
utils = require('./utils'),
util = require('util'),
_ = require('underscore')

var serverSock = '/http:/v1.24/'


var api = { 

exec : function exec(container, command, callback, paramsInput)  {
	var paramsProto = {
		detached: false	
	}
	//Get the params
	var params = _.extend({}, paramsProto, paramsInput) 
	var options = ''
	if(params.detached)
		options+='-d '
	
	return utils.cmd('docker exec '+options+ container + ' ' +command, callback)

},
//Get container infos 
getInfoContainer:  function(id, callback) {

	return utils.curl("/containers/"+id+"/json", "GET", callback) 

}, 


//Call docker cp
cp : function(container, src, dst, callback) {
	return utils.cmd('docker cp  '+src+" "+container+":"+dst, callback)
}, 


//Run a container
run : function(image, callback, paramsInput) { 

	var paramsProto = {
		detached: false 
	}

	var params = _.extend({}, paramsProto, paramsInput) 

	var flags = ''
	var cmd = ''
	if(params.detached) 
		flags += ' -d '
	if (params.cmd) 
		cmd = params.cmd
	if(params.name) 
		flags += ' --name='+params.name
	

	var toExec = 'docker run '+ flags + ' '+ image + ' ' + cmd
	console.log(toExec)
	return utils.cmd( toExec, callback) 

}, 

//Start all containers 
startAll : function(callback) {

	cmd = "for i in $(docker ps -a -q); do docker start $i ; done"
	return utils.cmd(cmd, callback) 
},

stopAll : function(callback) {
	cmd = "for i in $(docker ps -a -q); do docker stop $i ; done"

	return utils.cmd(cmd, callback) 


},

//Remove all containers 
rmAll : function(callback) {
	return utils.cmd(' docker rm -f $(docker ps -a -q) ' , callback) 
}, 

//Returns active containers
ps : function(callback) {

	return utils.cmd('curl --unix-socket /var/run/docker.sock http:/v1.24/containers/json', callback) 
} , 


createNetwork : function(name, callback, paramsInput) {
	var paramsProto = {} 
	var params = _.extend({} , paramsProto, paramsInput) 
	var flags = utils.addFlags(params)	
	console.log(flags) 
	var cmd = "docker network create "+flags+ " "+name
	
	return utils.cmd(cmd , callback) 
}, 
removeNetwork : function(name, callback) {

	cmd = "docker network rm "+name
	return utils.cmd(cmd , callback) 	
}, 
//Remove all unused networks
networkPrune : function(callback) {
	cmd = "docker network prune -f"
	return utils.cmd(cmd , callback) 	
},


networkList : function(callback) { 
	return utils.curl("/networks", "GET", callback) 
}


}


module.exports = api
