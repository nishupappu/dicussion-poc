var static = require('node-static');
var file = new static.Server('./public');



module.exports = {
    init: function (fePort) {
        fePort = fePort || 3434;
        require('http').createServer(function (request, response) {
            request.addListener('end', function () {
                file.serve(request, response, function (err, res) {
                    if (err && (err.status === 404)) {
                        file.serveFile('/index.html', 200, {}, request, response);
                    }
                });
            }).resume();


        }).listen(fePort, function () {
            console.log((new Date()) + ' Server is listening on port ' + fePort);
        });
    }
};