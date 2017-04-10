const expect =  require('chai').expect, 
 appRoot = require('app-root-path'), 
image_mgr = require(appRoot+'/lib/image-mgr'),
util = require('util')

describe('image_mgr Test', function() {

	before(function(done) {
		this.obj = image_mgr
		done()
	})

	it('Should return a list of images' ,function(done) {
		this.obj.getJSONList(function(data) {
			console.log("data:") 
			console.log(JSON.stringify(JSON.parse(data), null, 2) )
			done()
		})
	})
})

