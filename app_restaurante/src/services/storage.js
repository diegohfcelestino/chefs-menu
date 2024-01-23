import AsyncStorage from '@react-native-async-storage/async-storage';

export function sairApp(fnCallBack = () => { }) {
  try {
    console.log("limpando os dados");
    AsyncStorage.multiRemove([
      "chefsMenu@token",
      "chefsMenu@email",
      "chefsMenu@password",
      "chefsMenu@user",
      "chefsMenu@salvarUsuario",
    ], fnCallBack);
  } catch (error) {
    console.log("Erro ao limpar storage ao sair do app", error);
  }
}

export const handleSetAsyncStorage = async (token, email, senha, usuario) => {
  await AsyncStorage.setItem("chefsMenu@token", JSON.stringify(token));
  await AsyncStorage.setItem("chefsMenu@email", JSON.stringify(email));
  await AsyncStorage.setItem("chefsMenu@password", JSON.stringify(senha));
  await AsyncStorage.setItem("chefsMenu@user", JSON.stringify(usuario));
};

export const handleGetAsyncStorage = async () => {
  const token = await AsyncStorage.getItem('chefsMenu@token');
  const emailStorage = await AsyncStorage.getItem('chefsMenu@email');
  const senhaStorage = await AsyncStorage.getItem('chefsMenu@senha');
  const usuarioStorage = await AsyncStorage.getItem('chefsMenu@usuario');
  const validaUsuario = await AsyncStorage.getItem('chefsMenu@salvarUsuario');

  return {
    token,
    emailStorage,
    senhaStorage,
    usuarioStorage,
    validaUsuario
  };
};
