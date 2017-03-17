/* eslint camelcase: 'off' */

const uuid = require('node-uuid');

const obj = {};

const Promise = require('bluebird');

const jsonwebtoken = require('jsonwebtoken');

const Consumers = require('../actions/consumers');

let consumers;

obj.uuid = uuid.v4;

function get_jwt(list_res, consumer_id_or_name) {
  let _jwt; /* eslint no-underscore-dangle: 'off' */
  if (list_res.body.data.length === 0) {
    _jwt = consumers.createJWT(consumer_id_or_name);
  } else {
    _jwt = new Promise((resolve) => {
      resolve(list_res.body.data[0]);
    });
  }
  return _jwt;
}

function jwt(consumer_id_or_name) {
  return consumers.listAllJWT(consumer_id_or_name)
      .then((res) => {
        if (typeof (res.body) === 'string') {
          return consumers.create({ username: consumer_id_or_name })
              .then(() => consumers.createJWT(consumer_id_or_name));
        }
        return get_jwt(res, consumer_id_or_name);
      })
      .then((jwt_res) => {
        // in case JWT was created else reuse existing and don't have to access body
        if (jwt_res.body) {
          jwt_res = jwt_res.body; /* eslint no-param-reassign: 'off' */
        }
        return jsonwebtoken.sign({ iss: jwt_res.key }, jwt_res.secret);
      });
}

obj.jwt = jwt;

function moduleFn(base_url) {
  consumers = Consumers(base_url);
  return obj;
}

module.exports = moduleFn;
