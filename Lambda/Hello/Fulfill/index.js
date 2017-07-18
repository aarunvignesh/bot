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

    reply = (reply ? reply : 'Yes,')+' How can I help you today? :wave::skin-tone-3: \n I can help you to buy or sell your movie tickets \n Help: \n \"I would like to sell\" or \"buy tickets\" or \"I want to remove the post\"';
    return output.closeSlot(reply);
};

