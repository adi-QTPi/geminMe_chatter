import "dotenv/config"
import fs from 'fs/promises';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const HISTORY_FILE = process.env.HISTORY_FILE

export async function chatWithContext(message_to_ai) {
  try{
    let history_var_text = await fs.readFile(HISTORY_FILE, "utf8");
    let history_var = [];
    if(history_var_text){
      history_var = JSON.parse(history_var_text);
    }
      
    console.log("====================================")
    for( let obj of history_var){
      console.log(`${obj.role} : ${JSON.stringify(obj.parts[0].text)}`);
    }
    console.log("====================================")

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const chat = model.startChat({
      history: history_var,
      generationConfig: {
        maxOutputTokens: process.env.MAX_OUTPUT_TOKEN,
      },
    });
    
    const msg = message_to_ai;
    const result = await chat.sendMessage(msg);
    const response = await result.response;
    const history_unit = response.candidates[0].content;
    const display_response = history_unit.parts[0].text;

    //history_var updated automatically !!!

    await fs.writeFile(HISTORY_FILE, JSON.stringify(history_var, null, 2), 'utf8');
    return display_response;
  }catch(error){
    console.error("an error occurred : ", error)
  }
}