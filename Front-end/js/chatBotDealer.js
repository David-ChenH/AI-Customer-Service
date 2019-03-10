/**
 * This file is used for message display and API query
 */

const customer = 'right';
const robot = 'left';

function EnterPress(e){ // detect key down
    var e = e || window.event;
    if(e.keyCode === 13){
        document.getElementById("send_message").click();
    }
}
(function () {
    var Message;
    Message = function (arg) {
        this.text = arg.text;
        this.message_side = arg.message_side;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $('.messages').append($message);
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };

    $(function () {
        var getMessageText, message_side, sendMessage, getReply;

        getMessageText = function () {
            var $message_input;
            $message_input = $('.message_input');
            return $message_input.val();
        };



        sendMessage = function (text, sender) {
            var $messages, message;
            if (text.trim() === '') {
                return;
            }
            $('.message_input').val('');
            $messages = $('.messages');
            message_side = sender;

            message = new Message({
                text: text,
                message_side: message_side
            });

            message.draw();
            return $messages.animate({scrollTop: $messages.prop('scrollHeight')}, 300);
        };

        getReply = function(msg){
            if (!token){
                sendMessage('You are illegal user! Please try to sign in first :)', robot);
                return
            }
            var body = toBotRequest(msg, token);

            apigClient.chatbotPost({}, body, {}).then((res)=>{
                var data = getBotResponse(res);
                console.log(data);
                sendMessage(data, robot);
            }).catch((e)=>{
                sendMessage('Fail to get server response.', robot);
            });
        };

        $('.send_message').click(function (e) {
            var customer_message = getMessageText();
            sendMessage(customer_message, customer);
            getReply(customer_message);
        });
        sendMessage('Hello, I am your dining assistant!', robot);
    });
}.call(this));