const kong = require('../index')();
    
/*
INPUT
arguments[0]: id or name for api
arguments[1]: Object containing valid options for:
 POST http://kong_admin/apis/<id or name>/plugins


Example OUTPUT:

 { api_id: '2c21fb14-5785-4851-922d-a2bf5660415e',
 id: 'd2dfc059-1e1d-429f-872a-fb90fc06f6c0',
 created_at: 1475957195000,
 enabled: true,
 name: 'jwt',
 config:
 { uri_param_names: [ 'jwt' ],
 secret_is_base64: false,
 key_claim_name: 'iss' } }
 */

kong.services.addPlugin('google', {name: 'jwt'}).then(console.log);
