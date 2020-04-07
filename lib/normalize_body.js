function normalize(_body) {
    let body = _body;
    if (typeof (body) === 'string') {
        body = {};
    }
    body = body || {};
    body.data = body.data || [];

    return body;
}

module.exports = normalize;
