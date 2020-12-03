import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './src';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log(remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
