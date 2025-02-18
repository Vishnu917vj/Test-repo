const express = require('express');
const cors = require('cors');
const { Novu } = require('@novu/node');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Initialize Novu with the secret key (replace with your actual key)
const novu = new Novu(process.env['NOVU_SECRET_KEY'] || 'bed98e4d72139e3d04c3582f5fa5d54c');

// Endpoint to trigger the default notification
app.post('/api/trigger-default-notification', async (req, res) => {
  try {
    const { subscriberId, payload } = req.body;

    // Trigger default notification
    const response = await novu.trigger('onboarding-demo-workflow', {
      to: { subscriberId },
      payload,
    });

    console.log('Default Notification Response:', response);  // Log for debugging

    res.status(200).json({
      success: true,
      message: 'Default Notification sent',
      status: response.status,
    });
  } catch (error) {
    console.error('Error triggering default notification:', error.message || error);
    res.status(500).json({
      success: false,
      message: 'Failed to send default notification',
      error: error.message || 'An unknown error occurred',
    });
  }
});

// Endpoint to trigger a custom notification
app.post('/api/trigger-custom-notification', async (req, res) => {
  try {
    const { subscriberId, email, payload } = req.body;

    // Ensure both subscriberId and email are passed correctly
    if (!subscriberId || !email) {
      return res.status(400).json({
        success: false,
        message: 'SubscriberId and Email are required',
      });
    }

    // Trigger custom notification
    const response = await novu.trigger('emailing', {
      to: {
        subscriberId: subscriberId,  // Use the subscriberId from the request
        email: email,  // Use the email from the request
      },
      payload,  // Use the provided payload
    });

    console.log('Custom Notification Response:', response);  // Log for debugging

    res.status(200).json({
      success: true,
      message: 'Custom Notification sent',
      status: response.status,
    });
  } catch (error) {
    console.error('Error triggering custom notification:', error.message || error);
    res.status(500).json({
      success: false,
      message: 'Failed to send custom notification',
      error: error.message || 'An unknown error occurred',
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
