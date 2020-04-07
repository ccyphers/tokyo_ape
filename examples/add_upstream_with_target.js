const kong = require('../index')();
    
kong.upstreams.add({name: 'google'})
    .then(res => {
        console.log(res);
        return kong.upstreams.setTargets('google', {target: '172.217.6.142:80'});
    })
    .then(console.log);
