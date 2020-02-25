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
const https = require('https');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const fs = require('fs');
const handlers = require('lib/handlers');


// Instantiate the HTTP server
const httpServer = http.createServer(function(req,res){
    unifiedServer(req, res);
}); 

// Start the server
httpServer.listen(config.httpPort, function(){
    console.log("Server is listening on port: " + config.httpPort + " in " + config.envName + " mode");
});

// Instantiate the HTTPS server
var httpServerOptions = {
    'key' : fs.readFileSync('./https/key.pem'),
    'cert' : fs.readFileSync('./https/cert.pem')
};

const httpsServer = https.createServer(httpServerOptions, function(req, res) {
    unifiedServer(req, res); 
});

// Start the HTTPS server
httpsServer.listen(config.httpsPort, function(){
    console.log("Server is listening on port: " + config.httpsPort + " in " + config.envName + " mode");
});

// All the server logic for both http and https server
var unifiedServer = function(req, res) {
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

        // Choose the handler this request should go to
        // If not found, go to not found handler
        var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        // Construct the data object to send to the handler
        var data = {
            'trimmedPath' : trimmedPath,
            'queryStringObject' : queryStringObject,
            'method' : method,
            'headers' : headers,
            'payload' : buffer
        };

        // Route the request to the handler specified in the router
        chosenHandler(data, function(statusCode, payload) {
            // Use the status code called back by the handler, or default to 200
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

            // Use the payload called back by the handler, or default to an empty object
            payload = typeof(payload) == 'object' ? payload : {};

            // Convert object to string
            var payloadString = JSON.stringify(payload);

            // Return the response
            res.setHeader('Content-type','application/json');
            res.writeHead(statusCode);
            res.end(payloadString);

            // Log the request path
            // console.log('Request received on path: ' + trimmedPath + ' With this method: ' + method + ' and with these querystring paramenters', queryStringObject);
            // console.log("Request received with these headers: ", headers);
            // console.log("Request received with this payload: ", buffer);
            console.log('Returning the response: ', statusCode, payloadString);
        });
    });
}

// Define a request router
var router = {
    'ping' : handlers.ping,
    'users' : handlers.users
};