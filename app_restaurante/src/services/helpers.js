import { Alert, BackHandler } from "react-native";
import NetInfo from "@react-native-community/netinfo";

export const verificarConexaoComInternet = async () => {
  await NetInfo.fetch().then(state => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
    console.log("Is isInternetReachable?", state.isInternetReachable);//esta opção verifica se está acessível mesmo ativa a conexão
    if (state.isConnected === false) {
      modalConexao();
    }
  });
};

const modalConexao = () => {
  Alert.alert('Dispositivo desconectado', `Seu dispositivo está desconectado da internet. \nVerifique sua conexão e tente novamente.`, [
    {
      text: "Tentar Novamente",
      onPress: () => verificarConexaoComInternet(),
      style: "cancel"
    },
    { text: "Sair do app", onPress: () => BackHandler.exitApp() }
  ]);
  return true;
};

export function handleError(error, altMessage = "Ocorreu um erro durante o processo") {
  if (!error?.response) error = { response: { data: false, status: false } };
  const { data, status } = error?.response;
  let message = "";
  if (data) {
    const errorMessage = data?.message;
    message = errorMessage;
  }

  switch (status) {
    case 400:
      message = message ?? "Verifique os dados enviados";
      break;
    case 401:
      message = message ?? "Não autenticado";
      break;
    case 404:
      message = message ?? "Nenhum registro encontrado!";
      break;
    case 500:
      message = message ?? "Erro no servidor";
      break;
    default:
      message = message ?? "Erro desconhecido!";
      break;
  }

  if (message) return `${altMessage} - ${message}`;
}