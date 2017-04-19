//Examples of docker engine 
dockerJS = require('mydockerjs').docker,
utils = require('./utils')


function rmAll() {
console.log("RM ALL EXAMPLE") 
dockerJS.rmAll(function(err, data) {
	utils.print(err, data) 
})

}


function psExample() { 
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
psExample()
//Remove all containers inactive
//rmAll() 


