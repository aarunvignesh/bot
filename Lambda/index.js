
// var hello = require("./Hello"),
//     buy = require("./Buy"),
//     sell = require("./Sell")
//     output = require("./Output");

var fulfillment = require('./fulfillment'),
    validation = require('./validation');

exports.handler = (event, context, callback) => {

    switch(event.invocationSource){
        case 'FulfillmentCodeHook':
            fulfillment.fulfilment(event, event.sessionAttributes, event.userId).then((replyObject) => {
                callback(null, replyObject);
            });
            break;
        case 'DialogCodeHook':
            callback(null, validation.validate(event.currentIntent, event.sessionAttributes));
            break;
    };

    // var replyObject = {};

    // switch(event.currentIntent.name){
    //     case 'Vanakkam':

    //         replyObject = hello.greetings(event.inputTranscript);
    //         break;

    //     case 'sell':
    //         replyObject = sell.redirectToTheatre(event.currentIntent);
    //         break;
    //     case 'Theatre':
    //         console.log('>>>> Shivanae success');
    //         console.log(event.currentIntent);
    //         break;
    // }
    //  console.log(event);
    //  console.log(replyObject);
    // // TODO implement
    // callback(null,replyObject);
};