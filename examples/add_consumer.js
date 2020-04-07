const kong = require('../index')();

/*
INPUT
{username: required
plus any other valid options for POST /consumers
}

OUTPUT
 { username: 'user1',
 created_at: some_timestamp,
 id: 'some id' }

 */
kong.consumers.create({username: 'user1'}).then(console.log);
