/* eslint camelcase: 'off' */

const kong = require('../lib/kong');

const Promise = require('bluebird');

const normalize_body = require('../lib/normalize_body');


function consumersModule(base_url, headers) {
  const consumers = {};


  consumers.create = function create(options) {
    this.path = '/consumers';
    return this.post(options);
  };

  consumers.listAll = function listAll() {
    this.path = '/consumers';
    return this.get();
  };

  consumers.list = function list(id) {
    this.path = `/consumers/${id}`;
    return this.get();
  };

  consumers.remove = function remove(id) {
    this.path = `/consumers/${id}`;
    return this.delete();
  };

  consumers.removeAll = function removeAll() {
    const promises = [];

    return this.listAll()
        .then((res) => {
          res.body = normalize_body(res.body); /* eslint no-param-reassign: 'off' */

          res.body.data.forEach((consumer) => {
            promises.push(consumers.remove(consumer.id));
          });

          return Promise.all(promises);
        });
  };

  consumers.removeJWT = function removeJWT(consumer_id, jwt_id) {
    this.path = `/consumers/${consumer_id}/jwt/${jwt_id}`;
    return this.delete();
  };

  consumers.removeAllJWTFromConsumer = function removeAllJWTFromConsumer(id_or_name) {
    this.path = `/consumers/${id_or_name}/jwt`;
    const promises = [];
    return this.get()
        .then((res) => {
          res.body = normalize_body(res.body);
          res.body.data.forEach((item) => {
            promises.push(consumers.removeJWT(id_or_name, item.id));
          });
          return Promise.all(promises);
        });
  };

  consumers.removeAllJWT = function removeAllJWT() {
    return this.listAll()
        .then((res) => {
          res.body = normalize_body(res.body);

          let promises = [];
          res.body.data.forEach((consumer) => {
            promises.push(consumers.listAllJWT(consumer.id));
          });
          return Promise.all(promises)
              .then((jwts) => {
                promises = [];
                jwts.forEach((jwt) => {
                  jwt.body = normalize_body(jwt.body);

                  jwt.body.data.forEach((item) => {
                    promises.push(consumers.removeJWT(item.consumer_id, item.id));
                  });
                });
                return Promise.all(promises);
              });
        });
  };

  consumers.listAllJWT = function listAllJWT(consumer_id) {
    this.path = `/consumers/${consumer_id}/jwt`;
    return this.get();
  };

  consumers.createJWT = function createJWT(consumer_id, options) {
    this.path = `/consumers/${consumer_id}/jwt`;
    return this.post(options);
  };


  return kong(base_url, headers, consumers);
}

module.exports = consumersModule;
