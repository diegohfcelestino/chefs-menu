import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HStack, Image, Text } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import theme from "../assets/theme";
import { useAppContext } from "../context/AppContext";
import { Home } from "../pages/home/Home";
import { Login } from "../pages/login/Login";
import { IconArrowLeft, IconCloseMenu, IconOpenMenu } from "../utils/icons";
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
        headerStyle: { backgroundColor: theme.primaryColor },
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
              }} color={theme.secondaryColor} /> :
              <IconOpenMenu size={30} style={{ padding: 10 }} onPress={() => {
                setOpenDrawer(!openDrawer);
              }} color={theme.secondaryColor} />
          )
        })}
      /> */}
    </Stack.Navigator>
  );

};

export { Routes };
