/**
 * Created by narer on 9/25/2014.
 */


var http = require('http'),
url = require('url'),
path = require("path"),
fs = require('fs');



http.createServer(function (request, response) {
    process.stdout.write('started..');
    var uri = url.parse(request.url).pathname
        , filename = path.join(process.cwd(), uri);
    process.stdout.write(filename);

    fs.exists(filename, function(exists) {
        if(!exists) {
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();
            return;
        }

        if (fs.statSync(filename).isDirectory()) filename += '/index.html';

        fs.readFile(filename, "binary", function(err, file) {
            if(err) {
                response.writeHead(500, {"Content-Type": "text/plain"});
                response.write(err + "\n");
                response.end();
                return;
            }

            response.writeHead(200);
            response.write(file, "binary");
            response.end();
        });
    });

}).listen(8124, "127.0.0.1");
