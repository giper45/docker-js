const expect =  require('chai').expect, 
 appRoot = require('app-root-path'), 
docker = require(appRoot+'/lib/docker')
util = require('util')

describe('docker interpreter Test', function() {

	before(function(done) {
		this.obj = docker
		done()
	})

	it('Should exec' ,function(done) {

	
		//this.obj.exec('lab3_telnet_client_1', 'bash -c "mkdir cartella" '
		this.obj.exec('lab3_telnet_client_1', 'bash -c "mkdir cartella"' ,  function(err, data) {

		done()
		}, 
		{detached:true}
		)
			
	})
})

