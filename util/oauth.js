import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from "passport";

import {createNewUser, getUserByGoogleId, insertNewChat, patchUserData} from "./db-crud.js"

async function userIdentifyOrCreate(profileData, done){
    try{
        let user = await getUserByGoogleId(profileData.sub);
        
        if(user){
            user = {
                googleid:profileData.sub,
                displayname:profileData.name,
                email:profileData.email
            }
            
            let result = await patchUserData(user);
            
            return done(null, user);
            
        }else{
            user = {
                googleid:profileData.sub,
                displayname:profileData.name,
                email:profileData.email
            }

            let result = await createNewUser(user);          

            return done(null, user);
        }
        
    }catch(err){
        console.log("error in user create or identify function : ",err);
        return done(err,null);
    }
}

const configurePassport = () => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URI
    },
    async function(accessToken, refreshToken, profile, cb) {
        userIdentifyOrCreate(
            profile._json, 
            function (err, user) {
                return cb(err, user);
            });
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user.googleid);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            // get full user object from your database using this googleid
            const user = await getUserByGoogleId(id); 

            if (user) {
                done(null, user); // Attach the full user object to req.user
            } else {
                done(null, false); // User not found (e.g., deleted from DB)
            }
        } catch (err) {
            console.error('Error during deserializeUser:', err);
            done(err, null);
        }
    });
}


/**
 Identifies an existing user or creates a new one based on Google profile data.
 @param {object} profileData - The raw Google profile data (profile._json).
 @param {string} accessToken
 @param {string} refreshToken
 @param {function} done - Passport's callback function (err, user).
 */

export default configurePassport;