// Examples of docker engine
// dockerJS = require('mydockerjs').docker,
// UNCOMMENT WHAT YOU WANT TO USE

const dockerJS = require('../lib/docker.js');
const utils = require('./utils');
/*

function rmAll() {
  console.log('RM ALL EXAMPLE');
  dockerJS.rmAll((err, data) => {
    utils.print(err, data);
  });
}
*/
// List all container (you have to create and run some container first)
function psAll() {
  dockerJS.dockerodePS((err, dockerContainers) => {
    if (err)
    { console.log(err); }
    else { console.log(dockerContainers); }
  }, true);
}
 psAll();
/*
function runAndPs() {
  // PS Example
  dockerJS.run('daindragon2/debian_useradd', (err, data) => {
    if (err) {
      console.log('some error');
      console.log(err);
    }
    else {
      console.log('runned');
      console.log(data);
      // Print running containers
      dockerJS.ps((errDocker, dockerContainers) => {
        if (errDocker)
          { console.log(errDocker); }
        else { console.log(dockerContainers); }
      });
    }
  }, { name: 'theContainer', detached: true, cmd: 'bash' });
}

function runExample() {
  dockerJS.run('hello-world', (err, data) => {
    if (err) {
      console.log('Some err:');
      console.log(data);
    }

    else {
      console.log(data);
    }
  });
}

function stopAll() {
  dockerJS.stopAll((err, data) => {
    utils.print(err, data);
  });
}

function startAll() {
  dockerJS.startAll((err, data) => {
    utils.print(err, data);
  });
}
function networkCreateExample() {
  const flags = {
    driver: 'bridge',
    subnet: '192.168.1.1/24',
  };


  dockerJS.createNetwork('testRete', (err, data) => {
    utils.print(err, data);
  }, flags);

  dockerJS.createNetwork('seconda', (err, data) => {
    utils.print(err, data);
  });
}

function networkRemoveExample() {
  const name = 'testRete';
  dockerJS.removeNetwork(name, utils.print);
}
function networkPruneExample() {
  dockerJS.networkPrune(utils.print);
}

function networkList() {
  dockerJS.networkList(utils.print);
}

function getInfoContainer() {
  // Select an existsent container
  const name = 'silly_minsky';
  dockerJS.getInfoContainer(name, utils.print);
}

*/
// networkCreateExample();
// networkList();
// networkRemoveExample();
// networkPruneExample();
// stopAll();
// startAll();
// runExample();
// runAndPs();
// //  Remove all containers inactive;
// rmAll();
// getInfoContainer();

// dockerJS.getNetwork("blackhatlab_public_network", (err, data) => {
//   console.log("GET UNIX REQ");
//   console.log(JSON.parse(data));
// });




