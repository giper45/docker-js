const ps = require('ps-node');
const commandExists = require('command-exists');
const commandExistsSync = require('command-exists').sync;

module.exports = {
  isDockerComposeInstalledSync() {
    return commandExistsSync('docker-compose');
  },

  isDockerComposeInstalled(cb) {
    commandExists('docker-compose', cb);
  },

  isDockerCliInstalledSync() {
    return commandExistsSync('docker');
  },

  isDockerCliInstalled(cb) {
    commandExists('docker', cb);
  },

  isDockerEngineRunning(cb) {
    ps.lookup({ command: 'docker' }, (err, resultList) => {
      if (err) cb(err);
      else if (resultList.length === 0)
        { cb(null, false); }
      else cb(null, true);
    });
  },
};
