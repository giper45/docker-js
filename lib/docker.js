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

cp : function(container, src, dst, callback) {
	return utils.cmd('docker cp  '+src+" "+container+":"+dst, callback)
}

}


module.exports = api
