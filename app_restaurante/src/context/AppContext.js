import { useNavigation } from "@react-navigation/native";
import { Text, VStack } from "native-base";
import React, {
  createContext, useContext,
  useEffect,
  useState
} from "react";
import { Alert, TouchableOpacity } from "react-native";
import theme from "../assets/theme";
import { handleGetAsyncStorage, sairApp } from "../services/storage";
import { IconHome, IconPerson, IconSignOut } from "../utils/icons";

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const initialFormUsuario = {
    nome: "",
    nomeUsuario: "",
    usuario: "",
    senha: "",
    confirmaSenha: "",
    avatar: "",
    background: "",
  };
  const navigation = useNavigation();
  const [formUsuario, setFormUsuario] = useState(initialFormUsuario);
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmaSenha, setShowConfirmaSenha] = useState(false);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  async function getUserStorage() {
    console.log("Passando pelo getUser ");
    try {
      const { emailStorage, senhaStorage } = await handleGetAsyncStorage();
      if (emailStorage !== null && senhaStorage !== null) {
        setFormUsuario({ ...formUsuario, usuario: emailStorage, senha: senhaStorage });
      }
    } catch (error) {
      console.log("erro ao pegar dados do usuário no storage", error);
    }
  }

  function sairDoAplicativo() {
    Alert.alert('Atenção', `Deseja realmente sair do aplicativo?`, [
      {
        text: 'Sim',
        onPress: () => {
          sairApp(),
            setOpenDrawer(false);
          setFormUsuario(''),
            navigation.navigate('Login');
        }
      },
      {
        text: 'Não',
        style: 'cancel'
      },
    ]);
  }

  async function checkAccount() {
    console.log("Chamou o checkAccount");
    try {
      console.log("entrou no try");
      const { dataExpiraStorage } = await handleGetAsyncStorage();
      if (dataExpiraStorage !== null) {
        console.log("entrou no if do  try");
        const dataString = JSON.parse(dataExpiraStorage);
        const data = dataString?.dataExpira;
        const dataAtual = new Date();
        const dataTempo = data?.replace(" ", "T") + "Z";
        const dataExpira = new Date(dataTempo);

        dataExpira.setHours(dataExpira.getHours() - 1);

        const isAuthenticated = dataExpira > dataAtual ? true : false;
        console.log("Resposta da data do storage no useEffect", dataExpira);
        console.log("Resposta da dataAtual do storage no useEffect", dataAtual);
        if (!isAuthenticated) {
          console.log("sair do app");
          sairApp();
        } else {
          console.log("buscar usuário no storage");
          getUserStorage();
        }
      }
    } catch (error) {
      console.log("erro ao pegar data expira do storage do useEffect", error);
    }
  }

  function drawerView() {
    return (
      <VStack flex={1} justifyContent="flex-start" py={10} bgColor={theme.lightColor} alignItems="flex-start" >
        <TouchableOpacity onPress={() => { navigation.navigate('Home'); setOpenDrawer(false); }} style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}>
          <IconHome style={{ marginHorizontal: 10 }} size={40} />
          <Text fontSize={20} fontWeight="bold">Home</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => { navigation.navigate('Usuario'); setOpenDrawer(false); }} style={{ flexDirection: "row", alignItems: "center", marginTop: 50 }}>
          <IconPerson style={{ marginHorizontal: 10 }} size={30} />
          <Text fontSize={20} fontWeight="bold">Trocar Empresa</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => sairDoAplicativo()} style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}>
          <IconSignOut style={{ marginHorizontal: 10 }} size={40} />
          <Text fontSize={20} fontWeight="bold">Sair</Text>
        </TouchableOpacity>
      </VStack>
    );
  };

  function handleGoBack() {
    navigation.goBack();
  }


  useEffect(() => {
    console.log("usando o context");
    setFormUsuario(initialFormUsuario);
  }, []);



  const value = {
    navigation,
    formUsuario,
    setFormUsuario,
    showSenha,
    showConfirmaSenha,
    setShowConfirmaSenha,
    setShowSenha,
    erro,
    setErro,
    loading,
    setLoading,
    getUserStorage,
    checkAccount,
    openDrawer,
    setOpenDrawer,
    drawerView,
    handleGoBack
  };



  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}