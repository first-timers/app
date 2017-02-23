const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');
var https = require('https');

const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    }
});
server.connection({ port: 3000 });

server.register(Inert, () => {});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '.',
            redirectToSlash: true,
            index: true
        }
    }
});

server.route({
    method: 'POST',
    path: '/starter-issue',
    handler: function (request, reply) {
        var owner, repo, branch, sha, ctr=0;
        
        //Parsing the url received from frontend to get the owner, repo and branch name
        var arr = request.payload.url.split('/');
        for(var i=0;i<arr.length;i++){
          if(arr[i]=="github.com"){
            owner=arr[i+1];
            repo=arr[i+2];
            ctr+=2;
            i+=3;
          }
          if(arr[i]=="tree" && arr[i+1]){
            branch=arr[i+1];
            ctr+=1;
            break;
          }
        }
        
        //Fetching data via http requests on github api after owner, repo and branch name are extracted successfully
        if(ctr==3) {
            var options = {
              host:'api.github.com',
              path: '/repos/' + owner + '/' + repo + '/branches/' + branch,
              method: 'GET',
              headers: {'user-agent':'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)'}
            };
            
            //First http request to get branch data
            var request = https.request(options, function(response){
              var body = '';
              response.on('data',function(chunk){
                  body+=chunk;
              });
                
              response.on('end',function(){
                  var branch_data = JSON.parse(body);
                  sha = branch_data.commit.sha; 
                  
                  if(sha){
                      //Second http request to get latest commit data from sha received in branch data
                      options.path = '/repos/' + owner + '/' + repo + '/commits/' + sha;
                      var req = https.request(options, function(res){
                        var body1 = '';
                        res.on('data',function(chunk){
                            body1+=chunk;
                        });
                          
                        res.on('end',function(){
                            var commit_data = JSON.parse(body1);
                            //Extracting the required data from the whole commit data
                            var refined_data = {
                                "sha": commit_data.sha,
                                "message": commit_data.commit.message,
                                "committer": commit_data.committer.login,
                                "stats": commit_data.stats,
                                "files": []
                            }
                            
                            for(var i=0;i<commit_data.files.length;i++){
                              var f = {};
                              f.filename = commit_data.files[i].filename;
                              f.status = commit_data.files[i].status;
                              f.additions = commit_data.files[i].additions;
                              f.deletions = commit_data.files[i].deletions;
                              f.changes = commit_data.files[i].changes;
                              f.path = commit_data.files[i].blob_url;
                              refined_data['files'].push(f);
                            }
                            console.log(JSON.stringify(commit_data));    //Logging the whole commit data for reference
                            console.log(refined_data);      //Also logging the extracted data
                            reply(refined_data);     //Sending the extracted data to frontend
                        });
                      });
                      
                      req.on('error', function(e) {
                        console.error('Error: '+e);
                      });
                      req.end();
                  }
                  
                  else {
                    reply("Commit not found !");       //If sha is undefined
                  }
              });
            });
            
            request.on('error', function(e) {
              console.error('Error: '+e);
            });
            request.end();
        }
        
        else {
          reply("Wrong URL !");         //If owner, repo, branch name could not be parsed from url (improper url) 
        }
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }

    console.log('Server running at:', server.info.uri);
});
