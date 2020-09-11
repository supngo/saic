# Back End

## Requirements:
1. nodeJS
2. npm
3. serverless
4. AWS account

## Install
Run `npm install`

## Development server
Run `sls offline start --bucket your_bucket_name` for a dev server. Navigate to `http://localhost:3000/`

## Deploy
Run `sls deploy --bucket your_bucket_name`

## End points
### ***1. /v1/info GET***

This end point provides information about the face recognition is used in this project
#### Response
```
{
  "name": "Rekonigtion",
  "version": "2.0",
  "type": "Face",
  "company": "AWS",
  "email": "aws.amazon.com",
  "cpu": 4,
  "memory": 2048
}
```

### ***2. /v1/images GET***

This end point provides the list of available images
#### Response
```
{
  "images": [
    "S223-01-t10_01.png",
    "S223-03-t10_01.png",
    "S309-04-t10_01.png",
    "S309-05-t10_01.png",
    "S324-01-t10_01.png",
    "S324-02-t10_01.png"
  ]
}
```

### ***3. /v1/image GET***

This end point retrives the image source (template) from the server
#### Response
```
{
  "image": "iVBORw0KGgoAAAANSUhEUgAAAwAAAAPACAIAAAANC4ltAAAAA3NCSVQICAjb4U/gAAAgAElEQVR4nJS925LruLItNkaCql77yf//AQ57R9gnwv4077N6VklEDj/kBSCl6m0zOmZLKhIEEnm/gf/X//mfAEiiLkkAJsw8f6cAgC4Af/......
}
```

### ***4. /v1/create-template POST***

This end point creates the template from image source and upload to the server
#### Request
```
{
  "data": "AQ57R9gnwv4077N6VklEDj/kBSCl6m0zOmZLKhIEEnm/gf/X//mfAEiiLkkAJsw8f6cAgC4Af..."
  "name: "image1.png" 
}
```
#### Response
```
200
```
### ***5. /v1/compare-list POST***

This end point compare the target template against the list of templates
#### Request
```
{
  "SingleTemplate": ""iVBORw0KGgoAAAANSUhEUgAAAwAAAAPACAIAAAANC4ltAAAAA3NCSVQICAjb4U/..."
  "TemplateList: [
    "iVBORw0KGgoAAAANSUhEUgAAAwAAAAPACAIAAAANC4ltAAAAA3NCSVQICAjb4U/...",
    "AQ57R9gnwv4077N6VklEDjkBSCl6m0zOmZLKhIEEnm/gf/X//mfAEiiLkkAJsw8f6cAgC4Af..."
  ] 
}
```
#### Response
```
200
```

## Question?
thongo5430@gmail.com