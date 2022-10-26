const fs = require('fs');
const ET_Client = require('sfmc-fuelsdk-node');
const clientId = '94mxyde60l6r2elxdj53u0fw';
const clientSecret = '52hd9riktchX844omUK7JLoc';
const stack = 's6';

const obj = {
    origin: 'https://mcpdwdml-zryw5dczwlf-f-f9kcm.rest.marketingcloudapis.com/',
    authOrigin: 'https://mcpdwdml-zryw5dczwlf-f-f9kcm.auth.marketingcloudapis.com/',
    soapOrigin: 'https://mcpdwdml-zryw5dczwlf-f-f9kcm.soap.marketingcloudapis.com/',
    authOptions: { 
      authVersion: 2,
      accountId: 520002496 // need to be updated for BU
    }
  }

const client = new ET_Client(clientId, clientSecret, stack, obj); // stack is ignored


const deRow = client.dataExtensionRow({
  Name: 'DataView_Sent',
  props: ['AccountID', 'SubscriberKey', 'EventDate'],

  // to return all rows, delete the filter property
});

const express = require('express');
const app = express();

// output rows from targetd data extensions
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

// get access token after making API calls
deRow.get((err, res) => {
  if (err) {
    console.error(err.message);
  } else {
    for (const result of res.body.Results) {
      for (const property of result.Properties.Property) {
        console.log(property);
        app.get('/access-token', (req, res) => {
          res.json(deRow);
      });  
      }
      }
    }
  });

//get the rows from targeted Data Extenion
  deRow.get((err, res) => {
    if (err) {
      console.error(err.message);
    } else {
      for (const result of res.body.Results) {
        for (const property of result.Properties.Property) {
          app.get('/dataview-sent', (req, res) => {
            res.json(result.Properties.Property);
        });  
        }
        }
      }
    });


app.listen(3000, () => console.log('listening on port 3000'));
