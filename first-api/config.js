// Create and export configuration variables

// Container for all the enviroments
var enviroments = {};


// Staging (default) enviroment
enviroments.staging = {
    'port' : 1337,
    'envName' : 'staging'
};

// Production enviroment
enviroments.production = {
    'port' : 3000,
    'envName' : 'production'
};

// Determines which enviroment was passed as a command-line argument
var currentEnviroment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';


// Check that the current enviroment is one of the enviroments aboce, if not, default to staging
var enviromentToExport = typeof(enviroments[currentEnviroment]) == 'object' ? enviroments[currentEnviroment] : enviroments.staging;

// Export module
module.exports = enviromentToExport;