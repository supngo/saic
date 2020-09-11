'use strict';
const AWS = require('aws-sdk');
const isBase64 = require('is-base64');
const atob = require('atob');
const response = require('../models/Response.js');

module.exports.faceCompare = async event => {
  const payload = JSON.parse(event.body);
  const sourceTemplate = payload.SingleTemplate;
  const targetTemplates = payload.TemplateList;
  let facePromises = [];
  let scores = [];
  const rekognition = new AWS.Rekognition({apiVersion: '2016-06-27'});
  if (!sourceTemplate && !isBase64(sourceTemplate)){
    console.log('Empty or Invalid sourceTemplate!');
    return response.rsResponse(400, 'Could not process SingleTemplate');
  }
  if (targetTemplates.length < 1){
    console.log('Empty or Invalid TemplateList!');
    return response.rsResponse(400, 'Could not process TemplateList');
  }
  if (targetTemplates.filter(template => isBase64(template)).length < 1) {
    console.log('Empty or Invalid TemplateList!');
    return response.rsResponse(400, 'Could not process TemplateList');
  }

  targetTemplates.forEach(template => {
    facePromises.push(rekognition.compareFaces({
      SourceImage: {Bytes: getBinary(sourceTemplate)},
      TargetImage: {Bytes: getBinary(template)}, SimilarityThreshold: '10'}).promise());
  })

  const results = await Promise.all(facePromises.map(p => p.catch(e => e)));
  if (results.filter(result => result instanceof Error).length > 0) {
    console.log('Request has invalid image format');
    return response.rsResponse(400, 'Could not process TemplateList');
  }
  results.forEach(rs => {
    let score = {};
    if(rs.FaceMatches.length > 0) {
      score.Score = rs.FaceMatches[0].Similarity.toFixed(4);
      score.NormalizedScore = Math.round(rs.FaceMatches[0].Similarity/100);
    } else {
      score.Score = 0.01;
      score.NormalizedScore = 0.01;
    }
    scores.push(score);
  });
  return response.rsResponse(200, scores);
};

function getBinary(base64Image) {
  var binaryImg = atob(base64Image);
  var length = binaryImg.length;
  var ab = new ArrayBuffer(length);
  var ua = new Uint8Array(ab);
  for (var i = 0; i < length; i++) {
    ua[i] = binaryImg.charCodeAt(i);
  }
  return ab;
}
