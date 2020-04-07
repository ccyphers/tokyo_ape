/* eslint camelcase: "off" */

const axios = require('axios');

const _ = require('lodash');

const methods = ['get', 'post', 'patch', 'delete'];

// TODO add headers as second arg and impl
function Connection(base_url) {
    this.base_url = base_url;

    const self = this;

    methods.forEach((method) => {
        let re;
        self[method] = function (_options) { /* eslint func-names: 'off' */
            const options = _options || {};


            const url = `${this.base_url}${this.path}`;
      
            return axios[method](url, options)
                .then((res) => {
                    re = new RegExp('^20[0-9]$');
                    // if http status code is in the 200s try and parse body as JSON
                    return re.test(res.status) ? res.data : '';
                });
        };
    });
}

function moduleFn(base_url, headers, instance) {
    headers = headers || {};
    const usage = 'api(\'http://localhost:8001\', {optional: \'headers\'}, {someMethod: function() {this.path = \'/consumers\'}})\'';
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
    // return {...instance, ...obj};
}

module.exports = moduleFn;
