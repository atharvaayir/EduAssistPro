const nodemailer = require("nodemailer");

// Function to send email notification
const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",  // Use your email provider (Gmail, Outlook, etc.)
            auth: {
                user: process.env.EMAIL_USER,   // Set environment variable
                pass: process.env.EMAIL_PASS,   // Use App Password for Gmail
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = sendEmail;
