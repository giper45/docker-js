const async = require('async') ,
	cmd=require('node-cmd'),
	_ = require('underscore')
	//stampit= require('stampit') 

var  protoParams = {
		filters : ''
		}

var api = {
	
	getNames : function getNames(callback) {
		this.getJSONList(function(json, err) {
			var arr = []
			var data = JSON.parse(json)	
			if(!err) 
				_.each(data, function(image) {
					var rt = image.RepoTags 
					if(!_.isEmpty(rt) && rt[0]) {
						arr.push(rt[0])			
					}
				})
				callback(arr, err)
			})
	}, 
	getDetailedList : function getDetailedList(callback) {

		this.getJSONList(function(json, err) {
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
				callback(arr, err)
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
	cmd.get( 'curl --unix-socket /var/run/docker.sock http:/v1.24/images/json',
		callback
	    );
	},
	
	removeUntagged : function removeUntagged(callback) {
		cmd.get('docker rmi $(docker images | grep "^<none>" | awk "{print $3}")', callback)
	}
}



module.exports = api	
    
