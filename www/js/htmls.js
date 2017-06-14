var express = require('express');
var rowter = express.Router();
var path = require('path');

let status = 200; //OK
let headers = {'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Authorization, Content-Length',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
    'Content-Type': 'text/html; charset=utf-8',
    'Set-Cookie': 'session=yones.lebady@gmail.com, user=kyxuser',
    'Content-Length': 'xbody.length'};
//  "X-Content-Type-Options": "nosniff",   // blocks style not text/css
var html = '<!DOCTYPE html>' + '<html>' + '<html lang="en">' + '<head>' + '<meta charset="UTF-8">'
         + '<!--meta http-equiv="Content-Type" content="text/html; charset=utf-8"/-->'
         + '<title>Keyax Multilingual Webserver</title>'
         + '<meta name="keywords" content="HTML, CSS, XML, XHTML, JavaScript">'
         + '<meta name="description" content="Free Web tutorials on HTML and CSS">'
         + '<meta name="author" content="Keyax 2017">'
         + '<!--meta http-equiv="refresh" content="30"--> <!--refresh doc. every 30 seconds-->'
         + '<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0">  <!--, user-scalable="yes"-->'
//       + `<base href="http://${req.headers['host']}:${port}"  target="_self">`
//       + `<base href="http://${req.headers['host'].replace(':8080','')}:8090"  target="_self">`
//       + '<!--base href="http://172.17.0.2/" target="_self"--> <!--_blank neWin, _self  sameWin,  _top fullBodyWin, _parent parentFrame, framename in frame -->'
//       + '<link rel="icon" href="data:,">'
         + ' <!--link rel="shortcut icon" href="favicon.ico" /-->'
         + '<link rel="stylesheet" type="text/css" href="noto2.css">'
         + '<link rel="stylesheet" type="text/css" href="font-awesome.min.css">'
//       + '<!--link rel="stylesheet" type="text/css" href="http://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"-->'
         + '<link rel="stylesheet" type="text/css" href="jstree.min.css">'
         + '<link rel="stylesheet" type="text/css" href="lazeemenu.css">'
         + '<link rel="stylesheet" type="text/css" href="keyax.css">'
         + '<script type= "application/javascript" src="jquery.min.js"></script>'
         + '<script type= "application/javascript" src="jstree.min.js"></script>'
         + '<script type= "application/javascript" src="lazeemenu-jquery.js"></script>'
         + '<script type= "application/javascript" src="angular.min.js"></script>'
         + '<script type= "application/javascript" src="keyax.js"></script>'
         + '<script type= "application/javascript" src="socket.io.js"></script>'
//       + `<script>var lh = "ws://"+window.location.host+":8080"; var sockt = io.connect(lh, {transports: ['websocket', 'polling', 'flashsocket']}); sockt.on('news', function (datos) {console.log(datos); sockt.emit('myevent', { my: 'data variables' }); });</script>`
//       + `<script>var sockt = io.connect("ws://${req.headers['host']}:${port}"); sockt.on('news', function (datos) {console.log(datos); sockt.emit('myevent', { my: 'data variables' }); });</script>`
         + `<script>var sockt = io.connect("ws://192.168.1.1:9000"); sockt.on('news', function (datos) {console.log(datos); sockt.emit('myevent', { my: 'data variables' }); });</script>`
//       + 'var socket = io("ws://localhost:3000" {transports: ['websocket']});'
         + '<script>function viewsize(){document.getElementById("kyx").innerHTML = "Keyax Multilingual Insert DOM"};</script>'
         + '</head>' + '<body onload="viewsize()" onresize="viewsize()">'
//         + '<div id="cortina" class="curtain">'
         + '<div class="container" onclick="xToggle(this)">'
         + '<div class="bar1"></div>'
         + '<div class="bar2"></div>'
         + '<div class="bar3"></div>'
         + '</div>'

         + '<p id="kyx" class="pipo">Hello World Keyax planet!</p>'
         + '<img id="px1" src="lion.gif" alt="Tuxy" width="42" height="42" enctype="image/jpg" />'
         + '<div id="div1" class="div1"></div>'
var form = '<form action="" method="post" enctype="multipart/form-data">'
         + '<fieldset>'
         + '<label for="name">Name:</label>'
         + '<input type="text" id="name" name="name" placeholder="Enter your full name" />'
         + '<br />'
         + '<label for="email">Email:</label>'
         + '<input type="email" id="email" name="email" placeholder="Enter your email address" />'
         + '<br />'
         + '<label for="description">Description:</label>'
         + '<textarea id="description" name="description" placeholder="Enter a short description about yourself"></textarea>'
         + '<br />'
         + '<input type="submit" value="Create Profile" />'
         + '</fieldset>'
         + '</form>'
         + '<form action="/upload" enctype="multipart/form-data" method="post">'
         + '<input type="text" name="title"><br>'
         + '<input type="file" name="upload" multiple="multiple"><br>'
         + '<input type="submit" value="Upload">'
         + '</form>'
var htmlc = '</body>' + '</html>'
let xbody= html.concat(form).concat(htmlc);

/*
module.exports.get = () => {
  // 3*) home page route (http://localhost:8080)
  router.get('/', function (req, res, next) {
  res.writeHead(status, headers);

  console.log(`html built ${status}`);
  next();
}
*/

// 3*) home page route (http://localhost:8080)
rowter.get('/', function(req, res) {
console.log(`host>http://${req.headers['host']}/`);
console.log(`req.headers>>>${JSON.stringify(req.headers, null, 2)}<<<`);
//    res.send('GET handler for /html route.');
res.sendFile(path.join(__dirname+'/linux.jpg'));
//res.sendFile(path.join(__dirname+'/index.html'));

//    res.writeHead(status, headers);
//    res.write(`${xbody}`);
//    res.end();
    console.log(`html built ${status} ${__dirname}`);
});
/*
router.post('/', function(req, res) {
    res.send('POST handler for /dogs route.');
});
*/
module.exports = rowter;
