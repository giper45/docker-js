const ps = require('ps-node');
const commandExists = require('command-exists');
const commandExistsSync = require('command-exists').sync;
const cmd = require('node-cmd');
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

    var IS_WIN = process.platform === 'win32';

    if (IS_WIN) {
      command = 'Docker Desktop.exe';
      cmd.run("tasklist | findstr Docker").on('exit', code => {
        cb(null, code ? false : true);
      })

    } else {
      ps_options = { command: 'dockerd', psargs: 'aux' };
      ps.lookup(ps_options, (err, resultList) => {
        console.log(resultList);
        

        if (err) {
          cb(err);

        } else if (resultList.length === 0) {

          cmd.run('docker ps').on('exit', code => {
            if (code > 0) {
              cb(null, false);
            } else {
              cb(null, true);
            }
          });

        } else {
          cb(null, true);
        }

      });
    }
  },
};