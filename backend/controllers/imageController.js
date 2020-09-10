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

module.exports.getImageList = async () => {
  try {
    const s3list = await s3.listObjects(s3Config).promise();
    const imgList = s3list.Contents
      .filter(img => img.Key.indexOf('png') > 0)
      .map(img => img.Key.split('/')[1]);
    // let imagesPromises = [];
    // let resultimages = [];
    // imgList.forEach(key => {
    //   imagesPromises.push(s3.getObject({Bucket: BUCKET_NAME+'/faces', Key: key}).promise());
    // });
    // imgList.forEach(key => {
    //   s3.getObject({Bucket: BUCKET_NAME+'/faces', Key: key, InlineData: true}, function(err, data) {
    //     if (err) console.log(err, err.stack); // an error occurred
    //     else {
    //       images.push(new Image(data.Body, BUCKET_NAME, key));
    //     }

    //   // const response = s3.getObject({Bucket: BUCKET_NAME+'/faces', Key: key, InlineData: true}).promise();
    //   // images.push(new Image(response.Body, BUCKET_NAME, key));
    //   });
    // }

    // const result = await Promise.all(imagesPromises);
    // result.forEach(image => images.push(new Image(image.Body, BUCKET_NAME, )))
    // const base64 = await s3.getObject({Bucket: BUCKET_NAME+'/faces', Key: imgList[0]}).promise();
    // console.log(result);

    // let data = 'stackabuse.com';
    // let buff = new Buffer(data);
    // let base64data = buff.toString('base64');
    // console.log(buff);
    // console.log(base64data);

    return response.rsResponse(200, {images: imgList});
  } catch (e) {
    console.log(e.stack);
    return response.rsResponse(500, 'Internal Server Error');
  }
};

module.exports.getImage = async event => {
  const key = event.queryStringParameters.key;
  try{ 
    const image = await s3.getObject({Bucket: BUCKET_NAME+'/faces', Key: key}).promise();
    return response.rsResponse(200, {image: image.Body.toString('base64')});
  } catch (e) {
    console.log(e.stack);
    return response.rsResponse(400, 'Invalid Key');
  }
};

module.exports.createTemplate = async event => {
  try {
    const payload = JSON.parse(event.body);
    const image = new Image(payload.imageData, null, payload.key);
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