const express = require('express');
const multer = require('multer');
const router = express.Router();

const {auth}=require('../middleware/auth');

const {adminPage,
    getAllArticles,
    getArticle,
    createArticlePage,
    saveNewArticle,
    articleUpdatePage,
    saveUpdatedArticle,
    deleteArticle,
}=require('../controllers/adminController');

//image upload
// SET STORAGE

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
        cb(null,Date.now()+file.originalname)
    }
});

let upload = multer({ storage: storage });

router.get('/', auth, adminPage );

router.route('/articles',auth).get(getAllArticles);


router.route('/articles/article',auth)
    .get(getArticle)
    .delete(deleteArticle);


router.route('/articles/articleCreate',auth)
    .get(createArticlePage)
    .post(upload.single('myFile'),saveNewArticle);

router.route('/articles/articleUpdate',auth)
    .get(articleUpdatePage)
    .post(upload.single('myFile'),saveUpdatedArticle);


module.exports = router;