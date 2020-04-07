/* eslint camelcase: 'off' */

const kong = require('../lib/kong');

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
        return this.listAll()
            .then((res) =>
                Promise.all(
                    res.data.map(consumer => consumers.remove(consumer.id))
                )
            );
    };

    consumers.removeJWT = function removeJWT(consumer_id, jwt_id) {
        this.path = `/consumers/${consumer_id}/jwt/${jwt_id}`;
        return this.delete();
    };

    consumers.removeAllJWTFromConsumer = function removeAllJWTFromConsumer(id_or_name) {
        this.path = `/consumers/${id_or_name}/jwt`;
        return this.get()
            .then(res =>
                Promise.all(
                    res.data.map(consumer => consumers.removeJWT(id_or_name, consumer.id)) 
                )
            );
    };

    consumers.removeAllJWT = function removeAllJWT() {
        return this.listAll()
            .then(res => 
                Promise.all(
                    res.data.map(consumer => consumers.listAllJWT(consumer.id))
                )
            )
            .then(jwts =>
                Promise.all(
                    jwts.map(jwt => consumers.removeJWT(jwt.consumer_id, jwt.id))
                )
            );
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
