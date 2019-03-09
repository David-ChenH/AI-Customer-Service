
function toBotRequest(message, userID){
    if (!userID) {
        userID = 'UNK'
    } //have to replace for UNK

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
    var messages = response.data;

}