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

// The server should respond to all requests with a string
const server = http.createServer(function(req,res){
    res.end("Hello World\n");
}); 

// Start the server, and have it listen on port 1337
server.listen(1337, function(){
    console.log("Server is listening on port 1337 now");
});