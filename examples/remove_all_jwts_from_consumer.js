kong = require('../index')();


/*
INPUT
@id: either the consumer name or id



 */
kong.consumers.removeAllJWTFromConsumer('user1')
    .then(function(res) {
        console.log(JSON.stringify(res));
    });

