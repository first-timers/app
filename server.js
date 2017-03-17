var Hapi = require('hapi');
var Inert = require('inert');
var Request = require('request');

var server = new Hapi.Server();

server.connection({
    port: 8000,
    host: 'localhost'
});

server.register(Inert);

server.route({
    method: "GET",
    path: "/{path*}",
    handler: {
        directory: {
            path: "./public"
        }
    }
});



server.route({
    method: 'POST',
    path: '/starter-issue',
    handler: function(request, reply) {
      
        //url user submits
        var url = request.payload.data;
        console.log("This is the URL submitted: " + url)
        var secondURL = url.replace('https://github.com', 'https://api.github.com/repos');
        var finalURL = secondURL.replace('tree', 'branches');

        var branchRequest = {
            url: finalURL,
            headers: {
                'User-Agent': 'request'
            }
        };

        //branch information
        function callback(err, result, body) {
            var parsedBody = JSON.parse(result.body);
            var sha = parsedBody.commit.sha;

            console.log("The SHA: " + sha);

            var commitURL = finalURL.replace(/branches.*$/, 'commits/' + sha);

            var commitRequest = {
                url: commitURL,
                headers: {
                    'User-Agent': 'request'
                }
            };

            //commit information
            var callback2 = function(error, response, body) {
                var parsedBodyCommit = JSON.parse(body);
                console.log('parsedBodyCommit:', parsedBodyCommit);
                console.log('*****************');
                console.log('parsedBodyCommit.files:', parsedBodyCommit.files);
            };

            //request to GET commit information from GitHub
            Request(commitRequest, callback2);
        };

        //request to GET branch information from GitHub
        Request(branchRequest, callback);



        reply({
            "ok": true
        })

    }
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
})
