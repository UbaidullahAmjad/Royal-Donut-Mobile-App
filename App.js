import React, {useEffect} from 'react';
import Navigator from './Src/Navigations/index';
import RNBootSplash from 'react-native-bootsplash'; // https://github.com/zoontek/react-native-bootsplash
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

export default function App() {
  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);

  return <Navigator />;
}
