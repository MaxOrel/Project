const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('../config.json');
const mongoose = require('mongoose');

router.get('/', function (req, res) {
    var obj = {
        title: 'Мои работы'
    };
    Object.assign(obj, req.app.locals.settings);
    const Model = mongoose.model('portfolio');
    Model
        .find()
        .then(items => {
            // обрабатываем шаблон и отправляем его в браузер передаем в шаблон список
            // записей в блоге
            Object.assign(obj, {items: items});
            res.render('pages/portfolio', obj);
   });
});

router.post('/mail', function(req, res) {
    if (!req.body.name || !req.body.email || !req.body.text) {
        //если что-либо не указано - сообщаем об этом
        return res.json({status: 'Укажите данные!'});
    }
    //инициализируем модуль для отправки писем и указываем данные из конфига
    const transporter = nodemailer.createTransport(config.mail.smtp);
    const mailOptions = {
        from: `"${req.body.name}" <${req.body.email}>`,
        to: config.mail.smtp.auth.user,
        subject: config.mail.subject,
        text: req
            .body
            .text
            .trim()
            .slice(0, 500) + `\n Отправлено с: <${req.body.email}>`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        //если есть ошибки при отправке - сообщаем об этом
        if (error) {
            return res.json({status: 'При отправке письма произошла ошибка'+error.message});
        }
        res.json({status: 'Письмо успешно отправлено'});
    });

});

module.exports = router;