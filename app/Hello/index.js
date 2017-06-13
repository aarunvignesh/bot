let output = require("./../Output");

let greetings = (input) => {

    input = input.toLowerCase();

    let reply;

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

    reply += (reply ? reply : 'Yes,')+' How can I help you';
    return output.closeSlot(reply);
};

module.exports = {
    greetings
};