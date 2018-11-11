const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Load Mongoose Model
require('../model/message');
const MessageModel = mongoose.model('message');

// Render Home Page
router.get('/', (req, res) => {

    res.render('mkd/home', {
        title: 'Почетна',
        homeActive: 'active',
        SiteLayoutCSS: '<link rel="stylesheet" href="/static/css/carousel.css" type="text/css"/>\n'+'<link rel="stylesheet" href="/static/css/indexMain.css" type="text/css"/>',
        mkActive: 'active'
    });

});

// Render Idea Page
router.get('/idea', (req, res) => {
    res.render('mkd/idea', {

        title: 'За идејата',
        ideaActive: 'active',
        SiteLayoutCSS: '<link rel="stylesheet" href="/static/css/ideaMain.css" type="text/css"/>',
        mkActive: 'active'
    })
});

// Render Team Info Page
router.get('/get-team', (req, res) => {
    res.render('mkd/get-team', {
        title: 'ГЕТ тим',
        getActive: 'active',
        SiteLayoutCSS: '<link rel="stylesheet" href="/static/css/gteamMain.css" type="text/css"/>',
        cardDescription: 'Студент при Машински факултет Скопје',
        mkActive: 'active'
    });
});

// Render News Page
router.get('/news', (req, res) => {
    res.render('mkd/news', {
        title: 'Вести',
        newsActive: 'active',
        SiteLayoutCSS: '<link rel="stylesheet" href="/static/css/newsMain.css" type="text/css"/>',
        mkActive: 'active'
    });
});

// Render Contact Page using Model and Mongoose
router.get('/contact-us', (req, res) => {
    res.render('mkd/contact-us', {
        title: 'Контакт',
        contactActive: 'active',
        SiteLayoutCSS: '<link rel="stylesheet" href="/static/css/contactMain.css" type="text/css"/>',
        mkActive: 'active',
    })
});

router.post('/contact-us', (req, res) => {

    const newMessage = {

        FirstName: req.body.firstname,
        LastName: req.body.lastname,
        Email: req.body.email,
        Subject: req.body.subject,
        Message: req.body.message

    };

    new MessageModel(newMessage)
        .save()
        .then(addedUser => {

            console.log(addedUser);
            req.flash('success_msg', 'Вашата порака беше успешно испратена');
            res.redirect('/contact-us')

        })
        .catch(err => console.log(err));


});

module.exports = router;
