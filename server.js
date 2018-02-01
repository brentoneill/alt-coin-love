'use strict';

const compression = require('compression')
const express = require('express')
const path = require('path')
const app = express()

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 8080

// set the view engine to ejs
app.set('view engine', 'ejs')

// make express look in the public directory for assets (css/js/img)
app.use(express.static(`${__dirname}/dist`))    // Serves up dist as a static folder
app.use(compression())                          // Enables GZIP

// Set the route
app.get('*', (req, res) => {
    const origin = req.get('origin');
    res.header('Access-Control-Allow-Origin', origin);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    // ejs render automatically looks in the views folder
    res.render('index')

    next();
});


// Listen on the portttt
app.listen(port, () => {
    console.log(`Our app is running on port ${port}`)
});
