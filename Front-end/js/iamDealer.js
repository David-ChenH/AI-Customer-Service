// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'us-east-1'; // Region

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:dfd1d7f0-1a52-42c5-8cd6-1da69bbef1d1',
});

