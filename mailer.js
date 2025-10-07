const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendOtpEmail(toEmail, otp) {
  try {
    const mailOptions = {
      from: `"Your App" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}\nThis code will expire shortly.`,
      html: `<p>Your OTP code is: <strong>${otp}</strong></p><p>This code will expire shortly.</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(' OTP Email sent:', info.response);
    return info;
  } catch (err) {
    console.error('Error sending OTP email:', err);
    throw err; // Important: rethrow so the controller catch block can log it
  }
}

module.exports = { sendOtpEmail };
