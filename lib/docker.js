const utils = require('./utils');
const _ = require('underscore');


const api = {

  exec: function exec(container, command, callback, paramsInput, notifyCallback) {
    const paramsProto = {
      detached: false,
    };
    // Get the params
    const params = _.extend({}, paramsProto, paramsInput);
    let options = '';
    if (params.detached)
      { options += '-d '; }
    if (params.interactive)
     { options += '-i '; }
    if (params.tty)
     { options += '-t '; }

    const pid = utils.cmd(`docker exec ${options}${container} ${command}`, callback);
    // Notify
    if (notifyCallback && typeof notifyCallback === 'function') {
      utils.docker_stdout(pid, notifyCallback);
    }
    return pid;

  },
// Get container infos
  getInfoContainer(id, callback) {
    return utils.curl(`/containers/${id}/json`, 'GET', callback);
  },


// Call docker cp
  cp(container, src, dst, callback) {
    return utils.cmd(`docker cp  ${src} ${container}:${dst}`, callback);
  },
// Get from container
  cpFrom(container, src, dst, callback) {
    return utils.cmd(`docker cp ${container}:${src} ${dst}`, callback);
  },


// Run a container
  run(image, callback, paramsInput) {
    const paramsProto = {
      detached: false,
    };

    const params = _.extend({}, paramsProto, paramsInput);

    let flags = '';
    let cmd = '';
    if (params.detached)
      { flags += ' -d '; }
    if (params.cmd)
      { cmd = params.cmd; }
    if (params.name)
      { flags += ` --name=${params.name}`; }
    if (params.net)
     { flags += ` --net=${params.net}`; }
    if (params.interactive)
     { flags += ' -it '; }


    const toExec = `docker run ${flags} ${image} ${cmd}`;
    return utils.cmd(toExec, callback);
  },

// Start all containers
  startAll(callback) {
    const cmd = 'for i in $(docker ps -a -q); do docker start $i ; done';
    return utils.cmd(cmd, callback);
  },

  stopAll(callback) {
    const cmd = 'for i in $(docker ps -a -q); do docker stop $i ; done';
    return utils.cmd(cmd, callback);
  },

// Remove all containers
  rmAll(callback) {
    return utils.cmd(' docker rm -f $(docker ps -a -q) ', callback);
  },

// Returns active containers
  ps(callback) {
    return utils.cmd('curl --unix-socket /var/run/docker.sock http:/v1.24/containers/json', callback);
  },


  createNetwork(name, callback, paramsInput) {
    const paramsProto = {};
    const params = _.extend({}, paramsProto, paramsInput);
    const flags = utils.addFlags(params);
    const cmd = `docker network create ${flags} ${name}`;

    return utils.cmd(cmd, callback);
  },
  removeNetwork(name, callback) {
    const cmd = `docker network rm ${name}`;
    return utils.cmd(cmd, callback);
  },
// Remove all unused networks
  networkPrune(callback) {
    const cmd = 'docker network prune -f';
    return utils.cmd(cmd, callback);
  },


  networkList(callback) {
    return utils.curl('/networks', 'GET', callback);
  },


};


module.exports = api;
