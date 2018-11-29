  const dockerComposer = require('../lib/docker-composer.js')
  const utils = require('../lib/utils.js')
  const pathExample = "pathExample"
  dockerComposer.up(pathExample, (err, data) => {
    console.log(err);
    if (err) {
      console.log("ERROR")
      console.log(err)
    }
    else {
      console.log(data);
     // dockerComposer.down(pathExample, utils.print)
     // dockerComposer.exec(pathExample, "example", "echo 'hello WORLD'", (err) => {
     //   if (err) console.log("nada") ;
     // })
    }
  } ,
  function(dataline) {
   console.log(dataline)
      }, "--scale example=3");

