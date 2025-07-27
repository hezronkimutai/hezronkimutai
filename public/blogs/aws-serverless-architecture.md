---
title: Building Serverless Applications with AWS Lambda and DynamoDB
date: 2024-10-10
author: Hezron Kimutai
description: Complete guide to building scalable serverless applications using AWS Lambda, DynamoDB, and API Gateway
tags: [aws, serverless, lambda, dynamodb, cloud]
---

# Building Serverless Applications with AWS Lambda and DynamoDB

Serverless architecture has revolutionized how we build and deploy applications. By leveraging AWS Lambda and DynamoDB, we can create highly scalable, cost-effective applications that automatically handle traffic spikes.

## Why Choose Serverless?

### Benefits of Serverless Architecture

- **Cost Efficiency**: Pay only for what you use
- **Auto Scaling**: Automatic scaling based on demand
- **No Server Management**: Focus on code, not infrastructure
- **High Availability**: Built-in redundancy and fault tolerance

## Setting Up Your Serverless Stack

### 1. AWS Lambda Function

```javascript
// handler.js
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.createUser = async (event) => {
  try {
    const { name, email } = JSON.parse(event.body);
    
    const params = {
      TableName: 'Users',
      Item: {
        id: AWS.util.uuid.v4(),
        name,
        email,
        createdAt: new Date().toISOString()
      }
    };
    
    await dynamodb.put(params).promise();
    
    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message: 'User created successfully',
        user: params.Item
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Could not create user',
        details: error.message
      })
    };
  }
};

exports.getUser = async (event) => {
  try {
    const { id } = event.pathParameters;
    
    const params = {
      TableName: 'Users',
      Key: { id }
    };
    
    const result = await dynamodb.get(params).promise();
    
    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'User not found' })
      };
    }
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(result.Item)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Could not retrieve user',
        details: error.message
      })
    };
  }
};
```

### 2. Serverless Framework Configuration

```yaml
# serverless.yml
service: user-service

provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1
  environment:
    DYNAMODB_TABLE: ${self:service}-${opt:stage, self:provider.stage}
  iamRoleStatements:
    - Effect: Allow
      Action:
        - dynamodb:Query
        - dynamodb:Scan
        - dynamodb:GetItem
        - dynamodb:PutItem
        - dynamodb:UpdateItem
        - dynamodb:DeleteItem
      Resource: "arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/${self:provider.environment.DYNAMODB_TABLE}"

functions:
  createUser:
    handler: handler.createUser
    events:
      - http:
          path: users
          method: post
          cors: true
  
  getUser:
    handler: handler.getUser
    events:
      - http:
          path: users/{id}
          method: get
          cors: true

resources:
  Resources:
    UsersTable:
      Type: AWS::DynamoDB::Table
      Properties:
        TableName: ${self:provider.environment.DYNAMODB_TABLE}
        AttributeDefinitions:
          - AttributeName: id
            AttributeType: S
        KeySchema:
          - AttributeName: id
            KeyType: HASH
        BillingMode: PAY_PER_REQUEST
```

## Advanced Patterns

### 1. Event-Driven Architecture

```javascript
// Event processor
exports.processUserEvent = async (event) => {
  for (const record of event.Records) {
    if (record.eventName === 'INSERT') {
      // Send welcome email
      await sendWelcomeEmail(record.dynamodb.NewImage);
    } else if (record.eventName === 'MODIFY') {
      // Update search index
      await updateSearchIndex(record.dynamodb.NewImage);
    }
  }
};

const sendWelcomeEmail = async (userData) => {
  const ses = new AWS.SES();
  
  const params = {
    Destination: {
      ToAddresses: [userData.email.S]
    },
    Message: {
      Body: {
        Text: {
          Data: `Welcome ${userData.name.S}!`
        }
      },
      Subject: {
        Data: 'Welcome to our platform!'
      }
    },
    Source: 'noreply@example.com'
  };
  
  return ses.sendEmail(params).promise();
};
```

### 2. API Gateway with Custom Authorizer

```javascript
// authorizer.js
exports.authorize = async (event) => {
  try {
    const token = event.authorizationToken;
    
    // Validate JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    return {
      principalId: decoded.userId,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: event.methodArn
          }
        ]
      },
      context: {
        userId: decoded.userId,
        email: decoded.email
      }
    };
  } catch (error) {
    throw new Error('Unauthorized');
  }
};
```

## Performance Optimization

### 1. Connection Reuse

```javascript
// Reuse connections outside handler
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient({
  httpOptions: {
    agent: new require('https').Agent({
      keepAlive: true
    })
  }
});

exports.handler = async (event) => {
  // Handler logic here
};
```

### 2. Batch Operations

```javascript
exports.batchCreateUsers = async (event) => {
  const users = JSON.parse(event.body);
  
  const batchRequests = users.map(user => ({
    PutRequest: {
      Item: {
        id: AWS.util.uuid.v4(),
        ...user,
        createdAt: new Date().toISOString()
      }
    }
  }));
  
  const params = {
    RequestItems: {
      'Users': batchRequests
    }
  };
  
  await dynamodb.batchWrite(params).promise();
  
  return {
    statusCode: 201,
    body: JSON.stringify({ message: 'Users created successfully' })
  };
};
```

## Monitoring and Debugging

### CloudWatch Logs and Metrics

```javascript
const AWS = require('aws-sdk');
const cloudwatch = new AWS.CloudWatch();

const logMetric = async (metricName, value, unit = 'Count') => {
  const params = {
    Namespace: 'UserService',
    MetricData: [
      {
        MetricName: metricName,
        Value: value,
        Unit: unit,
        Timestamp: new Date()
      }
    ]
  };
  
  await cloudwatch.putMetricData(params).promise();
};

exports.handler = async (event) => {
  const startTime = Date.now();
  
  try {
    // Your logic here
    await logMetric('SuccessfulRequests', 1);
  } catch (error) {
    await logMetric('FailedRequests', 1);
    throw error;
  } finally {
    const duration = Date.now() - startTime;
    await logMetric('RequestDuration', duration, 'Milliseconds');
  }
};
```

## Deployment and CI/CD

### GitHub Actions Workflow

```yaml
name: Deploy Serverless

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Deploy to AWS
        run: npx serverless deploy
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

## Conclusion

Serverless architecture with AWS Lambda and DynamoDB provides a powerful foundation for building scalable applications. The key is to understand the event-driven nature of serverless and design your applications accordingly.

In my experience at TheJitu working on chally.com, implementing serverless architecture reduced our infrastructure costs by 70% while improving scalability and reliability. The automatic scaling capabilities handled traffic spikes seamlessly during peak usage periods.