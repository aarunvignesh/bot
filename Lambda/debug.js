
var testObject =  { messageVersion: '1.0',
invocationSource: 'FulfillmentCodeHook',
//invocationSource: 'DialogCodeHook',
userId: 'd5w9yubonokyti6u7l792ulqkys7hmkj',
sessionAttributes: 
{
id: 'r1WAPjI4-'
 
},
bot: { name: 'awshelper', alias: null, version: '$LATEST' },
outputDialogMode: 'Text',
currentIntent: 
{ 
name: 'removeticket',
slots: { 
  id: 'r1WAPjI4-'
}
},
inputTranscript: 'a.s.arunvignesh@gmail.com' };


require('./index').handler(testObject,null,(a,b) => {
    console.log(b);
});