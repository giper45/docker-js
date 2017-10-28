  const dockerComposer = require('../lib/docker-composer.js')
  const pathExample = "pathExample"
  // File
  dockerComposer.cpFrom(pathExample, "example", "ciao", ".", (err) => {
    if (err) console.log(err);
  });

  // Directory
  dockerComposer.cpFrom(pathExample, "example", "/etc", ".", (err) => {
    if (err) console.log(err);
  });
