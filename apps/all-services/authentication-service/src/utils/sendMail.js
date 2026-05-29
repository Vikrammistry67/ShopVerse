import nodemailer from "nodemailer";
import _config from "../config/config.js";

const sendEmail = async (to, subject, html) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: _config.EMAIL_USER,
            pass: _config.EMAIL_PASSWORD, // app password
        },
    });

    await transporter.sendMail({
        from: `"ShopVerse" <${_config.EMAIL_USER}>`,
        to,
        subject,
        html,
    });
};

export default sendEmail;