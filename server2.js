
// Website you wish to allow to connect
res.setHeader('Access-Control-Allow-Origin', '*');
// Request methods you wish to allow
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
// Request headers you wish to allow
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
// Set to true if you need the website to include cookies in the requests sent
// to the API (e.g. in case you use sessions)
res.setHeader('Access-Control-Allow-Credentials', true);

//-------------------------------------------
var http = require('http'),
    fs = require('fs');

/* Creating server */
var server = http.createServer(function (request, response) {
    if (request.url == '/' || request.url == '/index.html') {
        var fileStream = fs.createReadStream('./index.html');

        fileStream.pipe(response);
    } else {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.end("Hello World\n");
    }
});

/*Start listening*/
server.listen(8000);
