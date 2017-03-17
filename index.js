/* eslint camelcase: 'off' */

const Consumers = require('./actions/consumers');

const Api = require('./actions/api');

const Token = require('./lib/token');

const Service = require('./actions/service');

function tokyoApiEntry(_base_url) {
  const obj = {};

  const base_url = _base_url || 'http://127.0.0.1:8001';

  obj.consumers = Consumers(base_url);
  obj.api = Api(base_url);
  obj.service = Service(base_url);
  obj.token = Token(base_url);

  return obj;
}

module.exports = tokyoApiEntry;
