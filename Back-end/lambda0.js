console.log("Loading LF0");

var AWS = require('aws-sdk');

exports.handler = function(event, context, callback) {

  AWS.config.region = 'us-west-2';
	var lexruntime = new AWS.LexRuntime();
	var params = {
				  botAlias: process.env.BOT_ALIAS,
				  botName: process.env.BOT_NAME,
				  inputText: event.messages[0]['unstructured']['text'],
				  userId: event.messages[0]["unstructured"]['id'],
				  sessionAttributes: {
				  }
				};
	lexruntime.postText(params, function(err, data) {
	  if(err){
	    callback(err, "Error occurs!");
	  }
	  else{
	  	var return_messages =
			{
			  "messages": [
			    {
			      "type": event.messages[0]["type"],
			      "unstructured": {
			        "id": event.messages[0]["unstructured"]["id"],
			        "text": data.message,
			        "timestamp": event.messages[0]["unstructured"]['timestamp']
			      }
			    }
			  ]
			}
	    callback(null, return_messages);
	  }

	});

  // callback(null, "APP under development...........");
};
