import messaging from '@react-native-firebase/messaging';

export const getToken = async () => {
  const token = await messaging().getToken();
  console.log('Device FCM Token: ', token);
  return token;
};

export const onMessageListener = async () => 
  new Promise(resolve => {
    messaging().onMessage(async remoteMessage => {
      resolve(remoteMessage);
    });
  });