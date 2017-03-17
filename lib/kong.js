/* eslint camelcase: "off" */

const Promise = require('bluebird');

const request = Promise.promisify(require('request'));

const _ = require('lodash');

const methods = ['get', 'post', 'patch', 'delete'];

Promise.promisifyAll(request);

// TODO add headers as second arg and impl
function Connection(base_url) {
  this.request = Promise.promisifyAll(request);
  this.base_url = base_url;

  const self = this;

  methods.forEach((method) => {
    let re;
    self[method] = function (_options) { /* eslint func-names: 'off' */
      let options = _options || {};


      const url = `${this.base_url}${this.path}`;
      const form_methods = ['post', 'patch'];

      if (form_methods.indexOf(method) > -1) {
        options = { form: options };
      }
      return this.request[`${method}Async`](url, options)
                .then((res) => {
                  res = res.toJSON(); /* eslint no-param-reassign: 'off' */
                  re = new RegExp('^20[0-9]$');

                    // if http status code is in the 200s try and parse body as JSON
                  if (re.test(res.statusCode)) {
                    try {
                      res.body = JSON.parse(res.body);
                    } catch (e) {
                      res.body = '';
                    }
                  }
                  return res;
                });
    };
  });
}

function moduleFn(base_url, headers, instance) {
  headers = headers || {};
  const usage = "api('http://localhost:8001', {optional: 'headers'}, {someMethod: function() {this.path = '/consumers'}})'";
  if (typeof (base_url) !== 'string') {
    throw new Error(`base_url is required as the first param: ie ${usage}`);
  }
  if (typeof (instance) !== 'object') {
    throw new Error(`instance is required as the third param: ie ${usage}`);
  }

    // sanity check to make sure caller's instance doesn't contain property names
    // matching that of HTTP supported methods
  methods.forEach((method) => {
    // if (instance.hasOwnProperty(method)) {
    if (instance.hasOwnProperty(method)) { /* eslint no-prototype-builtins: 'off' */
      throw new Error(`second argument(instance) is not allowed to use HTTP method name: ${method}`);
    }
  });

  const obj = new Connection(base_url, headers);
  _.extend(instance, obj);
  return instance;
}

module.exports = moduleFn;
