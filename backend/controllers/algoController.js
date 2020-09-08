'use strict';
const response = require('../models/Response.js');
const Algorithm = require('../models/Algorithm.js');

module.exports.info = async () => {
  try {
    const algo = new Algorithm();
    return response.rsResponse(200, algo);
  } catch (e) {
    console.log(e.stack);
    return response.rsResponse(500, 'Internal Server Error');
  }
};