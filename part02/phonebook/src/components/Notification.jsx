import React from 'react';

const Notification = ({ confirmationMessage, notifType }) => {
  if (confirmationMessage === '') {
    return null;
  } else {
    return <div className={notifType}>{confirmationMessage}</div>;
  }
};

export default Notification;
