import nodemailer from 'nodemailer';
import _config from '../config/config.js';

import dotEnv from 'dotenv';
dotEnv.config({
    path: '../../.env'
});


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: _config.EMAIL_USER,
        clientId: _config.CLIENT_ID,
        clientSecret: _config.CLIENT_SECRET,
        refreshToken: _config.REFRESH_TOKEN
    }
});


// verify the connection configuration -->
transporter.verify((error, success) => {
    if (error) {
        console.error('Error connecting to email server:', error);
    } else {
        console.log('Email server is ready to send messages');
    };
});

console.log(transporter.options.auth);


// function send to mail -->
export const sendMail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"Your Name" <${_config.EMAIL_USER}>`, //sender address
            to, // list of receivers
            subject, // Subject line
            text, // plain text body
            html, // html body
        });


        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error('Error sending email:', error);
    };
};




export default { transporter, sendMail }