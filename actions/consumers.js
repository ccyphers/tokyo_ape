"use strict";

module.exports = function(base_url, headers) {
    var kong = require('../lib/kong')
        ,consumers = {}
        , Promise = require('bluebird')
        , normalize_body = require('../lib/normalize_body');

    consumers.create = function(options) {
        this.path = '/consumers';
        return this.post(options)
    };

    consumers.listAll = function() {
        this.path = '/consumers';
        return this.get()
    };

    consumers.list = function(id) {
        this.path = '/consumers/' + id;
        return this.get()
    };

    consumers.remove = function(id) {
        this.path = '/consumers/' + id;
        return this.delete()
    };

    consumers.removeAll = function() {
        var promises = [];

        return this.listAll()
            .then(function(res) {
                res.body = normalize_body(res.body);

                res.body.data.forEach(function(consumer) {
                    promises.push(consumers.remove(consumer.id));
                });

                return Promise.all(promises)
            })
    };

    consumers.removeJWT = function(consumer_id, jwt_id) {
        this.path = '/consumers/' + consumer_id + '/jwt/' + jwt_id;
        return this.delete();

    };

    consumers.removeAllJWTFromConsumer = function(id_or_name) {
        this.path = '/consumers/' + id_or_name + '/jwt';
        var promises = [];
        return this.get()
            .then(function(res) {
                res.body = normalize_body(res.body);
                res.body.data.forEach(function(item) {
                    promises.push(consumers.removeJWT(id_or_name, item.id))
                });
                return Promise.all(promises)
            })
    };

    consumers.removeAllJWT = function() {
      return this.listAll()
          .then(function(res) {
              res.body = normalize_body(res.body);

              var promises = [];
              res.body.data.forEach(function(consumer) {
                  promises.push(consumers.listAllJWT(consumer.id));
              });
              return Promise.all(promises)
                  .then(function(jwts) {
                      promises = [];
                      jwts.forEach(function(jwt) {
                          jwt.body = normalize_body(jwt.body);

                          jwt.body.data.forEach(function(item) {
                              promises.push(consumers.removeJWT(item.consumer_id, item.id))
                          })
                      });
                      return Promise.all(promises);
                  })
          })
    };

    consumers.listAllJWT = function(consumer_id) {
        this.path = '/consumers/' + consumer_id + '/jwt';
        return this.get()
    };

    consumers.createJWT = function(consumer_id, options) {
        this.path = '/consumers/' + consumer_id + '/jwt';
        return this.post(options);
    };

    return kong(base_url, headers, consumers);
};

