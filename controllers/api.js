import { chatWithContext } from "../util/genai.js";

export async function handlePostApiAsk(req, res){
    console.log("\nnew query to llm...\n");

    const prompt = req.body.prompt;
    
    const ans = await chatWithContext(prompt)

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