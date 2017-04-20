//Examples of docker engine 
//dockerJS = require('mydockerjs').docker,
dockerJS = require('../lib/docker.js'),
utils = require('./utils')


function rmAll() {
console.log("RM ALL EXAMPLE") 
dockerJS.rmAll(function(err, data) {
	utils.print(err, data) 
})

}
//List all container (you have to create and run some container first)
function psAll() {

			dockerJS.ps(function(err, dockerContainers) {
				if(err) 
					console.log(err) 
				else 
					console.log(dockerContainers)
			}) 

}
function runAndPs() { 
//PS Example
dockerJS.run('daindragon2/debian_useradd', function(err, data) {
	if(err) 
	{
		console.log("some error") 
		console.log(err) 
	}
	else {  
			console.log("runned") 
			console.log(data) 
			//Print running containers
			dockerJS.ps(function(err, dockerContainers) {
				if(err) 
					console.log(err) 
				else 
					console.log(dockerContainers)
			}) 
			
	    }

}, {name:"theContainer", detached:true, cmd:'bash'})

} 

function runExample() { 
dockerJS.run('hello-world', function(err, data) {
	if(err) 
	{
		console.log("Some err:") 
		console.log(data) 
	}

	else { 
		console.log(data)
	}

})

}

function stopAll() {
	dockerJS.stopAll(function(err, data) {
		utils.print(err, data)  
	})

}

function startAll() {
	dockerJS.startAll(function(err, data) {
		utils.print(err, data)  
	})
}
function networkCreateExample() {
	var flags = {
 		     driver : 'bridge',
		     subnet : '192.168.1.1/24'
			} 


	dockerJS.createNetwork("testRete", function(err, data) {
		utils.print(err, data) 
	}, flags) 

	dockerJS.createNetwork("seconda", function(err, data) {
		utils.print(err, data) 
	}) 
}

function networkRemoveExample() {
	var name = 'testRete' 
	dockerJS.removeNetwork(name, utils.print)
}
function networkPruneExample() {
	dockerJS.networkPrune(utils.print) 
}

function networkList()  {
	dockerJS.networkList(utils.print)
}

function getInfoContainer() {
	//Select an existsent container
	name="silly_minsky"
	dockerJS.getInfoContainer(name, utils.print)
}

//networkCreateExample()
//networkList()
//networkRemoveExample() 
//networkPruneExample()
//psAll()
//stopAll()
//startAll()
//runAndPs()
//Remove all containers inactive
//rmAll() 
getInfoContainer() 

