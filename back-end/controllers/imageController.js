'use strict';
const AWS = require('aws-sdk');
const isBase64 = require('is-base64');
const response = require('../models/Response.js');
const s3 = new AWS.S3();
const BUCKET_NAME = process.env.BUCKET_NAME;

const s3Config = { 
  Bucket: BUCKET_NAME
}

module.exports.getImageList = async () => {
  try {
    const s3list = await s3.listObjects(s3Config).promise();
    console.log(s3list.Contents);
    const imgList = s3list.Contents
      .filter(img => img.Key.indexOf('png') > 0 || img.Key.indexOf('jpeg') > 0 || img.Key.indexOf('jpg') > 0)
      .map(img => img.Key);
    return response.rsResponse(200, {images: imgList});
  } catch (e) {
    console.log(e.stack);
    return response.rsResponse(500, 'Internal Server Error');
  }
};

module.exports.getImage = async event => {
  const key = event.queryStringParameters.key;
  try{ 
    const image = await s3.getObject({Bucket: BUCKET_NAME, Key: key}).promise();
    return response.rsResponse(200, {image: image.Body.toString('base64')});
  } catch (e) {
    console.log(e.stack);
    return response.rsResponse(500, 'Internal Server Error');
  }
};

module.exports.createTemplate = async event => {
  try {
    const payload = JSON.parse(event.body);
    if (!isBase64(payload.data, {mimeRequired: true})) {
      return response.rsResponse(400, 'Invalid Base64');
    }
    const base64Data = new Buffer.from(payload.data.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    const type = payload.data.split(';')[0].split('/')[1];
    const params = {
      Bucket: BUCKET_NAME,
      Key: payload.name,
      Body: base64Data,
      ContentEncoding: 'base64',
      ContentType: `image/${type}`
    };
    await s3.upload(params).promise();
    return response.rsResponse(200, {message: "Uploaded Successfully"});
  } catch (e) {
    console.log(e.stack);
    return response.rsResponse(500, 'Internal Server Error');
  }
};