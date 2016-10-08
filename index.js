"use strict";

var obj = {};

module.exports = function(base_url) {
    var Consumers = require('./actions/consumers')
        , Api = require('./actions/api')
        , Token = require('./lib/token');


    base_url = base_url || 'http://127.0.0.1:8001';
    obj.consumers = Consumers(base_url);
    obj.api = Api(base_url);
    obj.token = Token(base_url);

    return obj;

};