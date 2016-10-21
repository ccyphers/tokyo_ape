# Tokyo Ape

For user's who enjoy working with mashape's
kong(https://getkong.org) and want a standalone nodejs based API
for integrating with the Admin interface,
without a lot of overhead review the examples to get an idea how you can
use this interface in your project.

This is very early stage code, with a lot of enhancements
needed to include things such as passing on header details from the
caller to the admin instance.  Stay tuned for a demo application using
Tokyo Ape.

## Getting Started Examples

### Add an API(examples/add_api.js):
    var kong = require('./index')()
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



### Add a plugin to an API(examples/add_plugin_to_api.js):
    var kong = require('./index')()
        , util = require('util');



    /*
    INPUT
    arguments[0]: id or name for api
    arguments[1]: Object containing valid options for:
     POST http://kong_admin/apis/<id or name>/plugins


    Example OUTPUT:

     { api_id: '2c21fb14-5785-4851-922d-a2bf5660415e',
     id: 'd2dfc059-1e1d-429f-872a-fb90fc06f6c0',
     created_at: 1475957195000,
     enabled: true,
     name: 'jwt',
     config:
     { uri_param_names: [ 'jwt' ],
     secret_is_base64: false,
     key_claim_name: 'iss' } }
     */

    kong.api.addPlugin('google', {name: 'jwt'})
        .then(function(res) {
            console.log(util.inspect(res.body));
        });


### Remove a plugin from an API(examples/remove_plugin_from_api.js):
    kong = require('./index')();


    /*
    INPUT
    arguments[0]: id or name for api
    arguments[1]: plugin id


    OUTPUT: body will be an empty string with all other header and http status information preserved.

     */

    kong.api.removePlugin('google', '2ebd7629-4237-4253-a6ee-f54734a2b7ac')
        .then(function(res) {
            console.log(JSON.stringify(res));
        });


### Remove all plugins from an API(examples/remove_all_plugins_from_api.js):
    kong = require('./index')();


    /*
    INPUT
    arguments[0]: id or name for api


    OUTPUT

     */

    kong.api.removeAllPlugins('google')
        .then(function(res) {
            console.log(JSON.stringify(res));
        });


### Remove an API(examples/remove_api.js):
    kong = require('./index')();


    /*
    INPUT id or name for api

    OUTPUT: body will be an empty string with all other header and http status information preserved.

     */

    kong.api.remove('google')
        .then(function(res) {
            console.log(JSON.stringify(res));
        });



### Add a consumer(examples/add_consumer.js):
    kong = require('./index')();


    /*
    INPUT
    {username: required
    plus any other valid options for POST /consumers
    }

    OUTPUT
     { username: 'user1',
     created_at: some_timestamp,
     id: 'some id' }

     */
    kong.consumers.create({username: 'user1'})
        .then(function(res) {
            console.log(res.body);
        });

### List a consumer(examples/list_consumer.js):
    kong = require('./index')();


    /*
    INPUT
    @id: either the consumer name or id

    OUTPUT
     { username: 'user1',
     created_at: some_timestamp,
     id: 'some id' }

     */
    kong.consumers.list('user1')
        .then(function(res) {
            console.log(res.body);
        });

### List all consumers(examples/list_all_consumers.js):
    kong = require('./index')();


    /*
    INPUT: none

    OUTPUT: Array of all consumers defined by body.data
     */

    kong.consumers.listAll()
        .then(function(res) {
            console.log(JSON.stringify(res.body.data));
        });

### Get a JWT Token for a consumer(examples/get_jwt_token_for_consumer.js):
    kong = require('./index')();


    /*
    INPUT
    @id: either the consumer name or id

    OUTPUT
     signed jwt token ie:
     eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI5ZjNlMmQ1OWNhMjg0NmViOWNjOTc1YmZlNzgwZmQ3NiIsImlhdCI6MTQ3NTc1NTY5NX0.MCHH6uhrVWE63zuDJ32jFEjBc0mFCy6xKRdDg_85E8A

     to be used with api calls for header: 'Authorization: Bearer returned_token'

     */
    kong.token.jwt('user1')
        .then(function(token) {
            console.log(token);
        });

### Remove all JWTs from a consumer(examples/remove_all_jwts_from_consumer.js):
    kong = require('./index')();


    /*
    INPUT
    @id: either the consumer name or id



     */
    kong.consumers.removeAllJWTFromConsumer('user1')
        .then(function(res) {
            console.log(JSON.stringify(res));
        });


### Remove a consumer(examples/remove_consumer.js):
    kong = require('./index')();


    /*
    INPUT
    @id: either the consumer name or id

    OUTPUT: body will be an empty string with all other header and http status information preserved.

     */
    kong.consumers.remove('user1')
        .then(function(res) {
            console.log(res.body);
        });

### Remove all consumers(examples/remove_all_consumers.js):
    kong = require('./index')();


    /*
    INPUT: none


     */
    kong.consumers.removeAll()
        .then(function(res) {
            console.log(res);
        });

