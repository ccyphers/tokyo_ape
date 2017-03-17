var kong = require('../index')()
    , util = require('util');


kong.service.add({name: 'google'})
    .then(function(res) {
        console.log(util.inspect(res.body));
        return kong.service.setTargets('google', {target: '172.217.6.142:443'})

    })
    .then(function(res) {
        console.log(util.inspect(res.body));
        return kong.api.add({name: 'google', methods: 'GET', upstream_url: 'https://google', uris: '/google', strip_uri: true})
    })
    .then(function(res) {
        console.log(util.inspect(res.body));
    })

