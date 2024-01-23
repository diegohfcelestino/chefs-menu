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

export function handleDateFormatIso(data) {
  const newData = new Date(data);
  return `${newData.getFullYear()}-${pad(newData.getMonth() + 1)}-${pad(newData.getDate())}T${pad(newData.getHours())}:${pad(newData.getMinutes())}:${pad(newData.getSeconds())}`;
}

export function formataMoeda(v) {
  v = v?.toFixed(2);
  v = v?.toString();
  v = v?.replace(/\D/g, "");
  v = v?.replace(/([0-9]{2})$/g, ",$1");
  if (v?.length > 6) {
    v = v?.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
  }
  return v;
}