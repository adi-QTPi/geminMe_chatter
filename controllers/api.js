import { chatWithContext } from "../util/genai.js";

export async function handlePostApiAsk(req, res){
    console.log("\npost request controller for api/ask\n");

    const prompt = req.body.prompt;
    
    const ans = await chatWithContext(prompt)

    console.log(ans);
    req.session.toHomePage = {
        response: ans
    }

    res.redirect("/");
}