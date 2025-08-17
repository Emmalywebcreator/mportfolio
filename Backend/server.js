require('dotenv').config();
const express = require('express')
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

//Middleware
app.use(express.json());

//CORS for frontend only
app.use(cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5500"],
    methods: ['POST'],
    allowedHeaders: ['Content-Type']
}));


//API endpoint
app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }


try {
    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', //or custom SMTP
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    //Email content
    const mailOptions = {
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_RECEIVER,
        subject: `Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };


    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: 'Message sent successfully!' });

} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
}
})

app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});


//Deployment: use dynamic port
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
