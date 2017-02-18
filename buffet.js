var server = require('http').createServer();
var buffet = require('buffet')(root: './file');

server.on('request', function (req, res) {
  buffet(req, res, function () {
    buffet.notFound(req, res);
  });
});

server.listen(3000, function () {
  console.log('test server running on port 3000');
});
