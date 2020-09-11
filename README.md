# Face Recognition

The purpose of this application is to demo the proof of concept of how to leverage Face Recongition to detect and recognize human faces for analysis purposes.

### Architecture: 
Based on the requirements of this exercise, I decided to build a full stack application with Single page application (SPA) for the front end and Serverless Technology for the back end.

The reason for picking SPA for the front end is because it's the most effective web app development. Also, Angular is among the top front end frameworks which provides a lot of key advantages: ***2 way binding, MVC design pattern, TypeSscript, Dependency Injection***

As for Back end, the serverless approach is a easy pick since it provides the ability to scale, be very elastic, and high availability. On top of that, writing code and deploy without server to maintain is a big plus for developers, so they can focus on developing only

Deploying this set up on AWS is also a easy thinking process. AWS offers so many services that we can use out of the bat without any fuzzle. However, developer needs to undestand AWS thorougly in order to secure the environment, to pick a right tool and above all else, to be cost effective.

#### Front End - UI:
1. Angular 9
2. Bootstrap
3. Jasmine
4. Istanbul

#### Back End:
1. nodeJS 12
2. base64
3. serverless
4. atob

### Infrastructure:
1. S3 for static hosting website and image storage
2. API Gateway for routing traffic from internet to AWS Lambda
3. CloudFront for CDN which improve performance by regional caching
4. Route53 for Domain name and routing traffic to CloudFront
5. ACM for SSL certificate and secure HTTP traffic
6. Lambda for serverless deployment which provides scalability and availability 
7. IAM for permission and cloud security

### Explore (Run and Test)
#### Run Locally
Assume you have AWS account and credentials
1. Checkout the source code at https://github.com/supngo/saic.git
2. Open the terminal at the checked out folder
3. Run Back end
```
cd back-end
npm install
sls serverless start
```
4. Run Front end
```
cd front-end
npm install
ng serve
```
5. Open the browser at http://localhost:4200
#### Test the same application online
1. Go to this site: https://prosopa.info
2. Select an image from a dropdown
3. Click ***Analyze*** to run Face Recognition against other images
4. Click ***Upload*** to go to upload page
5. Select an image from local PC and Upload
6. Click ***Main*** to go back and work on a new uploaded image
