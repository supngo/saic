'use strict';
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const BUCKET_NAME = 'thombasin';

module.exports.faceCompare = async event => {
  const s3Config = { 
    Bucket: BUCKET_NAME,
    Prefix: 'faces' 
  }
  const response = await s3.listObjects(s3Config).promise();
  const imgList = response.Contents
    .filter(img => img.Key.indexOf('png') > 0)
    .map(img => img.Key);

  const rekognition = new AWS.Rekognition({apiVersion: '2016-06-27'});
  const sourceImg = imgList[0];
  const resultImgs = [];
  const rekognitionConfig = {
    SourceImage: { 
      S3Object: {
        Bucket: BUCKET_NAME,
        Name: sourceImg
      }
    },
    TargetImage: {
      S3Object: {
        Bucket: BUCKET_NAME,
        Name: imgList[1]
      }
    },
    SimilarityThreshold: '10'
  };

  const result = await rekognition.compareFaces(rekognitionConfig).promise();
  try {
    resultImgs.push({ image: `${BUCKET_NAME}/${imgList[1]}` , Similarity: result.FaceMatches[0].Similarity });
    console.log(result);
  } catch(e) {
    console.log(e.stack);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: resultImgs,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};


