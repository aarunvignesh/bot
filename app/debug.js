
var testObject = {
    messageVersion: '1.0',
    invocationSource: 'FulfillmentCodeHook',
    userId: 'ft0r7jyuibns89h9etrorrco8yi0q8p7',
    sessionAttributes: null,
    bot: { name: 'awshelper', alias: null, version: '$LATEST' },
    outputDialogMode: 'Text',
    currentIntent:
    {
        name: 'sell',
        slots:
        {
            ticketcount: '3',
            comments: null,
            movie: 'Shivam',
            showTime: '15:00',
            buyergender: null,
            showDate: '2017-06-12'
        },
        confirmationStatus: 'None'
    },
    inputTranscript: '3.00pm'
};

require('./index').handler(testObject,null,(a,b) => {
    console.log(b);
});