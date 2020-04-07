const kong = require('../index')();

/*
INPUT: none

OUTPUT: Array of all consumers defined by body.data
 */

kong.consumers.listAll().then(console.log);