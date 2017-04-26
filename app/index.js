const http = require('http');
const https = require('https');
const url = require('url');
const URL = require('url').URL;
const fs = require('fs');
const path = require('path');
const mongo = require('mongodb');
const mongoose = require('mongoose');

// you can pass the parameter in the command line. e.g. node static_server.js 3000
const port = process.argv[2] || 8080

/* var options = {
  key: fs.readFileSync('keys/kyx-key.pem'),
  cert: fs.readFileSync('keys/kyx-cert.pem')
}; */

/*
var Readable = require('stream').Readable
var s = new Readable
s.push('beep')    // the string you want
s.push(null)      // indicates end-of-file basically - the end of the stream
*/

// maps file extention to MIME typere
//let mimeType = {
const mime = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'text/javascript',
  '.json': 'application/json',
  '.svg':  'image/svg+xml',
  '.eot':  'appliaction/vnd.ms-fontobject',
  '.ttf':  'aplication/font-sfnt',
  '.jpg':  'image/jpeg',
  '.png':  'image/png',
  '.ico':  'image/x-icon',
  '.mp3':  'audio/mpeg',
  '.wav':  'audio/wav',
  '.pdf':  'application/pdf',
  '.doc':  'application/msword',
//'form' : 'multipart/form-data',
};

/* Creating file server */
var filer = http.createServer(function (reqf, resf){
  console.log(`${reqf.method} ${reqf.url}`); // GET /pix/linux.jpg
  // parse URL
  const parsedUrl = url.parse(reqf.url);
//  console.log(`parsedUrl:${parsedUrl}`); // parsedUrl:[object Object]
  // extract URL path
  let pathname = `.${parsedUrl.pathname}`;
  console.log(`pathname: ${pathname}`); // pathname: ./pix/linux.jpg
  // based on the URL path, extract the file extention. e.g. .js, .doc, ...
  const ext = path.parse(pathname).ext;
//  var pathname = './linux.jpg';
// read file from file system
  fs.readFile(pathname, function(err, data){
       if(err){
         resf.statusCode = 500;
         resf.end(`Error getting the file: ${err}.`);
       } else {
         // if the file is found, set Content-type and send data
         resf.setHeader('Content-type', mime[ext] || 'text/plain' );
         resf.end(data);
       }
     });
});

var server = http.createServer(function (req, res) {
// The headers are stored in a JavaScript object, with the header strings as object keys.
     console.log(req.headers);  //   JSON.stringify(req.headers)
     var html1 = '<!DOCTYPE html>' + '<html>' + '<head>'
                 + '<title>Keyax Multilingual Webserver</title>'
                 + `<base href="http://${req.headers['host'].replace(':8080','')}:8090"  target="_self">`
//                 + `<base href="http://${req.headers['host']}/"  target="_self">`

                 + '<link rel="icon" href="data:,">'
                 + '<script>function viewsize(){document.getElementById("kyx").innerHTML = "Keyax Multilingual Insert DOM"}</script>'
                 + '</head>' + '<body onload="viewsize()" onresize="viewsize()">'
                 + '<p id="kyx" class="pipo">Hello World Keyax planet!</p>'
                 + '<img id="px1" src="pix/linux.jpg" alt="Tuxy" width="42" height="42" enctype="image/jpg" />'
                 + '<div id="div1" class="div1"></div>'
     var htmlc = '</body>' + '</html>'

  // Website you wish to allow to connect
//  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
//  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
//  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
//  res.setHeader('Access-Control-Allow-Credentials', true);
  let xbody= html1.concat(htmlc);
//  console.log(`body html... ${xbody}`);
  res.writeHead(200, {  //only one time per page
    "Access-Control-Allow-Origin": "*",
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS,',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
//    "Content-Length": xbody.length,
//    "Set-Cookie": "type=ninja",
//    "X-Content-Type-Options": "nosniff",   // blocks style not text/css
    "Content-Type": "text/html; charset=utf-8"
  });

  res.write(`${html1}`);
  res.write(`${htmlc}`);
  res.write('<img id="px2" src="pix/linux.jpg" alt="Tuxy" width="42" height="42" enctype="image/jpg" />');
  res.write('<script>var xx = document.getElementById("div1")\;xx.innerHTML += "<u>Keyax Multilingual Computers:</u><br>";</script>');
  res.write('<style>.pipo {color: orange; font-size: 5em;}</style>')
  res.end();
});

/* var tlserver = https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("https secure server: Hello world  \n");
});
tlserver.listen(443);  */
server.listen(parseInt(port));
filer.listen(8090, function(){
console.log(`Server is listening port ${port}   & fileserver 8090`);
});
