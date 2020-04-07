const kong = require('../index')();

/*
INPUT id or name for api

OUTPUT: body will be an empty string with all other header and http status information preserved.

 */

kong.api.remove('google').then(console.log);
