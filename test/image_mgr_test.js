const expect = require('chai').expect;
const imageManager = require('../lib/image-mgr');

describe('image_mgr Test', () => {
  it('Should return a list of images', (done) => {
    imageManager.getJSONList((err, data) => {
      expect(err).to.be.null;
      console.log('data:');
      console.log(JSON.stringify(JSON.parse(data), null, 2));
      done();
    });
  });
});
