//Compose examples 
const  dockerComposer = require('../lib/docker-composer.js') ,
utils = require('./utils.js') 


var pathExample  = './compose_test' 


function upExample() { 

		dockerComposer.up(pathExample, utils.print, function(dataline) {
			console.log(dataline) 
		})
	
	}


function downExample() {

		dockerComposer.down(pathExample, utils.print, function(dataline) {
			console.log(dataline) 
		})
	
	}


//upExample()
downExample() 



