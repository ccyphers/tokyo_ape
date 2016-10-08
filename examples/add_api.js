var kong = require('../index')()
    , util = require('util');


/*
INPUT
Object containing any valid options alled to POST http://kong_admin/apis

OUTPUT:
 { upstream_url: 'https://www.google.com',
 strip_request_path: true,
 request_path: '/google',
 id: '2c21fb14-5785-4851-922d-a2bf5660415e',
 created_at: 1475957149000,
 preserve_host: false,
 name: 'google' }

 */

kong.api.add({name: 'google', upstream_url: 'https://www.google.com', request_path: '/google', strip_request_path: true})
    .then(function(res) {
        console.log(util.inspect(res.body));
    });

