const expect = require('chai').expect;
const du = require('../lib/docker-utils.js');

describe('Docker utils test', () => {
  it('Should give true when docker is running', (done) => {
    du.isDockerEngineRunning((err, isRunning) => {
      expect(err).to.be.null;
      expect(isRunning).to.be.ok;
      done();
    });
  });


  it.skip('Should give false when docker is running', (done) => {
    du.isDockerEngineRunning((err, isRunning) => {
      expect(err).to.be.null;
      expect(isRunning).not.to.be.ok;
      done();
    });
  });


  it('Should give true if docker cli is installed', (done) => {
    expect(du.isDockerCliInstalledSync()).to.be.ok;

    du.isDockerCliInstalled((err, isInstalled) => {
      expect(err).to.be.null;
      expect(isInstalled).to.be.ok;
      done();
    });
  });

  it('Should give true if docker-compose is installed', (done) => {
    expect(du.isDockerComposeInstalledSync()).to.be.ok;

    du.isDockerComposeInstalled((err, isInstalled) => {
      expect(err).to.be.null;
      expect(isInstalled).to.be.ok;
      done();
    });
  });
});

