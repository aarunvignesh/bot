
let closeSlot = (text) => {
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

elicitSlot = (intent,session, slot) =>{
    return {
        sessionAttributes: session,
        dialogAction:{
            type: "ElicitSlot",
            intentName: intent,
            slotToElicit:Object.keys(slot)[0],
            slots: slot
        }
    };
},

confirmSlot = (intent, slot, text) => {
    return {
        "dialogAction": {
            "type": "ConfirmIntent",
            "message": {
            "contentType": "PlainText",
            "content": "text"
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