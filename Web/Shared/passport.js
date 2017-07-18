var google   = require('passport-google-oauth').OAuth2Strategy
    config = require('./../settings.json');

module.exports = function(passport){
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });    

    passport.use(new google({
    clientID        :'549580664966-pubphdhme0hdj51oiuna71bmdaspdrns.apps.googleusercontent.com',
    clientSecret    :'h6TKft6W1hpAPML3sb5E6hN9',
    callbackURL     : config.domainUrl
    },function(token, tokenSecret, profile, done){
        profile.userToken = token;
        profile.userTokenSecret = tokenSecret;
        console.log(profile);
        return done(null,profile);
    }));
}