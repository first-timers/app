
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

        //branch information, response from branchRequest
        var branchResponse= function(err, response, body) {
            var parsedBody = JSON.parse(response.body);
            // console.log("parsed body:" + parsedBody)
            var sha = parsedBody.commit.sha;

            // console.log("The SHA: " + sha);

            var commitURL = finalURL.replace(/branches.*$/, 'commits/' + sha);
            // console.log("CommitURL:" + commitURL)

            var commitRequest = {
                url: commitURL,
                headers: {
                    'User-Agent': 'request'
                }
            };

            //commit information, response from commitRequest
            var commitResponse = function(error, response, body) {
                var parsedBodyCommit = JSON.parse(body);

                var commitMessage = parsedBodyCommit.commit.message.replace(/\n/g, '<br>');
                // console.log("This is commit message: " + commitMessage)

                var fileName = parsedBodyCommit.files[0].filename;
                var patchDiff = parsedBodyCommit.files[0].patch;
                var blobURL = parsedBodyCommit.files[0].blob_url;
                console.log("patchDiff:" + patchDiff)

                // var commitInfo = {
                //     "fileName": fileName,
                //     "blobURL": blobURL,
                //     "commitMessage": commitMessage,
                //     "patchDiff": patchDiff
                // }

                var issueBody = `### 🆕🐥☝ First Timers Only.

This issue is reserved for people who never contributed to Open Source before. We know that the process of creating a pull request is the biggest barrier for new contributors. This issue is for you 💝 [About First Timers Only](http://www.firsttimersonly.com/).

### 🤔 What you will need to know.

Nothing. This issue is meant to welcome you to Open Source :) We are happy to walk you through the process.

### :clipboard: Step by Step

- [ ] 🙋 **Claim this issue**: Comment below.

  Once claimed we add you as contributor to this repository.

- [ ] 👌 **Accept our invitation** to this repository. Once accepted, assign yourself to this repository

- [ ] 👓 **Please review** our [Code of Conduct](http://hood.ie/code-of-conduct/)

  In a nutshell: be patient and actively kind

- [ ] 🔄 **replace** the \`up for grabs\` label with \`in progress\`.

- [ ] 📝 **Update** the file [${fileName}](${blobURL}) in the \`hoodie\` repository (press the little pen Icon) and edit the line as shown below.

  \`\`\`diff
  ${patchDiff.replace(/\n/g, '\n  ')}
  \`\`\`

- [ ] 💾 **Commit** your changes

- [ ] 🔀 **Start a Pull Request**. There are two ways how you can start a pull request:

1. If you are familiar with the terminal or would like to learn it, [here is a great tutorial](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github) on how to send a pull request using the terminal.

2. You can [edit files directly in your browser](https://help.github.com/articles/editing-files-in-your-repository/)

- [ ] 🏁 **Done** :+1: Replace the \`in progress\` label with \`ready\`. Ask in comments for a review :)

### 🤔❓ Questions

You can ping us in the [Hoodie Chat](http://hood.ie/chat/) or on [Twitter](https://twitter.com/hoodiehq/)`

                console.log(`\nissueBody ==============================`)
                console.log(issueBody)
                return


                var issueRequest = {
                  method: 'POST',
                  url: "https://api.github.com/repos/hoodiehq/first-timers-only-bot/issues",
                  headers: {
                    'User-Agent': 'request',
                    'Authorization': 'token ' + process.env.TOKEN,
                    'Content-type': 'application/json',
                  },
                  json: true,
                  body: {
                    'title': 'I found an issue',
                    'body': issueBody,
                    'labels': ['first-timers-TEST-only']
                  }
                };


                var issueResponse = function(error, response, body){
                  // console.log(body)

                  if (error){
                    console.log(error)
                  }
                  // console.log(body)
                  var issueURL = body.html_url
                  // console.log("Issue URL:" + issueURL)

                  //reply with a link to the issue created
                  reply(issueURL)

                };
                //request to create issue
                Request(issueRequest, issueResponse)
            };

            //request to GET commit information from GitHub
            Request(commitRequest, commitResponse);
        };

        //request to GET branch information from GitHub
        Request(branchRequest, branchResponse);
    }
});

server.start((err) => {
    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
})
