var output = require('./../../Output');

module.exports = function(slot, session){
    
    var mapper={
        "movie" : "movie",
        "theatre": "theatre",
        "city":"city",
        "ticket": "ticketcount",
        "tickets": "ticketcount",
        "date":"showDate",
        "time": "showTime",
        "name": "name",
        "email":"email",
        "comments":"comments"
    };

    if(slot.editField){

        if(mapper[slot.editField.toLowerCase()] && session[mapper[slot.editField.toLowerCase()]]){
            if(slot.editField.toLowerCase() == 'name' || slot.editField.toLowerCase() == 'email'){
                session[slot.editField.toLowerCase()] = null;
                return output.elicitSlot('user', slot.editField.toLowerCase(), session, {
                    name: slot.editField.toLowerCase() == 'name' ? null : session['name'],
                    email: slot.editField.toLowerCase() == 'email' ? null : session['email']
                });
            }
            else{
                var slotClone = JSON.parse(JSON.stringify(session));
                delete slotClone['name'];
                delete slotClone['email'];
                delete slotClone['type'];
                slotClone[mapper[slot.editField.toLowerCase()]] = null;
                return output.elicitSlot(session.type, mapper[slot.editField.toLowerCase()], session, slotClone);
            }
        }
        else{
            return output.confirmSlot('user', session, {
                name: session['name'],
                email:session['email']
            }, 'Edit Field not found Shall I continue?');
        }
    }
    else{
        return output.elicitSlot('edit','editField',session,{
            editField: null
        });
    }
};