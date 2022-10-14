const ET_Client = require('./lib/ET_Client');
const clientId = 'ds9g9y2y2f8y8kxit54r51aa';
const clientSecret = 'oT0gx4FZJGItMLdoVXQ08doR';
const stack = 's10';
const client = new ET_Client(clientId, clientSecret, stack, {origin, authOrigin, soapOrigin}); // stack is ignored

const deRow = client.dataExtensionRow({
  Name: 'Test',
  props: ['FirstName', 'LastName'],

  // to return all rows, delete the filter property
});

deRow.get((err, res) => {
  if (err) {
    console.error(err.message);
  } else {
    for (const result of res.body.Results) {
      for (const property of result.Properties.Property) {
        console.log(property);
      }
    }
  }
});