kong = require('../index')();


/*
INPUT
arguments[0]: id or name for api


OUTPUT

 */

kong.api.removeAllPlugins('google')
    .then(function(res) {
        console.log(JSON.stringify(res));
    });

