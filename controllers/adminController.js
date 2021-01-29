const Page = require('../models/pageModel');
const fs=require('fs');


class adminController{

    adminPage(req,res){
        res.render('admin');
    }



    getAllArticles(req,res){
        Page.find().then((pages)=>{
            console.log(pages);
            res.render('adminAllArticles',{pages:pages});
        })

    }
    getArticle(req,res){
        let id=req.query.id;
        Page.findOne({ _id: id }).then((page)=>{
            console.log(page);
            return res.render('adminGetArticle', {page:page})
        })

    }

    createArticlePage(req,res){

        res.render('adminCreateArticle')
    }

    saveNewArticle(req, res){


        const newArticle =new Page({
            title:req.body.title,
            description:req.body.description,
            content:req.body.content,
            imgname:req.file.filename,

        });
        newArticle.save().then(() => {
            console.log('new Article saved');
            return res.redirect('/admin/articles')
        }).catch(err=>{
            console.log(err);
            return res.redirect('/admin/articles/articleCreate')
        })


    }
    deleteArticle(req, res){


        Page.findOneAndDelete(req.body).then((info)=>{
            console.log(info);


            try{

                fs.unlinkSync(__dirname+'/../public/images/'+info.imgname)
            }
            catch(err){
                console.log(err)
            }
            console.log(info);
            return res.json({n:1})

        })
    }

    articleUpdatePage(req, res){
        let id=req.query.id;
        Page.findOne({ _id: id }).then((page)=>{
            console.log(page);
            return res.render('adminUpdateArticle', {page:page})
        })

    }

    saveUpdatedArticle(req, res){

        let imgName="";
        let file=req.file;
        if(file){
            imgName=file.filename;
            try{

                fs.unlinkSync(__dirname+'/../public/images/'+req.body.imgname)
            }
            catch(err){
                console.log(err)
            }

        }else{
            imgName=req.body.imgname
        }

        Page.updateOne({_id: req.body.id},{
            title:req.body.title,
            description:req.body.description,
            content:req.body.content,
            imgname:imgName,

        }).then((info)=>{

            console.log('Article updated', info);
            return res.redirect('/admin/articles')
        });


    }

}


module.exports=new adminController();