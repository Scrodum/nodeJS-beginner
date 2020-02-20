// Building RESTful API for an uptime monitoring application
// Allows user to enter URL's they want to monitor
// Users receive alerts when those resources "go down" or "come back up"


// REQUIREMENTS FOR API
// 1. listens on a PORT and accepts incoming HTTP requests for POST, GET, PUT, DELETE and HEAD
// 2. allows a client to connect then create a new user, then edit and delete that user
// 3. allows a user to sign in which gives them a token that they can use for subsequent authenticatied requsets
// 4. allows the user to sign out which invalidates their token
// 5. allows a signed-in user to use their token to create a new "check" (Task to check if the given resource is up or down, and define it)
// 6. allows a signed-in user to edit or delete any of their checks
// 7. in the background, workers perform all the "checks" at the appropriate times, and send alerts to the users when a check changes its state from up to down, or visa versa


/*
    Primary file for the API
*/

// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

// The server should respond to all requests with a string
const server = http.createServer(function(req,res){
    
    // Get url and parse it
    var parsedUrl = url.parse(req.url, true);

    // Get path from the url
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');    

    // Get the query string as an object
    var queryStringObject = parsedUrl.query;

    // Get http method
    var method = req.method.toLowerCase();

    // Get the headers as an object
    var headers = req.headers;

    // Get the payload, if there is any
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data', function(data) {
        buffer += decoder.write(data);
    });
    req.on('end', function() {
        buffer += decoder.end();

        // Send the response
        res.end("Hello World\n");
        
        // Log the request path
        // console.log('Request received on path: ' + trimmedPath + ' With this method: ' + method + ' and with these querystring paramenters', queryStringObject);
        // console.log("Request received with these headers: ", headers);
        console.log("Request received with this payload: ", buffer);
    });

}); 

// Start the server, and have it listen on port 1337
server.listen(1337, function(){
    console.log("Server is listening on port 1337 now");
});