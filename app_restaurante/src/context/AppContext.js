import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Icon, Text, View, VStack } from "native-base";
import React, {
  createContext, useContext,
  useEffect,
  useState
} from "react";
import { Alert, TouchableOpacity } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from "../assets/theme";
import { infoMessage, successMessage } from "../components/toast/Toast";
import { handleGetAsyncStorage, sairApp } from "../services/storage";

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
  const [listaPedidos, setListaPedidos] = useState([]);

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

  function drawerView() {
    return (
      <VStack flex={1} justifyContent="space-between" pb={24} bgColor={theme.overlayColor} alignItems="center" >
        <View>
          {listaMenu.map((item, index) => (
            <TouchableOpacity key={index} style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }} onPress={() => { setColorDrawer(index); navigation.navigate(item.route); setOpenDrawer(false); }} >
              <Icon
                as={<MaterialIcons name={item.icon} />}
                size={10}
                color={colorDrawer === index ? theme.orange : theme.whiteLight}
                mx={4}
              />

              <Text color={colorDrawer === index ? theme.orange : theme.whiteLight} fontSize={16} fontWeight="bold">{item.nome}</Text>
            </TouchableOpacity>
          ))}

        </View>
        <TouchableOpacity onPress={() => sairDoAplicativo()} style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon
            as={<FontAwesome name="sign-out" />}
            size={10}
            color={theme.dangerColor}
            mx={4}
          />
          <Text color={theme.whiteLight} fontSize={20} fontWeight="bold">Sair</Text>
        </TouchableOpacity>
      </VStack>
    );
  };

  function handleGoBack() {
    navigation.goBack();
  }

  async function buscarListaPedidos() {
    setLoading(true);
    try {
      const { listaDePedidosStorage } = await handleGetAsyncStorage();
      if (listaDePedidosStorage !== null) {
        setListaPedidos(JSON.parse(listaDePedidosStorage));
        setLoading(false);

      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log("erro ao pegar dados do pedido no storage", error);
      setLoading(false);
    }
  };

  function adicionarPedido(item) {
    Alert.alert('Olá', `Deseja adicionar este item no pedido?`, [
      {
        text: 'Sim',
        onPress: () => {
          adicionarPedidoNoStorage(item);
        }
      },
      {
        text: 'Não',
        style: 'cancel'
      },
    ]);
  }

  async function adicionarPedidoNoStorage(pedido) {
    let newList = listaPedidos;
    const listaFiltrada = listaPedidos?.filter(item => item?.id === pedido?.id);
    if (listaFiltrada.length === 0) {
      newList.push(pedido);
      setListaPedidos(newList);
      AsyncStorage.setItem(`chefsMenu@listaDePedidos`, JSON.stringify(newList));
      successMessage("Item adicionado ao pedido");
    } else {
      infoMessage("Este item já foi selecionado");
    }
  }

  function removerPedido(item) {
    Alert.alert('Olá', `Deseja remover este item no pedido?`, [
      {
        text: 'Sim',
        onPress: () => {
          removerPedidosNoStorage(item);
        }
      },
      {
        text: 'Não',
        style: 'cancel'
      },
    ]);
  }

  async function removerPedidosNoStorage(pedido) {
    const listaFiltrada = listaPedidos.filter(item => item?.id !== pedido?.id);
    setListaPedidos(listaFiltrada);
    AsyncStorage.setItem(`chefsMenu@listaDePedidos`, JSON.stringify(listaFiltrada));
    successMessage("Item removido com sucesso");
    buscarListaPedidos();
  };


  useEffect(() => {
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
    openDrawer,
    setOpenDrawer,
    drawerView,
    handleGoBack,
    salvarUsuario, setSalvarUsuario,
    listaRestaurantes,
    setListaRestaurantes,
    colorDrawer, setColorDrawer, sairDoAplicativo,
    buscarListaPedidos,
    listaPedidos,
    adicionarPedido,
    removerPedido,
    removerPedidosNoStorage,
    setListaPedidos
  };



  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}