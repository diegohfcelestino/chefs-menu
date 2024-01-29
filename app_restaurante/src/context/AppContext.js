import { useNavigation } from "@react-navigation/native";
import { HStack, Icon, Text, VStack, View } from "native-base";
import React, {
  createContext, useContext,
  useEffect,
  useState
} from "react";
import { Alert, TouchableOpacity } from "react-native";
import theme from "../assets/theme";
import { handleGetAsyncStorage, sairApp } from "../services/storage";
import { IconHome, IconPerson, IconSignOut } from "../utils/icons";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { RFValue } from "react-native-responsive-fontsize";

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
  const [salvarUsuario, setSalvarUsuario] = useState(false);
  const [showConfirmaSenha, setShowConfirmaSenha] = useState(false);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [listaRestaurantes, setListaRestaurantes] = useState([]);
  const [colorDrawer, setColorDrawer] = useState('');

  const listaMenu = [
    {
      id: 1,
      nome: "Restaurantes",
      icon: "home",
      route: "Restaurantes"
    },
    {
      id: 2,
      nome: "Pesquisar",
      icon: "search",
      route: "Pesquisar"
    },
    {
      id: 3,
      nome: "Pedidos",
      icon: "shopping-cart-checkout",
      route: "Pedidos"
    },
    {
      id: 4,
      nome: "Perfil",
      icon: "person",
      route: "Perfil"
    },
  ];

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
          setFormUsuario(initialFormUsuario),
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
      <VStack flex={1} justifyContent="space-between" pb={24} bgColor={theme.overlayColor} alignItems="center" >
        <View>
          {listaMenu.map((item, index) => (
            <TouchableOpacity key={index} style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }} onPress={() => { setColorDrawer(index); navigation.navigate(item.route); setOpenDrawer(false); }} >
              <Icon
                as={<MaterialIcons name={item.icon} />}
                size={12}
                color={colorDrawer === index ? theme.orange : theme.whiteLight}
                mx={4}
              />

              <Text color={colorDrawer === index ? theme.orange : theme.whiteLight} fontSize={RFValue(14)} fontWeight="bold">{item.nome}</Text>
            </TouchableOpacity>
          ))}

        </View>
        <TouchableOpacity onPress={() => sairDoAplicativo()} style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon
            as={<FontAwesome name="sign-out" />}
            size={12}
            color={theme.dangerColor}
            mx={4}
          />
          <Text color={theme.whiteLight} fontSize={RFValue(16)} fontWeight="bold">Sair</Text>
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
    initialFormUsuario,
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
    handleGoBack,
    salvarUsuario, setSalvarUsuario,
    listaRestaurantes,
    setListaRestaurantes,
    colorDrawer, setColorDrawer, sairDoAplicativo
  };



  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}