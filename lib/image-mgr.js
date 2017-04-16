const async = require('async') ,
	utils=require('./utils'),
	_ = require('underscore')
	//stampit= require('stampit') 

var  protoParams = {
		filters : ''
		}

var api = {
	
	getNames : function getNames(callback) {
		this.getJSONList(function(err, json) {
			var arr = []
			var data = JSON.parse(json)	
			if(!err) 
			{
				_.each(data, function(image) {
					var rt = image.RepoTags 
					if(!_.isEmpty(rt) && rt[0]) {
						arr.push(rt[0])			
					}
				})
				callback(null, arr)
			}
			else callback(err)
			})
	}, 
	getDetailedList : function getDetailedList(callback) {

		this.getJSONList(function(err, json) {
			var arr = []
			var data = JSON.parse(json)	
			try { 
				_.each(data, function(image) {
					var rt = image.RepoTags 

					if(!_.isEmpty(rt) && rt[0]) {
						var d  = {name:rt[0] }
						d.labels=  {}
						if(!_.isEmpty(image.Labels))
						{
							d.labels = image.Labels
						}		
						if(!_.isEmpty(image.Id))
						{
							d.Id = image.Id
						}		
						
					arr.push(d)			
						
					}
				})
				callback(err, arr)
			}
			catch (e)
			{ 
			console.log("Error in parsing:") 
			console.log(e) 
			callback(e)
			}

	})
	},
	getJSONList : function getJSONList(callback) {
		utils.cmd( 'curl --unix-socket /var/run/docker.sock http:/v1.24/images/json',
			callback
	    );
	},
	
	removeUntagged : function removeUntagged(callback) {
		utils.cmd('docker rmi $(docker images | grep "^<none>" | awk "{print $3}")', callback)
	}
}



module.exports = api	
    
