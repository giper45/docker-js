const dockerComposer = require('../lib/docker-composer');


describe('docker interpreter Test', () => {
  it('test getcontainer id ', (done) => {
    dockerComposer.getContainerID('/Users/gaetanoperrone/dsp/giper/lab3', 'telnet_client', (err, data) => {
      if (err) { console.log('som error'); }
      else { console.log(data); }
      done();
    });
  });
});

