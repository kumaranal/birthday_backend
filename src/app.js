const express = require('express');
const routes=require('./routes/api.routes');
const cors= require ("cors")
const mongoose=require('mongoose');
const fileupload=require('express-fileupload');
const app = express();

require('dotenv').config();


app.use(express.json())
app.use(cors())
app.use(fileupload({
    useTempFiles:true
}))


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api',routes);

   app.use(function(err,req,res,next){
    console.log(err.message);
    if(!err.statusCode)err.statusCode=500;
    res.status(err.statusCode).send(err.message);
});

module.exports = app;