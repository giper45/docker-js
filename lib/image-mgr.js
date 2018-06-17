const utils = require('./utils');
const _ = require('underscore');
const http = require('http');


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
  buildImage: function buildImage(dockerPath, imageName, callback, notifyCallback) {
    const pid = utils.cmd(`cd ${dockerPath}; docker build -t ${imageName} .`, callback);
    if (notifyCallback && typeof notifyCallback === 'function') {
      utils.docker_stdout(pid, notifyCallback);
    }
    return pid;
  },
  pullImage : function pullImage(name, tag, retCallback, notifyCallback) {
  const api = `/images/create?fromImage=${name}&tag=${tag}`
  utils.unixRequest(api, "POST", retCallback, notifyCallback)

},
  removeImage : function removeImage(name, tag, callback) {
    utils.cmd(`docker rmi ${name}:${tag}`, callback)
  },
  isImageInstalled: function isImageInstalled(imageName, callback) {
    api.getNames((err, images) => {
      if (err) {
        callback(err);
      }
      else {
        callback(null, _.contains(images, imageName))
      }
    })
  },
  areImagesInstalled: function areImagesInstalled(imagesToSearch, callback) {
    areInstalled = true
    notInstalled = []
    api.getNames((err, images) => {
      if (err) {
        callback(err);
      }
      else {
        _.each(imagesToSearch, (image) => {
          if(!_.contains(images, image)) {
            areInstalled = false
            notInstalled.push(image)
          }
        })
        callback(null, { areInstalled,
            notInstalled
          })
      }
    })
  }
};

module.exports = api;
