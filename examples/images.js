dockerImages = require('../lib/image-mgr.js') 


console.log("Names example:") 
//Get image names  
dockerImages.getNames(function(err, json) {
	if(err) 
	{
		console.log("Error: ") 
		console.log(err) 
	}
	else 
	{
		console.log("Success") 
		console.log(json) 
	}

}, {onlytagged:true})




