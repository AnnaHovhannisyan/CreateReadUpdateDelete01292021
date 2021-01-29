const express = require('express');
const router = express.Router();

let auth=require('../middleware/auth');


const {  registerPage,
  addUser,
  loginPage,
  userLogin,
  logOut

}
=require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.route('/register')
    .get( registerPage)
    .post(addUser);


router.route('/login')
    .get(loginPage)
    .post(userLogin);




router.get('/logout',logOut);



/* GET users listing. */


module.exports = router;
