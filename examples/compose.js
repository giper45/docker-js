const dockerComposer = require('../lib/docker-composer.js');
const utils = require('./utils.js');


const pathExample = './compose_test';
const UP_TEST = true;

function upExample() {
  dockerComposer.up(pathExample, utils.print, (dataline) => {
    console.log(dataline);
  });
}


function downExample() {
  dockerComposer.down(pathExample, utils.print, (dataline) => {
    console.log(dataline);
  });
}


if (UP_TEST) upExample();
else downExample();

