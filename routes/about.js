const express = require('express');
const router = express.Router();
const tech = require('../models/skills.json');
const mongoose = require('mongoose');

router.get('/', function (req, res) {
    var obj = {
        title: 'Обо мне'
    };
    Object.assign(obj, req.app.locals.settings);
    let Model = mongoose.model('skills');
    Model.find({}).then(
        item => {
            Object.assign(obj, { items: item });
            res.render('pages/about', obj);
        },
        e => {
            console.log(e.message);
        }
    );
});


module.exports = router;