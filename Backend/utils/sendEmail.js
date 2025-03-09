const nodemailer = require("nodemailer");

// Function to send email notification
const createTransporter = async () => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",  // Use your email provider (Gmail, Outlook, etc.)
            auth: {
                user: process.env.EMAIL_USER,   // Set environment variable
                pass: process.env.EMAIL_PASS,   // Use App Password for Gmail
            },
        });
        return transporter;
       
    } catch (error) {
        console.error("Error sending email:", error);
    }
};


const sendEmail= async(to,subject,text,transporter)=>{
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
}
module.exports = {createTransporter,sendEmail};
