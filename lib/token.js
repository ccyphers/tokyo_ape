"use strict";

var uuid = require('node-uuid')
    , obj = {}
    , Promise = require('bluebird')
    , jsonwebtoken = require('jsonwebtoken')
    , normalize_body = require('./normalize_body')
    , Consumers = require('../actions/consumers')
    , consumers;



obj.uuid = uuid.v4;

obj.jwt = function(consumer_id_or_name, options) {
    var jwt;
  return consumers.listAllJWT(consumer_id_or_name)
      .then(function(res) {

          if (res.body.data.length === 0) {
              jwt = consumers.createJWT(consumer_id_or_name)
          } else {
              jwt = new Promise(function (resolve, reject) {
                  resolve(res.body.data[0])
              });

          }

          return jwt
      })
      .then(function(jwt_res) {
          if(jwt_res.body) { // in case JWT was created else reuse existing and don't have to access body
              jwt_res = jwt_res.body
          }
          return jsonwebtoken.sign({iss: jwt_res.key}, jwt_res.secret);
      })

};

module.exports = function(base_url) {
    consumers = Consumers(base_url);
    return obj;
};