const Docker = require('dockerode');
const utils = require('./utils');
const dockerPath = "./build/";
const docker = require('../lib/docker.js')


docker.build(dockerPath, "testimage", (err, d) => {
  if (err) console.log(err);
  else {
    console.log("SUCCESS");
  }
}, (data) => {
  console.log(data);
})

