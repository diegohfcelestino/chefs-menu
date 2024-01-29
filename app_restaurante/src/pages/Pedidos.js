import { Center, FlatList, HStack, Icon, SectionList, Text, VStack, View } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Keyboard, Linking, Pressable, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from "../assets/theme";
import { Background } from "../components/background/Background";
import { FooterMenu } from "../components/footerMenu/FooterMenu";
import { Image } from "../components/image/image";
import { Input } from "../components/input/Input";
import { errorMessage, infoMessage } from "../components/toast/Toast";
import { useAppContext } from "../context/AppContext";
import { handleGetWithParams } from "../services/service";
import { Drawer } from "../components/drawer/Drawer";
import { handleGetAsyncStorage } from "../services/storage";

export const Pedidos = ({ route }) => {
  console.log("routes", route);
  const {
    navigation,
    loading,
    formUsuario,
    setLoading,
    openDrawer,
    drawerView,
    setColorDrawer
  } = useAppContext();
  const [listaPedidos, setListaPedidos] = useState([]);

  async function buscarListaFavoritos() {
    try {
      const { listaDePedidosStorage } = await handleGetAsyncStorage();
      if (listaDePedidosStorage !== null) {
        setListaPedidos(listaDePedidosStorage);
        setLoading(false);
      } else {
        setLoading(false);
        console.log("não tem pedido no storage");
      }
    } catch (error) {
      console.log("erro ao pegar dados do pedido no storage", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarListaFavoritos();
  }, []);


  return (
    <View flex={1}>
      <View w="100%" flex={1} pb={2}>
        <Background opacity={0.4} />
        <HStack w="100%" bgColor={theme.overlayColor} h={32} flex={1} justifyContent="space-between" position="absolute" alignItems="center" top={0} >
          <VStack mr={6} flex={1} alignItems="center">
            <Text fontSize={RFValue(40)} ml="15%" fontWeight="bold" color={theme.orange}>
              Chef's Menu
            </Text>
            <Text color={theme.whiteLight} fontSize={RFValue(14)} fontWeight="bold">
              {`Olá ${formUsuario?.nome ? formUsuario?.nome : ""}, por aqui você vê seus pedidos.`}
            </Text>
          </VStack>
        </HStack>

        {loading ?
          <View mt={20} justifyContent="center">
            <ActivityIndicator size={70} color={theme.whiteLight} />
            <Text textAlign="center" fontSize={32} color={theme.whiteLight}>aguarde...</Text>
          </View>
          :

          <FlatList removeClippedSubviews={true} my={16} keyExtractor={item => item._id} flex={1} data={listaPedidos}
            ListEmptyComponent={() =>
              <Center w="full" bgColor={theme.overlayColor} py={4} px={1} mt={32} rounded="xl">
                <Text textAlign="center" fontSize={RFValue(20)} fontWeight="bold" color={theme.whiteLight}>Não há nenhum item cadastrado neste restaurante!</Text>
              </Center>
            }
            renderItem={({ item }) =>
              <VStack flex={1} rounded="lg" pb={2} bgColor={theme.whiteLight} my={2} mx={2} shadow={3}>
                <TouchableOpacity onPress={() => navigation.navigate("Cardapio", item)}>
                  <Image w="full" h={32} source={{ uri: item.background }} rounded="lg" alt="Imagem de fundo do restaurante" />
                  <HStack mx={4}>
                    <Image mt={-4} size={20} source={{ uri: item.avatar }} rounded="full" alt="Imagem do avatar" />
                    <VStack flex={1} pl={4}>
                      <View alignItems="flex-start" pt={1} >
                        <Text fontSize={20} fontWeight="bold" color={theme.darkColor}>{item?.name}</Text>
                        <Text fontSize={14} fontWeight="bold" ellipsizeMode="tail" numberOfLines={2} color={theme.darkColor}>{item?.slogan}</Text>
                      </View>
                      <HStack>
                        <HStack alignItems="center">
                          <Icon
                            as={<MaterialIcons name="star" />}
                            size={7}
                            color={theme.orange}
                            mr={1}
                          />
                          <Text fontSize={14} fontWeight="bold" textAlign='center' color={theme.darkColor}>{item?.score}</Text>
                        </HStack>
                        <HStack alignItems="center">
                          <Icon
                            as={<MaterialIcons name="access-time" />}
                            size={7}
                            ml={6}
                            mr={1}
                            color={theme.orange}
                          />
                          <Text fontSize={14} fontWeight="bold" textAlign='center' color={theme.darkColor}>{item?.deliveryTime}</Text>
                        </HStack>
                        <HStack alignItems="center">
                          <Icon
                            as={<MaterialIcons name="confirmation-number" />}
                            size={7}
                            ml={6}
                            mr={1}
                            color={theme.orange}
                          />
                          <Text fontSize={14} fontWeight="bold" textAlign='center' color={theme.darkColor}>{`R$ ${item?.deliveryValue}`}</Text>
                        </HStack>
                      </HStack>
                    </VStack>
                  </HStack>
                </TouchableOpacity>
              </VStack>
            } />



        }

        <FooterMenu color={route?.name} />
      </View>
    </View>
  );
};