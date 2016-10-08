"use strict";

module.exports = function(body) {
    if(typeof(body) === 'string') {
        body = {};
    }
    body = body || {};
    body.data = body.data || [];

    return body;
};