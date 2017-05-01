const cmd = require('node-cmd') ,
_ = require('underscore'), 
EventEmitter = require('events')

var serverUrl = 'http:/v1.24'
var unixSock = '/var/run/docker.sock'
var logEmitter = new EventEmitter()


//Change data,err convention in err ,data convention
exports.cmd = function(command, callback) {
	return cmd.get(command, function(data, err) { callback(err, data) } ) 
}
exports.run = function(command, callback) {
	return cmd.run(command, function(data, err) { callback(err, data) } ) 
}


exports.addFlags = function(flags) {
	var fStr = ''
	_.each(flags, function(val, key) {
		fStr += '--'+key+'='+val+' '	
	})

	return fStr

	
}


exports.curl = function(api, method, callback) {

	var url = serverUrl+api
	//TODO METHODS ANALYSIS


	return exports.cmd('curl --unix-socket '+unixSock +" "+ url, callback)

}


//Each log line call the f function 
exports.docker_logs = function(pid, f) {                                                                 
//console.trace()
var data_line = ''                  
//listen to the docker terminal output                                                                   
pid.stderr.on(              
  'data',           
  function(data) {                                                                                       
    data_line += data;
    if (data_line[data_line.length-1] == '\n') {
		f(data_line)
    }               
  }
);
}

