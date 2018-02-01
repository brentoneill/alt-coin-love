'use strict';

const compression = require('compression')
const express = require('express')
const path = require('path')
const app = express()
// const request = require('request')

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
    // ejs render automatically looks in the views folder
    res.render('index')
});


// Listen on the portttt
app.listen(port, () => {
    console.log(`Our app is running on port ${port}`)
});
//
// const API_URLS = [
//   {
//     name: 'gate',
//     url: 'http://data.gate.io/api2/1/tickers'
//   },
//   {
//     name: 'hitbtc',
//     url: 'https://api.hitbtc.com/api/2/public/ticker'
//   },
//   {
//     name: 'gate',
//     url: 'https://www.coinexchange.io/api/v1/getmarketsummaries'
//   }
// ];
// //
//
//
// app.get('/api/tickers', (req, res) => {
//     API_URLS.map(apiUrl => {
//         request(apiUrl.url, (error, response, body) => {
//             console.log(error);
//             console.log(response);
//             console.log(body);
//         });
//     });
// });
