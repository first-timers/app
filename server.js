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
        function callbackBranch(err, result, body) {
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
            var callbackCommit = function(error, response, body) {
                var parsedBodyCommit = JSON.parse(body);

                var commitMessage = parsedBodyCommit.commit.message
                console.log ("THIS IS THE MESSAGE:", commitMessage)

                var fileName = parsedBodyCommit.files[0].filename;
                var patchDiff = parsedBodyCommit.files[0].patch;
                var blobURL = parsedBodyCommit.files[0].blob_url;
            };

            //request to GET commit information from GitHub
            Request(commitRequest, callbackCommit);
        };

        //request to GET branch information from GitHub
        Request(branchRequest, callbackBranch);


        reply({
          // respond with path to the changed file, the diff, commit message and commit body
          // the response will be all markdown code
        })

    }
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
})
