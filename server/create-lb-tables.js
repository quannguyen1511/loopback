var server = require('./server');
var ds = server.dataSources.postgres;
var lbTables = [
  'User',
  'AccessToken',
  'ACL',
  'RoleMapping',
  'Role',
  'parkingLot',
  'company',
];
lbTables.forEach(model => {
  ds.automigrate(/* model, function(er) {
    if (er) throw er;
    console.log('Loopback tables [' + model + '] created in ', ds.adapter.name);
    
  } */);
  ds.disconnect();
});
