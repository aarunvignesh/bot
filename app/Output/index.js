
var closeSlot = (text) => {
    return {
        dialogAction:{
            type: "Close",
            fulfillmentState: "Fulfilled",
            message: {
                contentType: "PlainText",
                content : text
            }
        }   
    };
},

elicitSlot = (intent, slotToElicit, session, slot) =>{
    return {
        sessionAttributes: session,
        dialogAction:{
            type: "ElicitSlot",
            intentName: intent,
            slotToElicit: slotToElicit,
            slots: slot
        }
    };
},

confirmSlot = (intent, session, slot, text) => {
    return {
        sessionAttributes: session,
        "dialogAction": {
            "type": "ConfirmIntent",
            "message": {
            "contentType": "PlainText",
            "content": text
            },
        "intentName": intent,
        "slots": slot
        }
    };
};

module.exports = {
    closeSlot,
    confirmSlot,
    elicitSlot
};