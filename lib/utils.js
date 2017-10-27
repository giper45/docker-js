const cmd = require('node-cmd');
const _ = require('underscore');
const path = require('path');
const homedir = require('homedir');
const os = require('os');

const serverUrl = 'http:/v1.24';
const unixSock = '/var/run/docker.sock';
// For Windows : the path of docker toolbox certificates
const toolboxPath = path.join(homedir(), '.docker', 'machine', 'machines', 'default');
const certPath = path.join(toolboxPath, 'cert.pem');
const caPath = path.join(toolboxPath, 'ca.pem');
const keyPath = path.join(toolboxPath, 'key.pem');
const urlDockerToolbox = '192.168.99.100';
const portListenDockerToolbox = '2376';

const winParams = `--cert ${certPath} --cacert ${caPath} --key ${keyPath}`;
const windowsServer = `https://${urlDockerToolbox}:${portListenDockerToolbox}`;


// Change data,err convention in err ,data convention
exports.cmd = function cmdF(command, callback) {
  return cmd.get(command, (data, err) => { callback(err, data); });
};
exports.run = function run(command, callback) {
  return cmd.run(command, (data, err) => { callback(err, data); });
};

exports.changeDir = function changeDir(thePath) {
  return `cd '${path.normalize(thePath)}'; `;
};

exports.addFlags = function addFlags(flags) {
  let fStr = '';
  _.each(flags, (val, key) => {
    fStr += `--${key}=${val} `;
  });

  return fStr;
};


exports.curl = (api, method, callback) => {
  let url;
  if (os.platform() !== 'win32') {
    url = serverUrl + api;
    // TODO METHODS ANALYSIS
    return exports.cmd(`curl --unix-socket ${unixSock} ${url}`, callback);
  }
  // For Windows another way
  else {
    url = windowsServer + api;
    return exports.cmd(`curl ${winParams} ${url}`, callback);
  }
};


exports.docker_stdout = function dockerStdout(pid, f) {
  let dataLine = '';
  // listen to the docker terminal output
  if (typeof f === 'function') {
    pid.stdout.on(
    'data',
    (data) => {
      dataLine = data;
      if (dataLine[dataLine.length - 1] === '\n') {
        f(dataLine);
      }
    }
  );
  }
};

// Each log line call the f function
exports.docker_logs = function dockerLogs(pid, f) {
  let dataLine = '';
  // listen to the docker terminal output
  if (typeof f === 'function') {
    pid.stderr.on(
    'data',
    (data) => {
      dataLine += data;
      if (dataLine[dataLine.length - 1] === '\n') {
        f(dataLine);
      }
    }
  );
  }
};

