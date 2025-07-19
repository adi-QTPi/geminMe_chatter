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

import base_prompt from "../base_prompt.js";

export async function insertNewChat(googleid){
    const result = await sql`
INSERT INTO chats (googleId, chat_history) VALUES (${googleid}, ${JSON.stringify(base_prompt)}::jsonb) RETURNING chatId;
    `;

    return result[0].chatid;
}

export async function fetchHistory(chatid){
    const result = await sql`SELECT chat_history FROM chats WHERE chatid = ${chatid}`;
    return result[0]["chat_history"];
}

export async function updateHistory(chatid, new_history){
    const result = await sql`UPDATE chats SET chat_history = ${JSON.stringify(new_history)}::jsonb WHERE chatId = ${chatid} RETURNING chatid;`;

    return result[0].chatid;
}