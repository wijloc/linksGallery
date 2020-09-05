# Link's Gallery

## Project Setup

### Frontend
```
cd frontend\
npm install
```

### Backend
```
cd backend\
npm install
```

## Compiles and minifies for production
### Prepare enviroment to deploy integrated project
```
npm install
```
### Build frontend
```
cd frontend\
npm run build
```
### Deploy
```
npm run deploy
```

## Steps to make available on AWS
### Copy dist to AWS
```
scp -r -i .\linkGallery.pem .\dist\ [ec2_link]:dist
```
### Install node.js on AWS EC2
```
https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html
```
### Install pm2 on AWS EC2
```
npm install pm2 -g
```
### Export enviroment variables
```
export LG_CONNECTION_STRING="[CONNECTION_STRING]"
export LG_BACKEND_IP=[IP]
```
### Steps to start enviroment
```
cd dist\
npm install
npm run start-prod
```