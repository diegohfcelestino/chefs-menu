import React from "react";
import { Center, HStack, Icon, Text, VStack, View } from "native-base";
import { IconHome } from "../../utils/icons";
import theme from "../../assets/theme";
import { RFValue } from "react-native-responsive-fontsize";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const listaMenu = [
  {
    id: 1,
    nome: "Inicio",
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

export const FooterMenu = ({ color }) => {
  const navigation = useNavigation();
  return (
    <HStack w="100%" bgColor={theme.overlayColor} h={16} flex={1} justifyContent="space-between" position="absolute" alignItems="center" bottom={0} >
      {listaMenu.map((item, index) => (
        <VStack flex={1} key={index} >
          <TouchableOpacity style={{ alignItems: "center", marginHorizontal: 12 }} onPress={() => navigation.navigate(item.route)} >
            <Icon
              as={<MaterialIcons name={item.icon} />}
              size={9}
              color={color === item.route ? theme.orange : theme.whiteLight}
            />
            <Text color={color === item.route ? theme.orange : theme.whiteLight} fontSize={RFValue(12)}>{item.nome}</Text>
          </TouchableOpacity>
        </VStack>
      ))}
    </HStack>
  );
};