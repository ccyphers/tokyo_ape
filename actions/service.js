/* eslint camelcase: 'off' */

const kong = require('../lib/kong');

function serviceModule(base_url, headers) {
  const upstreamsPath = '/upstreams';

  const api = {};

  api.add = function add(options) {
    this.path = upstreamsPath;
    return this.post(options);
  };

  api.list = function list(options) {
    this.path = upstreamsPath;
    return this.get(options);
  };

  api.update = function update(name_or_id, options) {
    this.path = `${upstreamsPath}/${name_or_id}`;
    return this.patch(options);
  };

  api.remove = function remove(name_or_id) {
    this.path = `${upstreamsPath}/${name_or_id}`;
    return this.delete();
  };

  api.setTargets = function setTargets(name_or_id, options) {
    this.path = `${upstreamsPath}/${name_or_id}/targets`;
    return this.post(options);
  };

  api.getTargets = function getTargets(name_or_id) {
    this.path = `${upstreamsPath}/${name_or_id}/targets`;
    return this.get();
  };

  api.updateTarget = function updateTarget(name_or_id, target_name_or_id, options) {
    this.path = `${upstreamsPath}/${name_or_id}/targets/target_name_or_id`;
    return this.post(options);
  };

  // since targets can't be deleted set the weight to 0 for deactivation
  api.removeTarget = function removeTarget(name_or_id, target_name_or_id) {
    const options = {
      weight: 0,
    };
    return api.updateTarget(name_or_id, target_name_or_id, options);
  };


  return kong(base_url, headers, api);
}

module.exports = serviceModule;
