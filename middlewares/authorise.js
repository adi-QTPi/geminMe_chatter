export async function checkWhetherLoggedIn(req, res, next){
    if(req.user){
        req.session.toHomePage = {
            ...req.session.toHomePage,
            user:req.user
        }
    }
    next();
}