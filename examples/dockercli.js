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

function ps() {
  dockerJS.ps((err, services) => {
  });
}

function isRunning() {
  dockerJS.isRunning("dsp_hacktool_newService", (err, isRunning) => {
    utils.print(err, isRunning);
  })
}

isRunning();
 // psAll();
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
function createVolume() {
  const name = 'dsp-ovpn';
  dockerJS.createVolume(name, utils.print);
}
function rmVolume() {
  const name = 'dsp-ovpn';
  dockerJS.removeVolume(name, utils.print);
}

function optionsTest() {
  //docker run -v $OVPN_DATA:/etc/openvpn --log-driver=none --rm kylemanna/openvpn ovpn_genconfig -u udp://VPN.SERVERNAME.COM
  // var options = {
  //   logDriver: "none",
  //   rm: true,
  //   volumes: [
  //     {hostPath: "dsp-ovpn", containerPath: "/etc/openvpn"}
  //   ],
  //   cmd: "ovpn_initpki"
  // }
  var options = {
    logDriver: "none",
    // interactive: true,
    rm: true,
    volumes: [
      {hostPath: "dsp-ovpn", containerPath: "/etc/openvpn"}
    ],
    cmd: "ovpn_initpki"
  }
  dockerJS.run("dockersecplayground/vpn:latest", utils.print, options, utils.notify);
}
// networkCreateExample();
// networkList();
// networkRemoveExample();
// networkPruneExample();
// stopAll();
// startAll();
// runExample();
// runAndPs();
// //  Remove all containers inactive;
ps();
// rmAll();
// getInfoContainer();
// createVolume();
// optionsTest();
// rmVolume();

// dockerJS.getNetwork("lab_network_0", (err, data) => {
//   console.log("GET UNIX REQ");
//   console.log(data.IPAM.Config[0].Subnet);
// });




