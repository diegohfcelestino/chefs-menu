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
import { SafeAreaView } from 'react-native-safe-area-context';

function App() {

  LogBox.ignoreLogs(['In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',]);

  const CustonTheme = {
    dark: true,
    colors: {
      background: theme.backgroundColor,
      card: theme.lightColor,
    },
  };

  useEffect(() => {
    verificarConexaoComInternet();
  }, []);


  return (
    <>
      <FlipperAsyncStorage />
      <NavigationContainer theme={CustonTheme}>
        <NativeBaseProvider>
          <StatusBar barStyle="light-content" backgroundColor={theme.darkColor} />
          <SafeAreaView style={{ flex: 1 }}>
            <AppProvider>
              <Routes />
              <Toast />
            </AppProvider>
          </SafeAreaView>
        </NativeBaseProvider>
      </NavigationContainer>
    </>
  );
}

export { App };