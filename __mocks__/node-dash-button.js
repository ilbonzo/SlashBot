const stream = require('stream');
let dashButton = jest.genMockFromModule('node-dash-button');

dashButton = function (mac_address) {
    var readStream = new stream.Readable({
        objectMode: true
    });
    return readStream;
}

module.exports = dashButton;