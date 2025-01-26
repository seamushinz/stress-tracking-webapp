"use client"
import { useState } from 'react';

export default function NotificationRequestButton() {
  const [isPermissionGranted, setIsPermissionGranted] = useState(Notification.permission === 'granted');

  const requestNotificationPermission = async () => {
    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      console.log(`Permission: ${permission}`);
      if (permission === 'granted') {
        new Notification('Test Notification', {
          body: 'This is a test notification.',
        });
        setIsPermissionGranted(true);
      } else {
        console.warn('Notification permissions denied.');
      }
    } else if (Notification.permission === 'granted') {
      new Notification('Test Notification', {
        body: 'This is a test notification.',
      });
      setIsPermissionGranted(true);
    }
  };

  return (
    !isPermissionGranted && (
      <button onClick={requestNotificationPermission} className='menuButton'>
        Request Notification Permission
      </button>
    )
  );
}