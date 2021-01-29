const Page = require('../models/pageModel');

class indexController{
    index(req,res){
        Page.find().sort({}).then((pages)=>{
            console.log(pages);
            res.render('index',{pages:pages});
        });

    }
}

module.exports=new indexController();
