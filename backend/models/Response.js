'use strict';

const rsResponse = (code, message) => ({
  statusCode: code,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,Access-Token,X-Amz-Security-Token',
    'Access-Control-Allow-Methods': 'POST,OPTIONS,PUT,DELETE'
  },
  body: JSON.stringify(message, null, 2)
});

module.exports = { rsResponse };