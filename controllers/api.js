import { chatWithContext } from "../util/genai.js";
import { insertNewChat } from "../util/db-crud.js";

export async function handlePostApiAsk(req, res){
    console.log("\nnew query to llm...\n");

    const prompt = req.body.prompt;
    
    if(!req.session.curr_chat_id && req.user){
        req.session.curr_chat_id = await insertNewChat(req.user.googleid);  
    }

    const ans = await chatWithContext(prompt, req)

    req.session.toHomePage = {
        ...req.session.toHomePage,
        response: ans
    }

    res.redirect("/");
}

export async function handlePostLogout(req, res){
    req.logout(()=>{
        res.status(200).redirect("/");
    });
}