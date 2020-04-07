var kong = require('../index')();

kong.upstreams.add({name: 'google'}).catch(console.error)
    .then(res => {
        console.log(res);
        return kong.upstreams.setTargets('google', {target: 'www.google.com:443'}).catch(console.error);
    })
    .then(res => {
        console.log(res);
        return kong.services.add({name: 'google', url: 'https://google'}).catch(console.error);
        
    })
    .then(function(res) {
        console.log(res);
        return kong.routes.add({name: 'google', service: {name: 'google'}, strip_path: true, paths: ['/google']}).catch(console.error);
    })
    .then(function(res) {
        console.log(res);
    });

