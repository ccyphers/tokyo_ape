const kong = require('../index')();

/*
INPUT
arguments[0]: id or name for api
arguments[1]: plugin id


 OUTPUT: body will be an empty string with all other header and http status information preserved.

 */

kong.routes.removePlugin('google', 'd2dfc059-1e1d-429f-872a-fb90fc06f6c0').then(console.log);
