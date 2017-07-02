/*
  The core function that receives the Dialog slots and distributes 
  to the corresponding validation module
*/
var sell = require('./Sell'),
    buy = require('./Buy');

var validate = (currentIntent,session)=>{
    switch(currentIntent.name){
        case 'sell':
           return  sell.validate(currentIntent.slots, session);
        case 'buy':
           return buy.validateBuy(currentIntent.slots, session);
    }
};

module.exports = {
    validate
};