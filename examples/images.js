const dockerImages = require('mydockerjs').imageMgr ,
	utils = require('./utils.js') 


console.log("Names example:") 
//Get image names  
dockerImages.getNames(function(err, json) {
	utils.print(err,json)
}, {onlytagged:true})


//Get detailed list of images in javascript object
dockerImages.getDetailedList(function(err, data) {
	utils.print(err,data)

})


//Get json list of images
dockerImages.getJSONList(function(err, data) {
	utils.print(err, data)
})





