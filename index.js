const express = require('express');
const cors = require('cors');
const nodemailer = require("nodemailer");
const app = express();
require('dotenv').config();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
});
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('library server is running');
})

app.post('/contact', (req, res) => {
    const mail = {
        from: req.body.Email, // sender address
        to: "shihanforwork@gmail.com, sharifulislamshihan@gmail.com", // list of receivers
        subject: "Message From Portfolio", // Subject line
        text: "", // plain text body
        html: `
        <div>
            <h1>Hello Shariul Islam!</h1>
            <p><b>Name : </b> ${req.body.Name} </p> 
            <p><b>Email : </b> ${req.body.Email} </p> 
            <p><b>Phone : </b> ${req.body.Phone} </p> 
            <p><b>Country : </b> ${req.body.Country} </p> 
            <p><b>Message : </b> ${req.body.Message} </p> 
        ` // html body
    };

    transporter.sendMail(mail, (error, info) => {
        if (error) {
            return console.error('Error:', error);
        }
        console.log('Email sent:', info.response);
    });
    console.log(req.body);
})

app.listen(port, () => {
    console.log(`my portfolio server running on port ${port}`);
})