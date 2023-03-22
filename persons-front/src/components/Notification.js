import React from 'react';

const Notification = ({message, type}) => {
  if (message === null){
    return message
  }
  return (
    <div className={type === 'good' ? 'success' : 'error'}>
      {message}
    </div>
  );
}

export default Notification;
