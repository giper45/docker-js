// curl  -s -X POST  "http:/v1.24/images/create?fromImage=JACK&tag=late
// const http = require('http');

// function pullImage(name, tag) {
// const options = {
//   socketPath: '/var/run/docker.sock',
//   path: '/images/create?fromImage='+name+'&tag='+tag,
//   method: 'POST'
// };
// body = ""

// const callback = res => {
//   console.log(`STATUS: ${res.statusCode}`);
//   res.setEncoding('utf8');
//   res.on('data', data => {
//     body += data
//     console.log(data);
//   });
//   res.on('end', function () {
//     console.log('BODY: ' + body);
//   });
//   res.on('error', data => console.error(data));
// };

// const clientRequest = http.request(options, callback);
// clientRequest.end();
// }
function listImages() {

const options = {
  socketPath: '/var/run/docker.sock',
  path: '/images/json',
};

const callback = res => {
  console.log(`STATUS: ${res.statusCode}`);
  res.setEncoding('utf8');
  res.on('data', data => console.log(data));
  res.on('error', data => console.error(data));
};

const clientRequest = http.request(options, callback);
clientRequest.end();
}

// const serverUrl = 'http:/v1.24';
// const unixSock = '/var/run/docker.sock';

// var request = require('request');

// // request.get(`http://unix:${unixSock}:/v1.24/info`)
// request.get("http://unix:/var/run/docker.sock:/images/json")
// .on('response', function(response) {
//     console.log(response.statusCode) // 200
//     console.log(response.headers['content-type']) // 'image/png'
//   })


pullImage('ubuntu', 'latest')
