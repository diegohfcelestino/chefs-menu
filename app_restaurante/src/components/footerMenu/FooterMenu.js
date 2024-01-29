import { useNavigation } from "@react-navigation/native";
import { HStack, Icon, Text, VStack } from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from "../../assets/theme";

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

export const FooterMenu = ({ color }) => {
  const navigation = useNavigation();
  return (
    <HStack w="100%" bgColor={theme.overlayColor} h={16} flex={1} justifyContent="space-between" position="absolute" alignItems="center" bottom={0} >
      {listaMenu.map((item, index) => (
        <VStack flex={1} key={index} >
          <TouchableOpacity style={{ alignItems: "center", marginHorizontal: 12 }} onPress={() => navigation.navigate(item.route)} >
            <Icon
              as={<MaterialIcons name={item.icon} />}
              size={8}
              color={color === item.route ? theme.orange : theme.whiteLight}
            />
            <Text color={color === item.route ? theme.orange : theme.whiteLight} fontSize={14}>{item.nome}</Text>
          </TouchableOpacity>
        </VStack>
      ))}
    </HStack>
  );
};