var fs = require('fs'),
configPath = './configuration.json';
var parsed = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));
exports.mail=  parsed;