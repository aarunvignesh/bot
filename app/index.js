
let hello = require("./Hello"),
    buy = require("./Buy"),
    sell = require("./Sell")
    output = require("./Output");

exports.handler = (event, context, callback) => {

    let replyObject = {};

    switch(event.currentIntent.name){
        case 'Vanakkam':

            replyObject = hello.greetings(event.inputTranscript);
            break;

        case 'sell':
            // replyObject.dialogAction.type = 'ElicitSlot';
            // replyObject.dialogAction.intentName = 'buyandsell';
            // replyObject.dialogAction.slots = {
            //     'movie': '',
            //     'theater':'',
            //     'tickets':'',
            //     'city': ''
            // };
            // let slotToElicit = Object.keys(event.currentIntent.slots).filter(value => {if(event.currentIntent.slots[value]){
            //     replyObject.dialogAction.slots[value] = event.currentIntent.slots[value];
            // } 
            // return event.currentIntent.slots[value] == null;});
            // console.log(slotToElicit);
            // replyObject.dialogAction.slotToElicit = slotToElicit[0];
            replyObject = sell.theatreSlot(event.currentIntent);
            break;
    }
     console.log(event);
     console.log(replyObject);
    // TODO implement
    callback(null,replyObject);
};