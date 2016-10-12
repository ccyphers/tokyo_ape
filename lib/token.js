"use strict";

var uuid = require('node-uuid')
    , obj = {}
    , Promise = require('bluebird')
    , jsonwebtoken = require('jsonwebtoken')
    , normalize_body = require('./normalize_body')
    , Consumers = require('../actions/consumers')
    , consumers;



obj.uuid = uuid.v4;

function get_jwt(list_res, consumer_id_or_name) {
    var jwt;
    if (list_res.body.data.length === 0) {
        jwt = consumers.createJWT(consumer_id_or_name)
    } else {
        jwt = new Promise(function (resolve, reject) {
            resolve(list_res.body.data[0])
        });

    }
    return jwt
}

obj.jwt = function(consumer_id_or_name, options) {
    var jwt;
  return consumers.listAllJWT(consumer_id_or_name)
      .then(function(res) {
          if(typeof(res.body) === 'string') {
              return consumers.create({username: consumer_id_or_name})
                  .then(function() {
                      return consumers.createJWT(consumer_id_or_name)
                  })
          } else {
            return get_jwt(res, consumer_id_or_name)
          }
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
