/* eslint camelcase: 'off' */

const Consumers = require('./actions/consumers');

const Routes = require('./actions/routes');

const Token = require('./lib/token');

const Upstreams = require('./actions/upstreams');

const Services = require('./actions/services');

function tokyoApiEntry(_base_url) {
    const obj = {};

    const base_url = _base_url || 'http://127.0.0.1:8001';

    obj.consumers = Consumers(base_url);
    obj.routes = Routes(base_url);
    obj.services = Services(base_url);
    obj.upstreams = Upstreams(base_url);
    obj.token = Token(base_url);

    return obj;
}

module.exports = tokyoApiEntry;
