import Toast from 'react-native-toast-message';

export const errorMessage = (message) => {
  Toast.show({
    type: 'error',
    text1: 'Atenção',
    text2: message
  });
};

export const successMessage = (message) => {
  Toast.show({
    type: 'success',
    text1: 'Sucesso',
    text2: message
  });
};

export const infoMessage = (message) => {
  Toast.show({
    type: 'info',
    text1: 'Informação',
    text2: message
  });
};