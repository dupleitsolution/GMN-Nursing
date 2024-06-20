const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Replace with your email
    pass: 'your-email-password'   // Replace with your email password
  }
});

app.post('/send-email', (req, res) => {
  const { name, email, phone, state, city, course, specialization, agree } = req.body;

  const mailOptions = {
    from: 'your-email@gmail.com', // Replace with your email
    to: 'gmncollegenursing@gmail.com', // Replace with the recipient email
    subject: 'New Admission Form Submission',
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      State: ${state}
      City: ${city}
      Course: ${course}
      Specialization: ${specialization}
      Agree: ${agree}
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.send('Email sent: ' + info.response);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
