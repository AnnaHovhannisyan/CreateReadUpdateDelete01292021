module.exports.auth=function checkSignIn(req, res, next){
    if(req.session.user){
        next();     //If session exists, proceed to page
    } else {
        let err = new Error("Not logged in!");
        res.redirect('/login');
        next(err);  //Error, trying to access unauthorized page!
    }
}