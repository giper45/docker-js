yaml = require('js-yaml') ,
cmd=require('node-cmd'),
util = require('util')





var api = { 

exec : function exec(path, container, command, callback)  {

	return cmd.get('docker exec '+ container + ' ' +command, callback)

}

}


module.exports = api
