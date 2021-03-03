import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Routes from "./src/routes/index";
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/auth';

export default function App() {
  let [fontsLoaded] = useFonts({
    'HelveticaNeueBold': require('./src/assets/fonts/HelveticaNeueBold.ttf'),
    'HelveticaNeueLight': require('./src/assets/fonts/HelveticaNeueLight.ttf'),
    'HelveticaNeueRegular': require('./src/assets/fonts/HelveticaNeueRegular.otf'),
  });

  if(!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <>
    <NavigationContainer
    >
      <AuthProvider>
        <Routes />
      </AuthProvider>
    <StatusBar style='light' />
    </NavigationContainer>
    </>
  );
}