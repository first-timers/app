var dotenv = require('dotenv');
dotenv.load();

var Hapi = require('hapi');
var Inert = require('inert');
var Request = require('request');
var Markdown = require('markdown').markdown;

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
        console.log(finalURL)

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
                console.log(commitMessage)

                var fileName = parsedBodyCommit.files[0].filename;
                var patchDiff = parsedBodyCommit.files[0].patch.replace(/\n/g, '<br>');
                var blobURL = parsedBodyCommit.files[0].blob_url;


                // var commitInfo = {
                //     "fileName": fileName,
                //     "blobURL": blobURL,
                //     "commitMessage": commitMessage,
                //     "patchDiff": patchDiff
                // }

                var issueBody = Markdown.toHTML("### 🆕🐥☝ First Timers Only. \n\n This issue is reserved for people who never contributed to Open Source before. We know that the process of creating a pull request is the biggest barrier for new contributors. This issue is for you 💝 [About First Timers Only](http://www.firsttimersonly.com/).\n\n ### 🤔 What you will need to know.\n\n Nothing. This issue is meant to welcome you to Open Source :) We are happy to walk you through the process.\n\n ###:clipboard: Step by Step\n\n- [x] 🙋 **Claim this issue**: Comment below\n Once claimed we add you as contributor to this repository.\n - [x] 👌 **Accept our invitation** to this repository. Once accepted, assign yourself to this repository\n\n - [x] 👓 **Please review** our [Code of Conduct](http://hood.ie/code-of-conduct/)\n\n In a nutshell: be patient and actively kind\n\n - [x] 🔄 **replace** the `up for grabs` label with `in progress`.\n\n - [x] 📝 **Update** the file["+ fileName +"](" + blobURL + ") in the `hoodie` repository (press the little pen Icon) and edit the line as shown below.\n\n```\n\ndiff\n\n"+patchDiff+"\n\n```\n\n - [x] 💾 **Commit** your changes\n\n - [x] 🔀 **Start a Pull Request**. There are two ways how you can start a pull request:\n\n1. If you are familiar with the terminal or would like to learn it, [here is a great tutorial](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github) on how to send a pull request using the terminal.\n\n 2. You can [edit files directly in your browser](https://help.github.com/articles/editing-files-in-your-repository/)\n\n - [x] 🏁 **Done** :+1: Replace the `in progress` label with `ready`. Ask in comments for a review :) \n\n### 🤔❓ Questions\n\nYou can ping us in the [Hoodie Chat](http://hood.ie/chat/) or on [Twitter](https://twitter.com/hoodiehq/)");



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


                var callbackIssue = function(error, response, body){
                  console.log(body)

                  if (error){
                    console.log(error)
                  }
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
