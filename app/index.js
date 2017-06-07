
function replyToWelcome(greeting){
    greeting = greeting.toLowerCase();
    let reply = '';
    switch(greeting){
        case 'hi':
            reply = 'Hi ,';
            break;
        case 'hello':
            reply = 'Hello ,';
            break;
        case 'namashkar':
            reply = 'Namashkar ,';
            break;
        case 'vanakkam':
            reply = 'Vanakkam ,';
            break;
    }
    reply += 'How can I help you';
    return reply;
}

exports.handler = (event, context, callback) => {
    
    let replyObject = {
        dialogAction:{
            type: "",
        }            
    };
    
    switch(event.currentIntent.name){
        case 'Vanakkam':
            replyObject.dialogAction.type = 'Close';
            replyObject.dialogAction.fulfillmentState = 'Fulfilled';
            replyObject.dialogAction.message = {};
             replyObject.dialogAction.message.contentType = 'PlainText';
            replyObject.dialogAction.message.content = replyToWelcome(event.inputTranscript);
            break;
        case 'buyandsell':
            replyObject.dialogAction.type = 'ElicitSlot';
            replyObject.dialogAction.intentName = 'buyandsell';
            replyObject.dialogAction.slots = {
                'movie': '',
                'theater':'',
                'tickets':'',
                'city': ''
            };
            let slotToElicit = Object.keys(event.currentIntent.slots).filter(value => {if(event.currentIntent.slots[value]){
                replyObject.dialogAction.slots[value] = event.currentIntent.slots[value];
            } 
            return event.currentIntent.slots[value] == null;});
            console.log(slotToElicit);
            replyObject.dialogAction.slotToElicit = slotToElicit[0];
            
            break;
    }
     console.log(event);
     console.log(replyObject);
    // TODO implement
    callback(null,replyObject);
};