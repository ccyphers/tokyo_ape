"use strict";

module.exports = function(base_url, headers) {
    var kong = require('../lib/kong')
        ,api = {}
        , normalize_body = require('../lib/normalize_body')
        , Promise = require('bluebird');

    api.add = function(options) {
        this.path = '/apis';
        return this.post(options);
    };

    api.remove = function(name_or_id) {
        this.path = '/apis/' + name_or_id;
        return this.delete();
    };

    api.addPlugin = function(name_or_id, options) {
        this.path = '/apis/' + name_or_id + '/plugins';
        return this.post(options);
    };

    api.removePlugin = function(api_name_or_id, id) {
        this.path = '/apis/' + api_name_or_id + '/plugins/' + id;
        return this.delete();
    };

    api.removeAllPlugins = function(name_or_id) {
        this.path = '/apis/' + name_or_id + '/plugins';
        var promises = [];
        return this.get()
            .then(function(res) {
                res.body = normalize_body(res.body);
                res.body.data.forEach(function(item) {
                    promises.push(api.removePlugin(name_or_id, item.id))
                });
                return Promise.all(promises);
            })
    };

    return kong(base_url, headers, api);
};