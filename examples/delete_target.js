var kong = require('../index')()
    , util = require('util');


kong.service.deleteTarget('google', 'google_host_1')
    .then(function(res) {
        console.log(util.inspect(res.body));
    })

