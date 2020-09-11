'use strict';

class Template {
  constructor(template, bucket) {
    this.template = template;
    this.bucket = bucket || 'thombasin/faces';
  }
}

module.exports = Template;