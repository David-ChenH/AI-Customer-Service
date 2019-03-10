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


var apigClient = null;

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
setTimeout(2000);





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
