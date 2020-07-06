const expect = require('chai').expect;
const du = require('../lib/utils.js');

describe('Docker utils test', () => {
  it('Should return options for http.request from DOCKER_HOST', (done) => {
    const tests = []
    const addT = (o,  e) => {
      tests.push({
        toTest: o,
        expected: e
      });
    };
    addT("127.0.0.1:2375", {
      hostname: "127.0.0.1",
      port: 2375,
    });
    addT("tcp://localhost:2375", {
      hostname: "localhost",
      port: 2375
    });
    addT("", {socketPath: '/var/run/docker.sock'})
    addT(undefined, {socketPath: '/var/run/docker.sock'})
    tests.forEach((t) => {
      console.log(`Testing ${t.toTest}`);
      expect(du.getDaemonOptions(t.toTest)).to.be.eql(t.expected)
    });
    done();
  })

});
