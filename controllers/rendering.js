import {marked} from "marked"

export async function handleRenderMainPage(req,res){
    let toHomePage = req.session.toHomePage || null;
    if(toHomePage && toHomePage.response){
        toHomePage.response = marked(toHomePage.response);
    }  
    res.render("home", { toHomePage } );
}