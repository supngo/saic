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
2. CloudFront for CDN which improve performance by regional caching
3. Route53 for Domain name and traffic routing
4. ACM for SSL certificate and secure HTTP traffic
5. Lambda for serverless deployment which provides scalability and availability 
6. IAM for permission and cloud security