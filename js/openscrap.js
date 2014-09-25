/**
 * Created by raveendranath nare on 9/25/2014.
 */


var http = require("http");

function scrap(url,callback) {
    var options = {
        host: url,
        path: '/'
    }
    process.stdout.write('calling ...'+url);
    http.get(options, function(res) {
        var data = "";
        res.on('data', function (htmlStr) {
            data += htmlStr;
        });
        res.on("end", function() {
            process.stdout.write(data);
            callback(data);
        });
    })
}

scrap('www.finra.org',function(data){
    process.stdout.write(data);
});


