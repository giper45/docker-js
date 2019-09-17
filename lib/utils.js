const cmd = require('node-cmd');
const _ = require('underscore');
const path = require('path');
const homedir = require('homedir');
const os = require('os');
const http = require('http')

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
  //return cmd.get(command, (data, err) => { callback(err, data); });
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

exports.unixRequest= (api, method, retCallback, notifyCallback) => {
const options = {
  socketPath: '/var/run/docker.sock',
  path: api,
  method: method,
};
let err = ""
body = "";

const callback = res => {
  if (res.statusCode !== 200) {
    err = res.statusCode
  }
    res.setEncoding('utf8');
    res.on('data', data => {
      body += data
      if (typeof notifyCallback === 'function') {
        notifyCallback(data);
      }
    });
    res.on('end', function () {
      if (err) {
        retCallback(`Error: status ${err}; ${JSON.parse(body).message}`)
      } else {
      retCallback(null, body);
      }
    });
    res.on('error', error => retCallback(error));
};

const clientRequest = http.request(options, callback);
clientRequest.end();
}

exports.curl = (api, method, callback) => {
  let url;
  if (os.platform() !== 'win32') {
    url = serverUrl + api;
    // TODO METHODS ANALYSIS

    return exports.cmd(`curl  -s -S -X ${method} --unix-socket ${unixSock} "${url}"`, callback);
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

exports.print = function print(err, data) {
  if (err) {
    console.log(err)
  }
  else console.log(data)
}
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

exports.escapeString = function escapeString(s) {
  // return '"'+ s.replace(/(["\s'$\\])/g,'\\$1')+'"';
  // return '"'+ s.replace(/(["'])/g,'\\$1')+'"';
  // return s.replace(/(["'])/g,'\\$1');
  return s.replace(/(['])/g,'\\$1');
};

