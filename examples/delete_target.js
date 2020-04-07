const kong = require('../index')();

kong.upstreams.deleteTarget('google', 'google_host_1').then(console.log);
