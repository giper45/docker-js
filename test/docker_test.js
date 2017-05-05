const docker = require('../lib/docker');
const expect = require('chai').expect;

describe('docker interpreter Test', () => {
  it.skip('Should exec', (done) => {
    // this.obj.exec('lab3_telnet_client_1', 'bash -c "mkdir cartella" '
    docker.exec('lab3_telnet_client_1', 'bash -c "mkdir cartella"', (err) => {
      expect(err).to.be.null;
      done();
    },
  { detached: true });
  });
});

