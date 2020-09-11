'use strict';
const { v4: uuidv4 } = require('uuid');

class Image {
  constructor(imageData, bucket, key) {
    this.imageData = imageData;
    this.bucket = bucket || 'thombasin/faces';
    this.key = key || uuidv4();
  }
}

module.exports = Image;