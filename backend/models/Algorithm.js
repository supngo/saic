'use strict';

class Algorithm {
  constructor(name, version, type, company, email, cpu, memory) {
    this.name = name || 'Rekonigtion';
    this.version = version || '2.0';
    this.type = type || 'Face';
    this.company = company || 'AWS';
    this.email = email || 'aws.amazon.com';
    this.cpu = cpu || 4;
    this.memory = memory || 2048;
  }
}

module.exports = Algorithm;