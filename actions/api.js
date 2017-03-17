/* eslint camelcase: 'off' */

const kong = require('../lib/kong');

const normalize_body = require('../lib/normalize_body');

const Promise = require('bluebird');


function apiModule(base_url, headers) {
  function add(options) {
    this.path = '/apis';
    return this.post(options);
  }

  function update(name_or_id, options) {
    this.path = `/apis/${name_or_id}`;
    return this.patch(options);
  }

  function remove(name_or_id) {
    this.path = `/apis/${name_or_id}`;
    return this.delete();
  }

  function addPlugin(name_or_id, options) {
    this.path = `/apis/${name_or_id}/plugins`;
    return this.post(options);
  }

  function removePlugin(api_name_or_id, id) {
    this.path = `/apis/${api_name_or_id}/plugins/${id}`;
    return this.delete();
  }

  function removeAllPlugins(name_or_id) {
    this.path = `/apis/${name_or_id}/plugins`;
    const promises = [];
    return this.get()
        .then((res) => {
          res.body = normalize_body(res.body); /* eslint no-param-reassign: 'off' */
          res.body.data.forEach((item) => {
            promises.push(removePlugin(name_or_id, item.id));
          });
          return Promise.all(promises);
        });
  }

  const api = {
    add,
    update,
    remove,
    addPlugin,
    removePlugin,
    removeAllPlugins,
  };

  return kong(base_url, headers, api);
}


module.exports = apiModule;
