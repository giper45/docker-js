const expect =  require('chai').expect, 
 appRoot = require('app-root-path'), 
dockerComposer = require(appRoot+'/lib/docker-composer')
util = require('util')

describe('docker interpreter Test', function() {

	before(function(done) {
		this.obj = docker
		done()
	})

	it('test getcontainer id ', function(done) {

	
 		dockerComposer.getContainerID('/Users/gaetanoperrone/dsp/giper/lab3', 'telnet_client', function(err, data) {
			if(err) 
				console.log("som error") 
			else 
				console.log(data)
			
			done()
		})
		})
			
	})

