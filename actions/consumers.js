/* eslint camelcase: 'off' */

const kong = require('../lib/kong');

const Promise = require('bluebird');

const normalize_body = require('../lib/normalize_body');


function consumersModule(base_url, headers) {
  function create(options) {
    this.path = '/consumers';
    return this.post(options);
  }

  function listAll() {
    this.path = '/consumers';
    return this.get();
  }

  function list(id) {
    this.path = `/consumers/${id}`;
    return this.get();
  }

  function remove(id) {
    this.path = `/consumers/${id}`;
    return this.delete();
  }

  function removeAll() {
    const promises = [];

    return this.listAll()
            .then((res) => {
              res.body = normalize_body(res.body); /* eslint no-param-reassign: 'off' */

              res.body.data.forEach((consumer) => {
                promises.push(remove(consumer.id));
              });

              return Promise.all(promises);
            });
  }

  function removeJWT(consumer_id, jwt_id) {
    this.path = `/consumers/${consumer_id}/jwt/${jwt_id}`;
    return this.delete();
  }

  function removeAllJWTFromConsumer(id_or_name) {
    this.path = `/consumers/${id_or_name}/jwt`;
    const promises = [];
    return this.get()
            .then((res) => {
              res.body = normalize_body(res.body);
              res.body.data.forEach((item) => {
                promises.push(removeJWT(id_or_name, item.id));
              });
              return Promise.all(promises);
            });
  }

  function listAllJWT(consumer_id) {
    this.path = `/consumers/${consumer_id}/jwt`;
    return this.get();
  }

  function removeAllJWT() {
    return this.listAll()
          .then((res) => {
            res.body = normalize_body(res.body);

            let promises = [];
            res.body.data.forEach((consumer) => {
              promises.push(listAllJWT(consumer.id));
            });
            return Promise.all(promises)
                  .then((jwts) => {
                    promises = [];
                    jwts.forEach((jwt) => {
                      jwt.body = normalize_body(jwt.body);

                      jwt.body.data.forEach((item) => {
                        promises.push(removeJWT(item.consumer_id, item.id));
                      });
                    });
                    return Promise.all(promises);
                  });
          });
  }

  function createJWT(consumer_id, options) {
    this.path = `/consumers/${consumer_id}/jwt`;
    return this.post(options);
  }

  const consumers = {
    create,
    listAll,
    list,
    remove,
    removeAll,
    removeJWT,
    removeAllJWTFromConsumer,
    removeAllJWT,
    listAllJWT,
    createJWT,
  };

  return kong(base_url, headers, consumers);
}

module.exports = consumersModule;
