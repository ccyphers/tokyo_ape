"use strict";

var Promise = require('bluebird')
    ,request = Promise.promisify(require('request'))
    , _ = require('lodash')
    , methods = ['get', 'post', 'patch', 'delete'];

Promise.promisifyAll(request);

function Connection(base_url, headers) {
    this.request = Promise.promisifyAll(request);
    this.base_url = base_url;

    var self = this;

    methods.forEach(function(method) {
        var re;
        self[method] = function(options) {
            options = options || {};
            //console.log("METHOD: " + method + "    PATH: " + this.path + "    OPTIONS: " + JSON.stringify(options));
            var url = this.base_url + this.path
                , match, form_methods = ['post', 'patch']
            if(form_methods.indexOf(method) > -1) {
                options = {form: options}
            }
            return this.request[method + 'Async'](url, options)
                .then(function(res) {
                    res = res.toJSON();
                    re = new RegExp("^20[0-9]$");

                    // if http status code is in the 200s try and parse body as JSON
                    if( re.test(res.statusCode) ) {
                        try {
                            res.body = JSON.parse(res.body);
                        } catch(e) {
                            res.body = "";
                        }
                    }
                    return res;
                })
        }
    })
}

module.exports = function(base_url, headers, instance) {
    var obj;
    headers = headers || {};
    var usage = "api('http://localhost:8001', {optional: 'headers'}, {someMethod: function() {this.path = '/consumers'}})'" ;
    if(typeof(base_url) != 'string') {
        throw new Error("base_url is required as the first param: ie " + usage)
    }
    if(typeof(instance) != 'object') {
        throw new Error("instance is required as the third param: ie " + usage)
    }


    // sanity check to make sure caller's instance doesn't contain property names
    // matching that of HTTP supported methods
    methods.forEach(function(method) {
        if(instance.hasOwnProperty(method)) {
            throw new Error("second argument(instance) is not allowed to use HTTP method name: " + method)
        }
    });

    obj = new Connection(base_url, headers);
    _.extend(instance, obj);
    return instance
};
