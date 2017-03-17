var kong = require('../index')()
    , util = require('util');


kong.service.add({name: 'google'})
    .then(function(res) {
        console.log(util.inspect(res.body));
        return kong.service.setTargets('google', {target: '172.217.6.142:80'})

    })
    .then(function(res) {
        console.log(util.inspect(res.body));
    })

