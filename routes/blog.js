const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', function (req, res) {
    var obj = {
        title: 'Мои статьи'
    };
    Object.assign(obj, req.app.locals.settings);
    const Model = mongoose.model('blog');
    Model
        .find()
        .then(items =>{
           Object.assign(obj,{items:items});
           res.render('pages/blog', obj);
        });
});


module.exports = router;