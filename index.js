const https = require("https");
const fs = require("fs");

const server = https.createServer((req, res) => {

  res.writeHead(200, { 'content-type': 'text/html' });

  fs.createReadStream('contact/index.html').pipe(res);
});

console.log(process.env);

server.listen(process.env.PORT || 3000);
