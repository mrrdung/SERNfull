const express = require('express')
import bodyParser from 'body-parser'// use params, body
const dotenv = require('dotenv');
dotenv.config();
import viewEngine from "./config/viewEngine";
import initWebRouter from "./router/web";
import connectDB from './config/configDB';


const app = express();
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});




//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


viewEngine(app);
initWebRouter(app);
// connect DB

connectDB();

let port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log("Server is runing!", port);

});