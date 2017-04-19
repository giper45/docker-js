const yaml = require('js-yaml') ,
utils = require('./utils'),
util = require('util'),
_ = require('underscore')


var paramsProto = {
	detached: false	
}


var api = { 

exec : function exec(container, command, callback, paramsInput)  {
	//Get the params
	var params = _.extend({}, paramsProto, paramsInput) 
	var options = ''
	if(params.detached)
		options+='-d '
	
	return utils.cmd('docker exec '+options+ container + ' ' +command, callback)

},

getContainer:  function(params, cb) {


}, 
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

rmAll : function(callback) {
	return utils.cmd(' docker rm -f $(docker ps -a -q) ' , callback) 


}, 
//Returns active containers
ps : function(callback) {

	return utils.cmd('curl --unix-socket /var/run/docker.sock http:/v1.24/containers/json', callback) 
}


}


module.exports = api
