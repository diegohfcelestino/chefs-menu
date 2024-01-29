import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HStack, Image, Text } from "native-base";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import theme from "../assets/theme";
import { useAppContext } from "../context/AppContext";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { IconArrowLeft, IconCloseMenu, IconOpenMenu } from "../utils/icons";
import { Cadastro } from "../pages/Cadastro";
import { Restaurante, Restaurantes } from "../pages/Restaurantes";
import { Pesquisar } from "../pages/Pesquisar";
import { Perfil } from "../pages/Perfil";
import { Cardapio } from "../pages/Cardapio";
import { CardapioDetalhe } from "../pages/CardapioDetalhe";
import { Pedidos } from "../pages/Pedidos";
const Stack = createNativeStackNavigator();

const Routes = () => {
  const { openDrawer, setOpenDrawer } = useAppContext();

  return (

    <Stack.Navigator
      initialRouteName={"Home"}
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: theme.orange,
        headerTitleStyle: { fontSize: RFValue(20), fontWeight: 'bold' },
        headerStyle: { backgroundColor: theme.darkColor },
        headerTitleAlign: "center",
        headerBackTitle: "Voltar",
        headerBackTitleVisible: true,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          headerTitle: "Home",
          animationTypeForReplace: 'push',
          headerBackVisible: false,
          headerBackTitleVisible: false,

        }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          headerTitle: "Login",
          animationTypeForReplace: 'push',
          headerBackVisible: false,
          headerBackTitleVisible: false,

        }}
      />
      <Stack.Screen
        name="Cadastro"
        component={Cadastro}
        options={{
          headerShown: false,
          headerTitle: "Cadastro",
          animationTypeForReplace: 'push',
          headerBackVisible: false,
          headerBackTitleVisible: false,

        }}
      />
      <Stack.Screen
        name="Restaurantes"
        component={Restaurantes}
        options={{
          headerShown: false,
          headerTitle: "Restaurantes",
          animationTypeForReplace: 'push',
          headerBackVisible: false,
          headerBackTitleVisible: false,

        }}
      />
      <Stack.Screen
        name="Pesquisar"
        component={Pesquisar}
        options={{
          headerShown: false,
          headerTitle: "Pesquisar",
          animationTypeForReplace: 'push',
          headerBackVisible: false,
          headerBackTitleVisible: false,

        }}
      />
      <Stack.Screen
        name="Pedidos"
        component={Pedidos}
        options={{
          headerShown: false,
          headerTitle: "Pedidos",
          animationTypeForReplace: 'push',
          headerBackVisible: false,
          headerBackTitleVisible: false,

        }}
      />
      <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={{
          headerShown: false,
          headerTitle: "Perfil",
          animationTypeForReplace: 'push',
          headerBackVisible: false,
          headerBackTitleVisible: false,

        }}
      />
      <Stack.Screen
        name="Cardapio"
        component={Cardapio}
        options={({ navigation }) => ({
          headerTitle: "Cardapio",
          animationTypeForReplace: 'push',
          headerBackVisible: false,
          headerBackTitleVisible: false,
          headerLeft: () => (
            <IconArrowLeft size={25} style={{ padding: 10 }} onPress={() => navigation.goBack()} color={theme.whiteLight} />
          ),
          headerRight: () => (
            openDrawer ?
              <IconCloseMenu size={30} style={{ padding: 10 }} onPress={() => {
                setOpenDrawer(!openDrawer);
              }} color={theme.whiteLight} /> :
              <IconOpenMenu size={30} style={{ padding: 10 }} onPress={() => {
                setOpenDrawer(!openDrawer);
              }} color={theme.whiteLight} />
          )

        })}
      />
      <Stack.Screen
        name="CardapioDetalhe"
        component={CardapioDetalhe}
        options={({ navigation }) => ({
          headerTitle: "Detalhe do cardápio",
          animationTypeForReplace: 'push',
          headerBackVisible: false,
          headerBackTitleVisible: false,
          headerLeft: () => (
            <IconArrowLeft size={25} style={{ padding: 10 }} onPress={() => navigation.goBack()} color={theme.whiteLight} />
          ),
          headerRight: () => (
            openDrawer ?
              <IconCloseMenu size={30} style={{ padding: 10 }} onPress={() => {
                setOpenDrawer(!openDrawer);
              }} color={theme.whiteLight} /> :
              <IconOpenMenu size={30} style={{ padding: 10 }} onPress={() => {
                setOpenDrawer(!openDrawer);
              }} color={theme.whiteLight} />
          )

        })}
      />

    </Stack.Navigator>
  );

};

export { Routes };
