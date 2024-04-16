import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NewsListPage from './src/screens/NewsListPage';
import NewsDetailPage from './src/screens/NewsDetailPage';
import FavoriteNewsPage from './src/screens//FavoriteNewsPage';
import { Provider } from 'react-redux';
import store from './store';
import ProfilePage from './src/screens/ProfilePage'; 
import { getToken, onMessageListener } from './src/NewsFirebaseMessagingService';
import { showNotification } from './src/NotificationService';

const Stack = createStackNavigator();

const App = () => {
  
  useEffect(() => {
    getToken();
    onMessageListener().then(remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      showNotification(remoteMessage.notification.title, remoteMessage.notification.body);
    });
  }, []);

  return (
    <Provider store={store}>

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="NewsList" component={NewsListPage} options={{ title: 'News' }}/>
          <Stack.Screen name="NewsDetailPage" component={NewsDetailPage} options={{ title: 'News Details' }}/>
          <Stack.Screen name="FavoriteNewsPage" component={FavoriteNewsPage} options={{ title: 'My Favourite' }}/>
          <Stack.Screen name="ProfilePage" component={ProfilePage} options={{ title: 'My Profile' }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;