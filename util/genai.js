import "dotenv/config"
import fs from 'fs/promises';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { fetchHistory, updateHistory } from "./db-crud.js";
import { json } from "stream/consumers";
import base_prompt from "../base_prompt.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function chatWithContext(message_to_ai) {
  try{
    let history;
    let msg;
    let chat;
    if(process.env.CURR_CHAT_ID){
      history = await fetchHistory(process.env.CURR_CHAT_ID);

      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
      chat = model.startChat({
        history: history,
        generationConfig: {
          maxOutputTokens: process.env.MAX_OUTPUT_TOKENS,
        },
      });
      msg = message_to_ai;
    }
    else{
      history = JSON.stringify(base_prompt[0].parts[0]);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
      chat = model.startChat({
        generationConfig: {
          maxOutputTokens: process.env.MAX_OUTPUT_TOKENS,
        },
      });

      msg = `${history} ; ${message_to_ai}`;
    }
    
    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const history_unit = response.candidates[0].content;
    const display_response = history_unit.parts[0].text;

    if(process.env.CURR_CHAT_ID){
      let x = await updateHistory(process.env.CURR_CHAT_ID, history);
    }

    return display_response;
  }catch(error){
    console.error("an error occurred : ", error)
  }
}