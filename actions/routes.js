/* eslint camelcase: 'off' */

const kong = require('../lib/kong');

const Promise = require('bluebird');


function routesModule(base_url, headers) {
    const api = {};

    api.list = function add(options) {
        this.path = '/routes';
        return this.get(options);
    };

    api.add = function add(options) {
        this.path = '/routes';
        return this.post(options);
    };

    api.update = function update(name_or_id, options) {
        this.path = `/routes/${name_or_id}`;
        return this.patch(options);
    };

    api.remove = function remove(name_or_id) {
        this.path = `/routes/${name_or_id}`;
        return this.delete();
    };

    api.addPlugin = function addPlugin(name_or_id, options) {
        this.path = `/routes/${name_or_id}/plugins`;
        return this.post(options);
    };

    api.removePlugin = function removePlugin(api_name_or_id, id) {
        this.path = `/routes/${api_name_or_id}/plugins/${id}`;
        return this.delete();
    };

    api.removeAllPlugins = function removeAllPlugins(name_or_id) {
        this.path = `/routes/${name_or_id}/plugins`;
        return this.get()
            .then((res) =>
                Promise.all(
                    res.data.map(plugin => api.removePlugin(name_or_id, plugin.id))
                )
            );
    };


    return kong(base_url, headers, api);
}


module.exports = routesModule;
