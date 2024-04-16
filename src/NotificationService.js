import PushNotification from 'react-native-push-notification';

export const showNotification = (title, message) => {
  PushNotification.localNotification({
    title: title,
    message: message,
  });
};