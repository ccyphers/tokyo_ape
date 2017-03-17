/* eslint camelcase: 'off' */

const kong = require('../lib/kong');

function serviceModule(base_url, headers) {
  const upstreamsPath = '/upstreams';

  function add(options) {
    this.path = upstreamsPath;
    return this.post(options);
  }

  function list(options) {
    this.path = upstreamsPath;
    return this.get(options);
  }

  function update(name_or_id, options) {
    this.path = `${upstreamsPath}/${name_or_id}`;
    return this.patch(options);
  }

  function remove(name_or_id) {
    this.path = `${upstreamsPath}/${name_or_id}`;
    return this.delete();
  }

  function setTargets(name_or_id, options) {
    this.path = `${upstreamsPath}/${name_or_id}/targets`;
    return this.post(options);
  }

  function getTargets(name_or_id) {
    this.path = `${upstreamsPath}/${name_or_id}/targets`;
    return this.get();
  }


  const api = {
    add,
    list,
    update,
    remove,
    setTargets,
    getTargets,
  };

  return kong(base_url, headers, api);
}

module.exports = serviceModule;
