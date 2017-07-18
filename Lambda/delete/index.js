var request = require('request-promise'),
    bluebird = require('bluebird'),
    config = require('./../config'),
    output = require('./../Output');

module.exports = {
    delete: (slot, session)=>{
        return new bluebird((resolve, reject) => {
                
            request({
                uri: config.web.url+'/delete',
                method:'POST',
                json:true,
                body: {uniqueId: slot.id},
                headers:{
                    "X-TOKEN":"227c12d8-00fc-4b27-8c96-2cd8bbdf6f1f"
                }
            })
            .then(
            (result) => {
                if(result.result && result.result.nModified > 0){
                    resolve(output.closeSlot("Your post has been successfully removed..."));
                }
                else{
                    resolve(output.closeSlot("Your post is not found... Kindly check your transaction Id..."+JSON.stringify(result)));
                }
            }
            ,(result) => {
                resolve(output.closeSlot("We are getting unexpected error in our Ecosystem. Soon We will get back."));
            });
        });
    }
}