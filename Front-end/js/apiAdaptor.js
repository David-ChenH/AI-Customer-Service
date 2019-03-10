
function toBotRequest(message, userID){
    var date = new Date();
    return {
        messages : [
            {
                type : "string",
                unstructured : {
                    id : userID,
                    text : message.toString(),
                    timestamp : date.getTime().toString()
                }
            }
        ]
    };
}

function getBotResponse(response) {
    var messages = response.data.messages[0].unstructured.text;
    return JSON.stringify(messages).replace(/"/g, "");

}