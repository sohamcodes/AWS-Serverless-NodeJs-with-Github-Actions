<!--
title: 'Serverless Framework Node Express API on AWS'
description: 'This template demonstrates how to develop and deploy a simple Node Express API running on AWS Lambda using the Serverless Framework.'
layout: Doc
framework: v4
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, Inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# Project Description/Objectives:  
1. This project looks at developing and deploying a simple Node ExpressJS API service running on AWS Lambda using the Serverless Framework.
2. Dev and Prod environments were created to create separation between Non-prod and Prod logics and for testing purposes. 
3. The API is connected to a serverless database (NeonDB). 
4. Drizzle ORM is used to create the database schema via utilizing Javascript. This allows for creation of Schema without utilizing SQL Schema. 
5. NeonDB (Serverless) allows for mutiple branches of DB.
6. Automate Deployment of API using Github Actions workflow. 

Architture: 
API Gateway -- > Lambda --> NeonDB (Serverless) 

Tech Stack used: 
1. NodeJs
2. AWS - Lambda, API Gateway, IAM Roles & Policies, Secrets Manager 
3. Database - PostgreSQL NeonDB (Serverless) 
4. GitHub Actions - Automated deployment of deployment
5. Drizzle ORM - Database Schema creation 
6. API Testing: POSTMAN 

# Deployment of API in production environment
![image](https://github.com/user-attachments/assets/0312955c-5c95-4976-a303-5a1bd3b3eddb)

# POST Method of API
![image](https://github.com/user-attachments/assets/d50f080e-0956-4b00-b809-bad677dcca69)

# GET Method of API
![image](https://github.com/user-attachments/assets/20d05388-390d-4eee-8dd1-f20cf3d037dd)

# GITHUB Actions Automated Prod Deployment
![image](https://github.com/user-attachments/assets/9f99cb1e-a165-4bbf-a3ad-0b7d2b4a6959)



# Serverless Framework Node Express API on AWS

This template demonstrates how to develop and deploy a simple Node Express API service running on AWS Lambda using the Serverless Framework.

This template configures a single function, `api`, which is responsible for handling all incoming requests using the `httpApi` event. To learn more about `httpApi` event configuration options, please refer to [httpApi event docs](https://www.serverless.com/framework/docs/providers/aws/events/http-api/). As the event is configured in a way to accept all incoming requests, the Express.js framework is responsible for routing and handling requests internally. This implementation uses the `serverless-http` package to transform the incoming event request payloads to payloads compatible with Express.js. To learn more about `serverless-http`, please refer to the [serverless-http README](https://github.com/dougmoscrop/serverless-http).

## Usage

### Deployment

Install dependencies with:

```
npm install
```

and then deploy with:

```
serverless deploy
```

After running deploy, you should see output similar to:

```
Deploying "aws-node-express-api" to stage "dev" (us-east-1)

✔ Service deployed to stack aws-node-express-api-dev (96s)

endpoint: ANY - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com
functions:
  api: aws-node-express-api-dev-api (2.3 kB)
```

_Note_: In current form, after deployment, your API is public and can be invoked by anyone. For production deployments, you might want to configure an authorizer. For details on how to do that, refer to [`httpApi` event docs](https://www.serverless.com/framework/docs/providers/aws/events/http-api/).

### Invocation

After successful deployment, you can call the created application via HTTP:

```
curl https://xxxxxxx.execute-api.us-east-1.amazonaws.com/
```

Which should result in the following response:

```json
{ "message": "Hello from root!" }
```

### Local development

The easiest way to develop and test your function is to use the `dev` command:

```
serverless dev
```

This will start a local emulator of AWS Lambda and tunnel your requests to and from AWS Lambda, allowing you to interact with your function as if it were running in the cloud.

Now you can invoke the function as before, but this time the function will be executed locally. Now you can develop your function locally, invoke it, and see the results immediately without having to re-deploy.

When you are done developing, don't forget to run `serverless deploy` to deploy the function to the cloud.
