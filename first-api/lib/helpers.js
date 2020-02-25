// Helpers for various tasks


// Dependencies
const crypto = require('crypto');

// Container for all helpers
var helpers = {};


// Create a SHA256 hash
helpers.hash = function(str) {
    if (typeof(str) == 'string' && str.length > 0) {
        var hash = crypto.createHmac('sha256', config.hashSecret).update(str).digest('hex');
        return hash;
    } else {
        return false;
    }
};




// Export module
module.exports = helpers;