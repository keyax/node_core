const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');


let mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.eot': 'appliaction/vnd.ms-fontobject',
  '.ttf': 'aplication/font-sfnt'
};



http.createServer(function (request, response) {
  let pathName = url.parse(request.url).path;
  if(pathName === '/'){
    pathName = '/index.html';
  }
  pathName = pathName.substring(1, pathName.length);
  let extName = path.extName(pathName);
  let staticFiles = `${__dirname}/template/${pathName}`;

      if(extName =='.jpg' || extName == '.png' || extName == '.ico' || extName == '.eot' || extName == '.ttf' || extName == '.svg')
      {
          let file = fr.readFileSync(staticFiles);
          res.writeHead(200, {'Content-Type': mimeTypes[extname]});
          res.write(file, 'binary');
          res.end();
}else {
 fs.readFile(staticFiles, 'utf8', function (err, data) {
   if(!err){
     res.writeHead(200, {'Content-Type': mimeTypes[extname]});
     res.end(data);
   }else {
     res.writeHead(404, {'Content-Type': 'text/html;charset=utf8'});
     res.write(`<strong>${staticFiles}</strong>File is not found.`);
   }
   res.end();
 });
}
}).listen(8081);
