const express = require('express');
const mysql = require('mysql')
const readerRouter = require('./router/read.router');

const app = express();

app.use('/read',readerRouter);

const port = 3400

app.listen(port,() =>{
    console.log('Listening to PORT '+port );
})