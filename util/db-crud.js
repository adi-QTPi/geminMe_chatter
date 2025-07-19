import "dotenv/config"
import {neon} from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL);

export async function createNewUser(obj){
    try{
        obj = obj;
        const id = `${obj.googleid}`;
        const result = await sql`INSERT INTO users (googleid, displayname, emailid) VALUES (${id}, ${obj.displayname}, ${obj.email});`
    
        return result;
    }catch(err){
        console.log("error in creating a new user",err);
    }
}

export async function getUserByGoogleId(googleid){
    try{
        const id = googleid;
        const result = await sql`SELECT * FROM users WHERE googleid = ${id}`;
        return result[0];
    }catch(err){
        console.error("error in getting a user", err);
    }
}

export async function patchUserData(obj){
    try{
        const id = `${obj.googleid}`;
        const result = await sql`UPDATE users SET displayname = ${obj.displayname}, emailid = ${obj.email} WHERE googleid = ${id};`;

        return result;
    }catch(err){
        console.error(err);
    }
}

// const x = await patchUserData({
//     googleid:"108304993546232265308",
//     displayname:"Aditya Verma",
//     email:"halwa@gmail.com"
// });