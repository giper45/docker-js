const dockerImages = require('../lib/image-mgr.js');
const utils = require('./utils.js');
const _ = require('underscore')
const util = require('util')

// String.prototype.paddingRight = function (paddingValue) {
//    return String(this + paddingValue).slice(-paddingValue.length);
// };

// let ids = []
// function formatPull(json) {
//   splitted = json.split(/\r\n|\r|\n/)
//   for (i = 0; i < splitted.length-1; i++) {
//     s = splitted[i];
//     ss = JSON.parse(s)
//     if (!ss.progress)
//       ss.progress=""
//     const status = ss.status
//     const progress = ss.progress
//     const id = ss.id


//   }

// }
// dockerImages.removeImage("vimagick/webgoat", "latest", (err, data) => {
//   if (err) {
//     console.log("ERROR");
//     console.log(err);
//   }
//   else {
//     console.log(data);
//   }
// })
// dockerImages.pullImage("ubuntu", "latest", (err, data) => {
//   // console.log("STATUS".padEnd(spanSpaces), "PROGRESS".padEnd(spanSpaces), "ID".padEnd(spanSpaces))
//   if (err) {
//     console.log("ERROR")
//     console.log(err)
//   }
//   else {
//     console.log("SUCCESS")
//     console.log(data)
//   }
// }, (notify) => {
//   formatPull(notify)
// })

// Get detailed list of images in javascript object

//dockerImages.getDetailedList((err, data) => {
//   utils.print(err, data);
//});


// // Get json list of images
// dockerImages.getJSONList((err, data) => {
//   utils.print(err, data);
// });

 dockerImages.areImagesInstalled(["dockersecplayground/kali:latest", "ciccio"], (err, data) => {
   console.log(data)
 })

