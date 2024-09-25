const ps = require('ps-node');
const commandExists = require('command-exists');
const commandExistsSync = require('command-exists').sync;
const { exec, execSync } = require('child_process');

const cmd = require('node-cmd');
module.exports = {
  isDockerComposeInstalledSync() {
    let isDockerComposeInstalled = true;
    try {
      const output = execSync('docker compose --version', { encoding: 'utf-8' });
      return true;
    } catch (error) {
      return commandExistsSync('docker-compose');
    }
  },

  isDockerComposeInstalled(cb) {
    commandExists('docker-compose', (err, exists) => {
      if (err) {
        cb(err)
      } else {
        if (exists)
          cb(exists);
        else {
          exec('docker compose --version', (error, stdout, stderr) => {
            if (error || stderr) cb(err, false); else cb(null, true)
          })
        }
      }
    });
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

        if (err) {
          cb(err);

        } else if (resultList.length === 0) {

          // Fix some race condition in macOS
          setTimeout(() => {
          }, 100);


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