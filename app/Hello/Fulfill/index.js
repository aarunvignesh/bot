var output = require("./../../Output");

module.exports = (input) => {

    input = input.toLowerCase();

    var reply;

    //Switch for reply 
    switch(input){

        case 'hi':
            reply = 'Hi,';
            break;
        case 'hello':
            reply = 'Hello,';
            break;
        case 'namashkar':
            reply = 'Namashkar,';
            break;
        case 'vanakkam':
            reply = 'Vanakkam,';
            break;
    };

    reply = (reply ? reply : 'Yes,')+' How can I help you today?';
    return output.closeSlot(reply);
};

