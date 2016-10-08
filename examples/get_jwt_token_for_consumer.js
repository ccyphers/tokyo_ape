kong = require('../index')();


/*
INPUT
@id: either the consumer name or id

OUTPUT
 signed jwt token ie:
 eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI5ZjNlMmQ1OWNhMjg0NmViOWNjOTc1YmZlNzgwZmQ3NiIsImlhdCI6MTQ3NTc1NTY5NX0.MCHH6uhrVWE63zuDJ32jFEjBc0mFCy6xKRdDg_85E8A

 to be used with api calls for header: 'Authorization: Bearer returned_token'

 */
kong.token.jwt('user1')
    .then(function(token) {
        console.log(token);
    });

