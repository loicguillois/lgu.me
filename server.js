var http = require('http'),
    url = require("url"),
    sys = require('sys'),
    querystring = require('querystring');


var server = http.createServer(function (request, response) {
  switch (url.parse(request.url).pathname) {
    case '/post':
      post(request, response);
      break;
    default:
      redirect(request, response);
      break;
  }
}).listen(8124);

function post(request, response) {
  post_handler(request, function(request_data)
    {
response.writeHead(200, { 'Content-Type' : 'text/html' });

      response.write(
		  'URL: <strong>' + request_data.url + '</strong><br />'
                );
		response.end();
	    });

}

function post_handler(request, callback)
{
    var _REQUEST = { };
    var _CONTENT = '';

    if (request.method == 'POST')
    {
        request.addListener('data', function(chunk)
	{
	    _CONTENT+= chunk;
	});

	request.addListener('end', function()
	{
            _REQUEST = querystring.parse(_CONTENT);
	    callback(_REQUEST);
	});
    };
};


function redirect(request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  var uri = url.parse(request.url).pathname; 
  response.end(uri+'\n');
}



console.log('Server running at http://127.0.0.1:8124/');
