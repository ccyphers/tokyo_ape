kong = require('../index')();


/*
INPUT
@id: either the consumer name or id

OUTPUT
 { username: 'user1',
 created_at: some_timestamp,
 id: 'some id' }

 */
kong.consumers.list('user1')
    .then(function(res) {
        console.log(res.body);
    });

