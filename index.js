const imageMgr = require('./lib/image-mgr.js') ,
 dockerComposer = require('./lib/docker-composer.js') ,
 docker = require('./lib/docker.js') 


var api = { 

	dockerComposer : dockerComposer,
	imageMgr : imageMgr, 
	docker : docker
};

module.exports = api
