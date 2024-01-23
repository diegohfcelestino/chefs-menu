import Toast from 'react-native-toast-message';

export const ShowToast = ({ type, title, message }) => {
  switch (type) {
    case "success":
      Toast.show({
        type: 'success',
        text1: title,
        text2: message
      });
      break;
    case "error":
      Toast.show({
        type: 'error',
        text1: title,
        text2: message
      });
      break;
    case "info":
      Toast.show({
        type: 'info',
        text1: title,
        text2: message
      });
      break;
    default:
      console.log("Nenhum tipo de toast foi selecionado");
  }
};

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