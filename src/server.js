const express = require('express')
import bodyParser from 'body-parser'// use params, body
const dotenv = require('dotenv');
dotenv.config();
import viewEngine from "./config/viewEngine";
import initWebRouter from "./router/web";
import connectDB from './config/configDB';


const app = express();

//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


viewEngine(app);
initWebRouter(app);
// connect DB

connectDB();

let port = process.env.PORT || 8086;
app.listen(port, () => {
    console.log("Server is runing!", port);

});