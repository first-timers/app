var Hapi = require('hapi');
// var Path =
var Inert = require('inert');
var Vision = require('vision');
var Handlebars = require('handlebars')

var Request = require('request');

var server = new Hapi.Server();

server.connection({
    port: 8000,
    host: 'localhost'
});

server.register(Inert, function(err) {
    if (err) {
        throw err;
    }

    server.route({
        method: "GET",
        path: '/public/{path*}',
        handler: {
            directory: {
                path: "./public",
                listing: false,
                index: false
            }
        }
    });
});

server.register(Vision, function(err) {
    if (err) {
        throw err;
    }

    //configure template support
    server.views({
        engines: {
            html: Handlebars
        },
        path: './public',
        //need to figure out how to render partials and use default layout
        // layoutPath: Path.join(__dirname, 'views/layouts')
    })
});

server.route({
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
        reply.view('index');
    }
});




server.route({
            method: 'POST',
            path: '/starter-issue',
            handler: function(request, reply) {

                //request to GET branch information from GitHub
                var url = request.payload.url;
                console.log("This is the URL submitted: " + url)
                var secondURL = url.replace('https://github.com', 'https://api.github.com/repos');
                var finalURL = secondURL.replace('tree', 'branches');
                // console.log(finalURL) //https://api.github.com/repos/Techforchange/doctoc/branches/update

                var branchRequest = {
                    url: finalURL,
                    headers: {
                        'User-Agent': 'request'
                    }
                };

                function callback(err, result, body) {
                    var parsedBody = JSON.parse(result.body);
                    var sha = parsedBody.commit.sha;

                    console.log("The SHA: " + sha);

                    var commitURL = finalURL.replace('branches/update', 'commits/' + sha);

                    var commitRequest = {
                        url: commitURL,
                        headers: {
                            'User-Agent': 'request'
                        }
                    };

                    var callback2 = function(error, response, body) {
                        var parsedBodyCommit = JSON.parse(body);
                        console.log('parsedBodyCommit:', parsedBodyCommit);
                        console.log('*****************');
                        console.log('parsedBodyCommit.files:', parsedBodyCommit.files);
                    };


                    Request(commitRequest, callback2);
                };


                Request(branchRequest, callback);



                reply({ "ok": true })

            }
          });

  server.start((err) => {
      if (err) {
          throw err;
      }
      console.log(`Server running at: ${server.info.uri}`);
  })
