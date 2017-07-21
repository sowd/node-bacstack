var bacnet = require('../');

// Initialize BACStack
var client = new bacnet({adpuTimeout: 6000});

// Discover Devices
client.on('iAm', function(device) {
  console.log('address: ', device.address);
  console.log('deviceId: ', device.deviceId);
  console.log('maxAdpu: ', device.maxAdpu);
  console.log('segmentation: ', device.segmentation);
  console.log('vendorId: ', device.vendorId);
});
client.whoIs();

// Read Device Object
var requestArray = [{
  objectIdentifier: {type: 8, instance: 4194303},
  propertyReferences: [{propertyIdentifier: 8}]
}];
client.readPropertyMultiple('192.168.1.43', requestArray, function(err, value) {
  console.log('value: ', value);
});
