const dockerImages = require('../lib/image-mgr.js');
const utils = require('./utils.js');


// Get detailed list of images in javascript object
dockerImages.getDetailedList((err, data) => {
  utils.print(err, data);
});


// Get json list of images
dockerImages.getJSONList((err, data) => {
  utils.print(err, data);
});

