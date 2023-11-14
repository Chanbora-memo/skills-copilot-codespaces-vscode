// Create web server
// 1. Create web server
// 2. Read file
// 3. Send file to client
// 4. Send error message to client
// 5. Send message to client

// 1. Create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var ROOT_DIR = "html/";
var comments = [];
var server = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true, false);
    if (urlObj.pathname === "/comment") {
        console.log("comment route");
        if (req.method === "POST") {
            console.log("POST comment route");
            var jsonData = "";
            req.on('data', function (chunk) {
                jsonData += chunk;
            });
            req.on('end', function () {
                var reqObj = JSON.parse(jsonData);
                comments.push(reqObj);
                console.log(reqObj);
                res.writeHead(200);
                res.end(JSON.stringify(comments));
            });
        } else if (req.method === "GET") {
            console.log("GET comment route");
            res.writeHead(200);
            res.end(JSON.stringify(comments));
        }
    } else {
        fs.readFile(ROOT_DIR + urlObj.pathname, function (err, data) {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify(err));
                return;
            }
            res.writeHead(200);
            res.end(data);
        });
    }
}).listen(80);
