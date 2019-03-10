/**
 * This is used for cognito user identify
 */

const client_id = '3pab5c41pc87n342kigmn3t2mv';
// const redirect_uri = 'https://d3n3sktne54bjw.cloudfront.net/chat.html';
const identity_pool_id = "us-east-1:dfd1d7f0-1a52-42c5-8cd6-1da69bbef1d1";
const user_pool_id = 'us-east-1_Z8b950ThM';
const aws_region = 'us-east-1';
var token = null;


try {
    id_token = location.toString().split('id_token=')[1].split('&access_token=')[0];
}

catch (e) {
    id_token = 'UNK';
}

AWS.config.region = aws_region; // Region

id_token ='eyJraWQiOiIzS2Q2Y1pKNVwvbk9vRlJldFd6ZW96TnJQY3hrTVk2QkRTaUlyN095ZWt5RT0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiYllubGNfQjRUc0NMbGEzQ0phLXd3dyIsInN1YiI6IjRhZDYzN2VhLTU1ZmEtNGY1My05MGQyLTM5NDFlZGIwMTAxOSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9aOGI5NTBUaE0iLCJjb2duaXRvOnVzZXJuYW1lIjoiNGFkNjM3ZWEtNTVmYS00ZjUzLTkwZDItMzk0MWVkYjAxMDE5IiwiZ2l2ZW5fbmFtZSI6IkNoZW55dSIsImF1ZCI6IjNwYWI1YzQxcGM4N24zNDJraWdtbjN0Mm12IiwiZXZlbnRfaWQiOiJmMzFmNDg5ZC00MzAyLTExZTktOWE5Zi0xNWY3M2RhYzY3MjEiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTU1MjIwMTU1NiwiZXhwIjoxNTUyMjA1MTU2LCJpYXQiOjE1NTIyMDE1NTYsImZhbWlseV9uYW1lIjoiWEkiLCJlbWFpbCI6InhpLmNoZW55dUBjb2x1bWJpYS5lZHUifQ.CEKGGKNOfl0a4DswKFbSB483V2h4qNHcoNL1gXiYV60BaP1UBSCA-AcTxQAbb2v6wPW2jz-sD_gY5qon-szqnfdENCCCclIMklzTNhg0IBfE0iKbZydcY4aXyCm2SQl6apOME7826ZjBHftYwfbabBHhdqgJxJj5pDeZwLyeACiY8ucew08OTyybmqC0p3H7ZSy2Zw7vOPt33X-AL1PIE8mIU6nwpY2ix1_sXWKzGDaeYGcHYvy6-LiWpA7qbE4kqeklDZj8CP5zHUaMD60Op_uBc88O1XJDjVhNlLYggc730zbCeituLWqmtYfmMRD8WPLT4h91Cz5eBzPVlJwycA'
console.log(id_token);

if (AWS.config.credentials) {
    AWS.config.credentials.clearCachedId();
}
 // clear old one and create new credential

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: identity_pool_id,
    Logins: {
        'cognito-idp.us-east-1.amazonaws.com/us-east-1_Z8b950ThM': id_token
    }
});

AWS.config.credentials.refresh((error) => {
    if (error) {
        console.error(error);
    } else {
        console.log('Successfully logged!');
    }
});


var apigClient = apigClientFactory.newClient();

// Make the call to obtain credentials
AWS.config.credentials.get(function(){

    // Credentials will be available when this function is called.
    try {
        console.log(AWS.config.credentials.accessKeyId);
        console.log(AWS.config.credentials.secretAccessKey);
        token = AWS.config.credentials.accessKeyId;

        apigClient = apigClientFactory.newClient({
            accessKey: AWS.config.credentials.accessKeyId,
            secretKey: AWS.config.credentials.secretAccessKey,
            sessionToken: AWS.config.credentials.sessionToken
        });
        console.log('token exchanged!');

    }
    catch(e) {
        console.log('token exchange failed');
    }


});

AWS.config.credentials.get();






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
