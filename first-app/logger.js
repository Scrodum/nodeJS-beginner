// everyting is scoped to this file only
var url = "http://loggin.io/log";

function log(message) {
    // Send http request
    console.log(message);
}

// makes the log function public
module.exports.log = log;