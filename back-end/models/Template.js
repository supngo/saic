'use strict';
const BUCKET_NAME = process.env.BUCKET_NAME

class Template {
  constructor(template, bucket) {
    this.template = template;
    this.bucket = bucket || BUCKET_NAME;
  }
}

module.exports = Template;