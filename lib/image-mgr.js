const utils = require('./utils');
const _ = require('underscore');
const path = require('path');
const homedir = require('homedir');



// Remove untagged images
function filterUntagged(jsonList) {
  const jsonListParse = JSON.parse(jsonList);
  const jsonRet = [];
  _.each(jsonListParse, (e) => {
    if (e.RepoTags && e.RepoTags[0] !== '<none>:<none>')
      { jsonRet.push(e); }
  });
  return JSON.stringify(jsonRet);
}
const api = {

  getNames: function getNames(callback, paramsInput) {
    this.getJSONList((err, json) => {
      const arr = [];
      if (err)
    { callback(err); }
      else {
        const data = JSON.parse(json);
        _.each(data, (image) => {
          const rt = image.RepoTags;
          if (!_.isEmpty(rt) && rt[0]) {
            arr.push(rt[0]);
          }
        });
        callback(null, arr);
      }
    }, paramsInput);
  },
  getDetailedList: function getDetailedList(callback, paramsInput) {
    this.getJSONList((err, json) => {
      const arr = [];
      const data = JSON.parse(json);
      try {
        _.each(data, (image) => {
          const rt = image.RepoTags;

          if (!_.isEmpty(rt) && rt[0]) {
            const d = { name: rt[0] };
            d.labels = {};
            if (!_.isEmpty(image.Labels)) {
              d.labels = image.Labels;
            }
            if (!_.isEmpty(image.Id)) {
              d.Id = image.Id;
            }

            arr.push(d);
          }
        });
        callback(err, arr);
      }
      catch (e) {
        callback(e);
      }
    }, paramsInput);
  },
  getJSONList: function getJSONList(callback, paramsInput) {
    const paramsProto = {
      onlytagged: false,
    };


    const params = _.extend({}, paramsProto, paramsInput);

    utils.curl('/images/json', 'GET', (err, json) => {
      if (err) callback(err);
      else {
        if (params.onlytagged) { 
          json = filterUntagged(json); 
        }
        callback(null, json);
      }
    });
  },

  removeUntagged: function removeUntagged(callback) {
    utils.cmd('docker rmi $(docker images | grep "^<none>" | awk "{print $3}")', callback);
  },
  buildImage: function buildImage(dockerPath, imageName, callback) {
    utils.cmd(`cd ${dockerPath}; docker build -t ${imageName} .`, callback);
  },

};


module.exports = api;

