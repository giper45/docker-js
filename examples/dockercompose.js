  const dockerComposer = require('../lib/docker-composer.js')
  const utils = require('../lib/utils.js')
  const pathExample = "pathExample"
  dockerComposer.up(pathExample, (err, data) => {
    if (err) {
      console.log("ERROR")                                                                                                                                                                
      console.log(err)                                                                                                                                                                
    }
    else {
      console.log(data);
      dockerComposer.exec(pathExample, "example", "echo 'hello WORLD'", (err) => {
        if (err) console.log("ERROR") ;
        dockerComposer.down(pathExample, utils.print)
      })
    }
  } ,
  function(dataline) {                                                                                                                             
   console.log(dataline)                                                                                                                                                                
      });

