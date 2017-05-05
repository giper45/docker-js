const cmd = require('node-cmd');
const _ = require('underscore');

const serverUrl = 'http:/v1.24';
const unixSock = '/var/run/docker.sock';


// Change data,err convention in err ,data convention
exports.cmd = function cmdF(command, callback) {
  return cmd.get(command, (data, err) => { callback(err, data); });
};
exports.run = function run(command, callback) {
  return cmd.run(command, (data, err) => { callback(err, data); });
};


exports.addFlags = function addFlags(flags) {
  let fStr = '';
  _.each(flags, (val, key) => {
    fStr += `--${key}=${val} `;
  });

  return fStr;
};


exports.curl = (api, method, callback) => {
  const url = serverUrl + api;
  // TODO METHODS ANALYSIS


  return exports.cmd(`curl --unix-socket ${unixSock} ${url}`, callback);
};


// Each log line call the f function
exports.docker_logs = function dockerLogs(pid, f) {
  let dataLine = '';
  // listen to the docker terminal output
  pid.stderr.on(
  'data',
  (data) => {
    dataLine += data;
    if (dataLine[dataLine.length - 1] === '\n') {
      f(dataLine);
    }
  }
);
};

