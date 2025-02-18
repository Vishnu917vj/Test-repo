import React, { useState } from 'react';
import { Inbox } from '@novu/react';
import './styles.css';

const App = () => {
  


  const [isNotified, setIsNotified] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [customSubject, setCustomSubject] = useState('');
  const [email, setEmail] = useState('');
  const [isDefaultNotified, setIsDefaultNotified] = useState(false);
  const [message, setMessage] = useState('');
  const [messageSubject,setMessageSubject]=useState('')

  // Send default notification to the backend
  const sendDefaultNotification = async () => {
    try {
      const response = await fetch('https://test-repo-p3w2.onrender.com/api/trigger-default-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriberId: '67b3355058411ad4009e76da',  // Replace with actual subscriber ID
          payload: {
            subject:messageSubject || 'Default Notification',
            body: message,
          },
        }),
      });

      const result = await response.json();
      if (result.success) {
  setIsDefaultNotified(true);
  alert("Scroll down to Inbox and click on bell icon to see notifications.");
} else {
  alert("Notification sending failed.");
}

    } catch (error) {
      console.error('Error sending default notification:', error);
      setIsDefaultNotified(false);
    }
  };

  // Send custom notification to the backend
  const sendCustomNotification = async () => {
    try {
      const response = await fetch('https://test-repo-p3w2.onrender.com/api/trigger-custom-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriberId: '67b3355058411ad4009e76da',  // Replace with actual subscriber ID
          email,  // Use the email entered by the user
          payload: {
            subject: customSubject,
            body: customMessage,  // Custom message entered by the user
            primaryActionLabel: 'Go to Dashboard',
            secondaryActionLabel: 'Learn More',
          },
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsNotified(true);  // Indicate success
        alert("Mail Sent successfully");
        setCustomMessage('');  // Clear the custom message field
        setEmail('');  // Clear the email field
      } else {
        setIsNotified(false);
      }
    } catch (error) {
      console.error('Error sending custom notification:', error);
      setIsNotified(false);
    }
  };

  return (
    <div>
      <h1>Novu Notification Demo </h1>
      <input
          type="text"
          placeholder="Enter Message For In App Notification"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Subject For In App Notification"
          value={messageSubject}
          onChange={(e) => setMessageSubject(e.target.value)}
        />
      {/* Default notification */}
      <div>
        <button onClick={sendDefaultNotification}>Send Default Notification</button>
        {isDefaultNotified && <p>Notification sent successfully!</p>}
      </div>
      
      {/* Custom Notification Section */}
      <div>
        <h2>Send Mail Notification</h2>
        <input
          type="email"
          placeholder="Enter recipient email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter custom subject"
          value={customSubject}
          onChange={(e) => setCustomSubject(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter custom message"
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
        />
        <button onClick={sendCustomNotification}>Send Custom Notification</button>
        {isNotified && <p>Mail Notification sent successfully!</p>}
      </div>

      {/* Novu Inbox */}
      <div>
        <h2>Inbox</h2>
        <Inbox
          applicationIdentifier="pL6tt6osz80Q"  // Replace with your Novu App ID
          subscriberId="67b3355058411ad4009e76da"  // Replace with your actual subscriber ID
        />
      </div>
    </div>
  );
};

export default App;
