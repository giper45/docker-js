const async = require('async') ,
	utils=require('./utils'),
	_ = require('underscore')
	//stampit= require('stampit') 

var  protoParams = {
		filters : ''
		}

//Remove untagged images
function filterUntagged(jsonList) {
	var jsonList = JSON.parse(jsonList)
	var jsonRet = []
	_.each(jsonList, function(e){ 
		if(e.RepoTags && e.RepoTags[0] !== "<none>:<none>") 
			jsonRet.push(e) 
		})
		return JSON.stringify(jsonRet)

}
var api = {
	
	getNames : function getNames(callback, paramsInput) {

		this.getJSONList(function(err, json) {
			var arr = []
			if(err) 
				callback(err) 
			else  {
				var data = JSON.parse(json)	
				_.each(data, function(image) {
					var rt = image.RepoTags 
					if(!_.isEmpty(rt) && rt[0]) {
						arr.push(rt[0])			
					}
				})
				callback(null, arr)
			}
			}, paramsInput)
	}, 
	getDetailedList : function getDetailedList(callback, paramsInput) {

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
			callback(e)
			}

	}, paramsInput)
	},
	getJSONList : function getJSONList(callback, paramsInput) {

	var  paramsProto = {
				onlytagged:false
			}


		var params = _.extend({}, paramsProto, paramsInput) 

		utils.cmd( 'curl --unix-socket /var/run/docker.sock http:/v1.24/images/json',
			function(err, json) {
				if(err) callback(err)
				else
				{
					if(params.onlytagged) 
						json = filterUntagged(json)
					callback(null,json)
				}

			}
	    );
	},
	
	removeUntagged : function removeUntagged(callback) {
		utils.cmd('docker rmi $(docker images | grep "^<none>" | awk "{print $3}")', callback)
	}
}



module.exports = api	
    
