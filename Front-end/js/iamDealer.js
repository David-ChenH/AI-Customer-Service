/**
 * This is used for cognito user identify
 */

const client_id = '3pab5c41pc87n342kigmn3t2mv';
// const redirect_uri = 'https://d3n3sktne54bjw.cloudfront.net/chat.html';
const identity_pool_id = 'us-east-1:dfd1d7f0-1a52-42c5-8cd6-1da69bbef1d1';
const user_pool_id = 'us-east-1_Z8b950ThM';
const aws_region = 'us-east-1';
AWS.config.region = aws_region; // Region


var id_token='eyJraWQiOiIzS2Q2Y1pKNVwvbk9vRlJldFd6ZW96TnJQY3hrTVk2QkRTaUlyN095ZWt5RT0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoid0VRUGliZjlfWm93ak14ZWlDT0ItQSIsInN1YiI6IjRhZDYzN2VhLTU1ZmEtNGY1My05MGQyLTM5NDFlZGIwMTAxOSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9aOGI5NTBUaE0iLCJjb2duaXRvOnVzZXJuYW1lIjoiNGFkNjM3ZWEtNTVmYS00ZjUzLTkwZDItMzk0MWVkYjAxMDE5IiwiZ2l2ZW5fbmFtZSI6IkNoZW55dSIsImF1ZCI6IjNwYWI1YzQxcGM4N24zNDJraWdtbjN0Mm12IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE1NTIxNzUzNzksImV4cCI6MTU1MjE3ODk3OSwiaWF0IjoxNTUyMTc1Mzc5LCJmYW1pbHlfbmFtZSI6IlhJIiwiZW1haWwiOiJ4aS5jaGVueXVAY29sdW1iaWEuZWR1In0.dViUH6jCjB1o1_VI20hKjcerZ9yP17-m-zl4kKWV98U1mp0Y_jgO6XZ1qVYfBqxUzFUU3geNY2OBPjqkHNc7NTC5wIDk4b5vGalbCna2yRZwwxnI1wrM0X9XrbyD1u_uK0uQkOcU1ynkclzakh-D1tD5gEhugvD5dvROI7Zno3m5iiVahc6YrmhCRb2AOJ9Vx2swT-pGPWRN26vcSeFT51Th7BqM1dwLT7XgSjjhy-BSmndCpBzhuHa9qnNyFUCPRpJfTZHejYultSY56827jlmD-dDjF-nUZJFD8WEaVMBFcNNQSax9a2aK8tDvJ1gOMxK_R5Z361DV4XjX_DNhxw'
console.log(id_token);

if (AWS.config.credentials) {
    AWS.config.credentials.clearCachedId();
}
 // clear old one and create new credential

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: identity_pool_id,
    Logins: {
        [`cognito-idp.${aws_region}.amazonaws.com/${user_pool_id}`]: id_token
    }
});

var apigClient = apigClientFactory.newClient();

try {
    apigClient = apigClientFactory.newClient({
        accessKey: AWS.config.credentials.accessKeyId,
        secretKey: AWS.config.credentials.secretAccessKey,
        sessionToken: AWS.config.credentials.sessionToken
    });
    console.log('token exchanged!');
    console.log(AWS.config.credentials.accessKeyId);
    console.log(AWS.config.credentials.secretAccessKey);
}
catch(e) {
    console.log('token exchange failed');
}

// this function getCredentials with auto code
// var gainCredentials = function (auth_code) {
//
//     console.log(auth_code);
//
//     return new Promise((resolve, reject) => {
//         // https://docs.aws.amazon.com/cognito/latest/developerguide/token-endpoint.html
//         let postContent = {
//             url: `${cognito_domain_url}/oauth2/token`,
//
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             data: {
//                 grant_type: 'authorization_code',
//                 client_id: client_id,
//                 redirect_uri: redirect_uri,
//                 code: auth_code
//             }
//         };
//
//         // post to terminal node
//         $.ajax(postContent).done((response)=>{
//             if (!response.id_token){
//                 reject(response);
//                 console.log(JSON.stringify(response));
//             }
//
//             AWS.config.credentials.clearCachedId(); // clear old one and create new credential
//             AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//                 IdentityPoolId: identity_pool_id,
//                 Logins: {
//                     [`cognito-idp.${aws_region}.amazonaws.com/${user_pool_id}`]: response.id_token
//                 }
//             });
//
//             AWS.config.credentials.refresh((error) => {
//                 if(error) {
//                     reject(error);
//                 } else {
//                     console.log('successfully logged in');
//                     resolve(AWS.config.credentials); // promise return
//                 }
//             });
//         });
//     });
// };
//
// gainCredentials(token).then((credentials) =>{
//     apigClient = apigClientFactory.newClient({
//         accessKey: AWS.config.credentials.accessKeyId,
//         secretKey: AWS.config.credentials.secretAccessKey,
//         sessionToken: AWS.config.credentials.sessionToken
//     });
// }).catch((e)=>{
//     console.log('token exchange failed');
// });
