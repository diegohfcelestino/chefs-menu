import AsyncStorage from '@react-native-async-storage/async-storage';

export function sairApp(fnCallBack = () => { }) {
  try {
    AsyncStorage.multiRemove([
      "chefsMenu@accessToken",
      "chefsMenu@email",
      "chefsMenu@password",
      "chefsMenu@usuario",
      "chefsMenu@salvarUsuario",
    ], fnCallBack);
  } catch (error) {
    console.log("Erro para limpar storage ao sair do app", error);
  }
}

export const handleSetAsyncStorage = async (accessToken, usuario, email, senha) => {
  await AsyncStorage.setItem("chefsMenu@accessToken", accessToken);
  await AsyncStorage.setItem("chefsMenu@usuario", JSON.stringify(usuario));
  await AsyncStorage.setItem("chefsMenu@email", email);
  await AsyncStorage.setItem("chefsMenu@password", senha);
};

export const handleGetAsyncStorage = async () => {
  const accessToken = await AsyncStorage.getItem('chefsMenu@accessToken');
  const dadosUsuario = await AsyncStorage.getItem('chefsMenu@usuario');
  const emailStorage = await AsyncStorage.getItem('chefsMenu@email');
  const senhaStorage = await AsyncStorage.getItem('chefsMenu@password');
  const validaUsuario = await AsyncStorage.getItem('chefsMenu@salvarUsuario');
  const listaDePedidosStorage = await AsyncStorage.getItem('chefsMenu@listaDePedidos');

  return {
    accessToken,
    dadosUsuario,
    emailStorage,
    senhaStorage,
    validaUsuario,
    listaDePedidosStorage
  };
};
