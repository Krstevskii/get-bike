const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Load Mongoose Model
require('../model/message');
const MessageModel = mongoose.model('message');

router.get('/', (req, res) => {
    res.render('en/home', {
        title: 'Home',
        layout: "enIndex",
        homeActive: "active",
        SiteLayoutCSS: '<link rel="stylesheet" href="/static/css/carousel.css" type="text/css"/><link rel="stylesheet" href="/static/css/indexMain.css" type="text/css"/>',
        enActive: 'active'
    });
});

router.get('/idea', (req, res) => {
    res.render('en/idea', {
        title: "Idea",
        layout: 'enIndex',
        ideaActive: 'active',
        SiteLayoutCSS: '<link rel="stylesheet" href="/static/css/ideaMain.css" type="text/css"/>',
        enActive: 'active'
    });
});

router.get('/get-team', (req, res) => {
   res.render('en/get-team', {
       title: "GET Team",
       layout: 'enIndex',
       getActive: 'active',
       SiteLayoutCSS: '<link rel="stylesheet" href="/static/css/gteamMain.css" type="text/css"/>',
       cardDescription: 'Student at the Faculty of Mechanical Engineering Skopje',
       enActive: 'active'
   });
});

router.get('/news', (req, res) => {
   res.render('en/news', {
       title: 'News',
       layout: 'enIndex',
       newsActive: 'active',
       SiteLayoutCSS: '<link rel="stylesheet" href="/static/css/newsMain.css" type="text/css"/>',
       enActive: 'active'
   });
});

router.get('/contact-us', (req, res) => {
    res.render('en/contact-us', {
        title: 'Contact',
        layout: 'enIndex',
        contactActive: 'active',
        SiteLayoutCSS: '<link rel="stylesheet" href="/static/css/contactMain.css" type="text/css"/>',
        enActive: 'active'
    });
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
            req.flash('success_msg', 'Your message has been successfully sent');
            res.redirect('/en/contact-us')

        })
        .catch(err => console.log(err));


});

module.exports = router;