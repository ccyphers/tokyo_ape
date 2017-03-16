var kong = require('../index')()
    , util = require('util');


/*
INPUT
Object containing any valid options alled to POST http://kong_admin/apis

OUTPUT:
 { methods: [ 'GET' ],
 http_if_terminated: true,
 id: '9bbf8118-5b8e-447d-afc3-9bf782b2807c',
 retries: 5,
 preserve_host: false,
 created_at: 1489665806709,
 upstream_connect_timeout: 60000,
 upstream_url: 'https://www.google.com',
 uris: [ '/google' ],
 https_only: false,
 upstream_send_timeout: 60000,
 upstream_read_timeout: 60000,
 name: 'google',
 strip_uri: true }

 */

kong.api.add({name: 'google', methods: 'GET', upstream_url: 'https://www.google.com', uris: '/google', strip_uri: true})
    .then(function(res) {
        console.log(util.inspect(res.body));
    });

