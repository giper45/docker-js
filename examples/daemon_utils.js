const utils = require('../lib/docker-utils.js');


utils.isDockerEngineRunning((err, isRunning) => {
  console.log("IS RUNNING?");
  console.log(isRunning);
})
