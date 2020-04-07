const kong = require('../index')();


/*
INPUT
arguments[0]: id or name for api


OUTPUT

 */

kong.services.removeAllPlugins('google').then(console.log);
