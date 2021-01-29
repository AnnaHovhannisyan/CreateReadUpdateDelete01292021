const mongoose = require('mongoose');


const PageSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description:{
        type: String
    },
    content:{
        type: String,
        required: true
    },
    imgname:{
        type: String,
        required: true },

},{timestamp:true});


module.exports = mongoose.model('page', PageSchema);