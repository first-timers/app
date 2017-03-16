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

server.register(Vision, function(err){
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
  handler: function (request, reply){
    reply.view('index');
  }
});




server.route({
  method: 'POST',
  path: '/starter-issue',
  handler: function(request, reply){
    var url = request.payload.url;

    var options = {
      url: url,
      headers: {
        'User-Agent': 'request'
      }
    };

    function callback(err, res, body) {
      console.log(res);
    }

    Request(options, callback);


    reply ({
      "ok": true
    })
  }
});

server. start((err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
})
