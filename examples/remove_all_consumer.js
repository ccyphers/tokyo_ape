var kong = require('../index')()
    , util = require('util');

/*
INPUT: none


 */
kong.consumers.removeAll()
    .then(function(res) {
        console.log(util.inspect(res));
    });

