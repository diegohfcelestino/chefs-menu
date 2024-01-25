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
const Stack = createNativeStackNavigator();

const Routes = () => {
  const { openDrawer, setOpenDrawer } = useAppContext();

  return (

    <Stack.Navigator
      initialRouteName={"Home"}
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: theme.darkColor,
        headerTitleStyle: { fontSize: RFValue(20), fontWeight: 'bold' },
        headerStyle: { backgroundColor: theme.lightColor },
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

      {/* <Stack.Screen
        name="Login"
        component={Login}
        options={({ navigation }) => ({
          headerTitle: "Login",
          headerTitleStyle: { flex: 1, fontSize: RFValue(20), fontWeight: 'bold' },
          animationTypeForReplace: 'push',
          headerBackVisible: false,
          headerBackTitleVisible: false,
          headerRight: () => (
            openDrawer ?
              <IconCloseMenu size={30} style={{ padding: 10 }} onPress={() => {
                setOpenDrawer(!openDrawer);
              }} color={theme.blue} /> :
              <IconOpenMenu size={30} style={{ padding: 10 }} onPress={() => {
                setOpenDrawer(!openDrawer);
              }} color={theme.blue} />
          )
        })}
      /> */}
    </Stack.Navigator>
  );

};

export { Routes };
