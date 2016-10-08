kong = require('../index')();


/*
INPUT
@id: either the consumer name or id

OUTPUT: body will be an empty string with all other header and http status information preserved.

 */
kong.consumers.remove('user1')
    .then(function(res) {
        console.log(res.body);
    });

