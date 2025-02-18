import React from 'react';
import { Inbox } from '@novu/react';

const NovuInbox = () => {
  return (
    <Inbox
      applicationIdentifier="pL6tt6osz80Q"  // Replace with your Novu App ID
      subscriberId="67b3355058411ad4009e76da"  // Replace with your subscriber ID
    />
  );
};

export default NovuInbox;
