const kong = require('../index')();

/*
INPUT: none


 */
kong.consumers.removeAll().then(console.log);
