'use strict';
const AWS = require('aws-sdk');
const isBase64 = require('is-base64');
const response = require('../models/Response.js');
const s3 = new AWS.S3();
const BUCKET_NAME = 'thombasin';
const Image = require('../models/Image.js');
const Template = require('../models/Template.js');

const s3Config = { 
  Bucket: BUCKET_NAME,
  Prefix: 'faces' 
}

module.exports.getImages = async () => {
  try {
    const result = await s3.listObjects(s3Config).promise();
    const imgList = result.Contents
      .filter(img => img.Key.indexOf('png') > 0)
      .map(img => img.Key.split('/')[1]);
    return response.rsResponse(200, { images: imgList });
  } catch (e) {
    console.log(e.stack);
    return response.rsResponse(500, 'Internal Server Error');
  }
};

module.exports.createTemplate = async event => {
  try {
    const payload = JSON.parse(event.body);
    const image = new Image(payload.imageData, null, payload.name);
    const template = new Template();
    if(!image.imageData || !isBase64(image.imageData, { mimeRequired: true })) {
      console.log('Empty or Invalid Image Base64!');
      return response.rsResponse(400, 'Could not process Image base64');
    } else {
      template.template = image.imageData;
      
      return response.rsResponse(200, template);
    }
  } catch (e) {
    console.log(e.stack);
    return response.rsResponse(500, 'Internal Server Error');
  }
};