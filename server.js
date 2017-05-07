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
        // console.log("This is the URL submitted: " + url)
        var secondURL = url.replace('https://github.com', 'https://api.github.com/repos');
        var finalURL = secondURL.replace('tree', 'branches');
        // console.log(finalURL)

        var branchRequest = {
            url: finalURL,
            headers: {
                'User-Agent': 'request'
            }
        };

        //branch information
        var callbackBranch= function(err, result, body) {
            var parsedBody = JSON.parse(result.body);
            var sha = parsedBody.commit.sha;

            // console.log("The SHA: " + sha);

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

                var commitMessage = parsedBodyCommit.commit.message.replace(/\n/g, '<br>');


                var fileName = parsedBodyCommit.files[0].filename;
                var patchDiff = parsedBodyCommit.files[0].patch.replace(/\n/g, '<br>');
                var blobURL = parsedBodyCommit.files[0].blob_url;


                var commitInfo = {
                    "fileName": fileName,
                    "blobURL": blobURL,
                    "commitMessage": commitMessage,
                    "patchDiff": patchDiff
                }

                var issueRequest = {
                  // POST /repos/:owner/:repo/issues
                  method: 'POST',
                  url: "https://api.github.com/repos/agonzalez0515/saga-app/issues",
                  headers: {
                    'User-Agent': 'request',
                    'Authorization': 'token 2ee4edc6145575ecae423a4f7296d970d7e340e5',
                    'Content-type': 'application/json',
                  },
                  json: true,
                  body: {
                    'title': 'I found an issue'
                  }
                };

                var callbackIssue = function(error, response, body){
                  // console.log(body)
                  var issueURL = body.html_url
                  console.log("Issue URL:" + issueURL)

                  //reply with a link to the issue created
                  reply(issueURL)

                };


                //request to create issue
                Request(issueRequest, callbackIssue)


            };

            //request to GET commit information from GitHub
            Request(commitRequest, callbackCommit);
        };

        //request to GET branch information from GitHub
        Request(branchRequest, callbackBranch);
    }
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
})
