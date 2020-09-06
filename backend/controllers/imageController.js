'use strict';
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const BUCKET_NAME = 'thombasin';

module.exports.getImgs = async event => {
  const s3Config = { 
    Bucket: BUCKET_NAME,
    Prefix: 'faces' 
  }
  const response = await s3.listObjects(s3Config).promise();
  const imgList = response.Contents
    .filter(img => img.Key.indexOf('png') > 0)
    .map(img => img.Key.split('/')[1]);
  return {
    statusCode: 200,
    body: JSON.stringify({
      images: imgList,
    }, null, 2),
  };
};