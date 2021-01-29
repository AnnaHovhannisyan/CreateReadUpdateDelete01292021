const User = require('../models/userModel.js');

class userController {

    registerPage(req,res){

        res.render('register', {message:'Register'});

    }


    addUser(req, res){

        if(!req.body.email || !req.body.password){
            res.status("400");
            res.send("Invalid details!");
        } else {

            async function createUser(email, password) {
                return new User({
                    email:email,
                    password:password

                }).save()
            }


            (async () => {
                const email = req.body.email;
                console.log(User);
                async function findUser(name) {
                    return await User.findOne({ email })
                }
                let user=await findUser(email);
                console.log(user);
                if (!user) {
                    await createUser(req.body.email,req.body.password).then((result)=>{

                        return res.redirect('/users/login')
                    }).catch((err)=>{

                        console.log(err._message)

                    })


                }else{
                    res.render('register', {message:req.body.email+" is taken"});
                }

            })()

        }
    }

    loginPage(req, res){
        res.render('login', {message: 'Login'});
    }

    userLogin(req, res){


        if(!req.body.email || !req.body.password){
            res.render('login', {message: "Please enter both email and password"});
        } else {


            User.findOne({
                email: req.body.email
            }).exec((err, user) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                if (!user) {
                    return  res.render('login', {message:'User is not registered'})
                }

                user.comparePassword(req.body.password, function(err, isMatch) {
                    if (err){
                        return res.render('login', {message:'Unexpected problem'})
                    }

                    if(isMatch)
                    {
                        req.session.user = user;
                        res.redirect('/admin/');

                    }else{
                        return res.render('login', {message:'User is not registered'})

                    }

                });

            });

        }

    }
    logOut(req, res){
        req.session.destroy(function(){
            console.log("user logged out.")
        });
        res.redirect('/');
    }

}

module.exports=new userController();