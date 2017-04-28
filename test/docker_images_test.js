var expect = require('chai').expect,
	async = require('async'),
	path = require('path'),
	appRoot = require('app-root-path'),
	dockerImages = require(appRoot+ '/app/data/docker-images'),
	_ = require('underscore') 




describe("Data Docker Test" , function(done) {
	//Get original configuration

	it("should read actions from label images" , function(done) { 
		dockerImages.getListImages(function(err, data) {
			
			expect(err).to.be.null
			_.each(data, function(i) {
				var ls = i.labels
			//	if(ls.actions)
			//		console.log(ls.actions)
			})
			done()

		})
	})
})
