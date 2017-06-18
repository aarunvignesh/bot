var output = require('./../../Output');

module.exports = function(slot, session){
    Object.keys(slot).forEach(function(value){
        session[value] = slot[value];
    });

    return output.elicitSlot('edit','editField', session, {
        editField: ''
    });
};