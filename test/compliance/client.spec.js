var expect = require('chai').expect;
var utils = require('./utils');

describe('bacstack - readProperty integration', function() {
  it('should return a timeout error if no device is available', function(next) {
    var client = new utils.bacnetClient({adpuTimeout: 5000});

    client.on('iAm', function(device) {
      console.log('address: ', device.address);
      console.log('deviceId: ', device.deviceId);
      console.log('maxAdpu: ', device.maxAdpu);
      console.log('segmentation: ', device.segmentation);
      console.log('vendorId: ', device.vendorId);
    });
    client.whoIs();

    client.readProperty('172.19.0.2', 8, 1234, 28, null, function(err, value) {
      console.log(value);
      expect(err).to.not.eql(new Error('ERR_TIMEOUT'));
      client.close();
      next();
    });
  });
});
