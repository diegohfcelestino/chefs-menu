import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { StatusBar, LogBox } from 'react-native';
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';
import { Routes } from './routes/routes';
import theme from './assets/theme';
import Toast from 'react-native-toast-message';
import { verificarConexaoComInternet } from './services/helpers';
import { AppProvider } from './context/AppContext';

function App() {

  LogBox.ignoreLogs(['In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',]);

  const CustonTheme = {
    dark: true,
    colors: {
      background: theme.backgroundColor,
      card: theme.primaryColor,
    },
  };

  useEffect(() => {
    console.log("teste de inicio do app");
    verificarConexaoComInternet();
  }, []);


  return (
    <>
      <FlipperAsyncStorage />
      <NavigationContainer theme={CustonTheme}>
        <NativeBaseProvider>
          <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
          <AppProvider>
            <Routes />
            <Toast />
          </AppProvider>
        </NativeBaseProvider>
      </NavigationContainer>
    </>
  );
}

export { App };