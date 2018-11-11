const express = require('express');
const createError = require('http-errors');
const favicon = require('express-favicon');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const app = express();

// Configure port
const port = process.env.PORT || 4000;

// Configure DataBase
mongoose.connect(`mongodb+srv://krstevskii:7zlm82BzTbQRPKfu@get-bike-messages-vdfet.gcp.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true })
    .then(() => console.log(`MongoDB connected...`))
    .catch(err => console.log(err));

// Configure static files
app.use('/static', express.static(path.join( __dirname , '/public' )));
app.use(favicon(path.join( __dirname , '/public/img/logoItem.png')));

// Express session middleware
app.use(session({
    secret: 'reset',
    resave: true,
    saveUninitialized: true
}));

app.use(flash());

// Global variables
app.use(function (req, res, next) {

    // console.log(req.flash('success_msg'));
    res.locals.success_msg = req.flash('success_msg');
    next();

});

// POST body configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Configure Template Engine
app.set('views', path.join( __dirname , '/views'));
app.engine('hbs',
    hbs({
        extname: 'hbs',
        layoutsDir: path.join(__dirname, '/views/layouts'),
        partialsDir: path.join(__dirname, '/views/partials'),
        defaultLayout: 'mkdIndex'
    }));
app.set('view engine', 'hbs');

// Load Routes
const mkdRoutes = require('./routes/mkdVersion');
const enRoutes = require('./routes/enVersion');

// Use Routes
app.use('/', mkdRoutes);
app.use('/en', enRoutes);

app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use('/en', function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', {
        layout: 'enIndex',
        title: 'Грешка',
        enActive: 'active',
        error_message: 'Sorry,',
        error_message1: 'Looks like something went wrong on our end. Please head back Home.',
        SiteLayoutCSS: '<link rel="stylesheet" href="/static/css/error.css" type="text/css"/>'
    });
});

app.use('/', function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', {
        title: 'Грешка',
        mkActive: 'active',
        error_message: 'Извинете,',
        error_message1: 'Очигледно има проблем од наша страна на кој што работиме да го отстраниме. Ве молиме вратете се на почеток.',
        SiteLayoutCSS: '<link rel="stylesheet" href="/static/css/error.css" type="text/css"/>'
    });
});

app.listen(port, () => console.log(`Serving forever on port ${port}`));
