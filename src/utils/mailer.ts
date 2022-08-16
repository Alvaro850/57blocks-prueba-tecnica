"use strict";
import nodemailer from "nodemailer";

export async function sendEmail(emailsToSend: string, subject: string, html: string) {
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    })
    let info = await transporter.sendMail({
        from: `"Alvaro Perafán" <${process.env.EMAIL_USER}>`,
        to: emailsToSend,
        subject: subject,
        html: html,
    });
}