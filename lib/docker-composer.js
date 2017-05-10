const yaml = require('js-yaml');
const utils = require('./utils');
const _ = require('underscore');
const docker = require('./docker');

function generate(data) {
  return yaml.dump(data);
}

function isRunning(path, callback) {
  const command = `cd ${path}; docker-compose ps -q`;
  utils.cmd(command, (err, data) => {
    if (err) callback(err);
    else if (data === '') callback(null, false);
    else callback(null, true);
  });
}

function getContainerID(path, service, callback) {
  return utils.cmd(`cd ${path}; docker-compose ps -q ${service}`, (err, data) => {
    if (err)
  { callback(err, data); }
    else {
      let containerID = data;
      // Replace newlines
      containerID = containerID.replace(/(\r\n|\n|\r)/gm, '');
      callback(null, containerID);
    }
  });
}

// Call docker-compose up in path and returns the process pid
function up(path, callback, dataNotify) {
  const pid = utils.cmd(`cd ${path}; docker-compose  up -d`, callback);
  // TODO Check if callback is defined
  utils.docker_logs(pid, dataNotify);
  return pid;
}
// Call docker-compose down in path and returns the process pid
function down(path, callback, dataNotify) {
  const pid = utils.cmd(`cd ${path}; docker-compose down`, callback);
  utils.docker_logs(pid, dataNotify);

  return pid;
}

function cp(path, service, src, dst, callback) {
  getContainerID(path, service, (err, data) => {
  // No err : get containerID = data
    if (!err) {
      const containerID = data;
      // Cal docker exec
      return docker.cp(containerID, src, dst, callback);
    }
    else {
      callback(err);
      return null;
    }
  });
}

function exec(path, service, command, callback, paramsInput, notifyCallback) {
  const paramsProto = {
    detached: false,
  };
  let pid;
  // Get the params
  const params = _.extend({}, paramsProto, paramsInput);
  if (!params.detached)
    {
    pid = utils.cmd(`cd ${path}; docker-compose exec ${service} ${command}`, callback);
    utils.docker_logs_stdout(pid, notifyCallback);
  }
  // Workaround for detached mode docker-compose
  else {
    getContainerID(path, service, (err, data) => {
      // No err : get containerID = data
      if (!err) {
        const containerID = data;
      // Cal docker exec
        pid = docker.exec(containerID, command, callback, params);
        utils.docker_logs_stdout(pid, notifyCallback);
      }
      else callback(err);
    });
  }
}

exports.generate = generate;
exports.up = up;
exports.down = down;
exports.exec = exec;
exports.cp = cp;
exports.getContainerID = getContainerID;
exports.isRunning = isRunning;
