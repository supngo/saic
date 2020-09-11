'use strict';
const { v4: uuidv4 } = require('uuid');
const BUCKET_NAME = process.env.BUCKET_NAME

class Image {
  constructor(imageData, bucket, key) {
    this.imageData = imageData;
    this.bucket = bucket || BUCKET_NAME;
    this.key = key || uuidv4();
  }
}

module.exports = Image;