var http = require('http'),
    url = require("url");

var server = http.createServer(function (request, response) {
  var uri = url.parse(request.url).pathname; 
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end(uri+'\n');
}).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');
