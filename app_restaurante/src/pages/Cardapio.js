import { Center, HStack, Icon, SectionList, Text, VStack, View } from "native-base";
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

export const Cardapio = ({ route }) => {
  console.log("routes", route);
  const {
    navigation,
    loading,
    setLoading,
    openDrawer,
    drawerView,
    setColorDrawer
  } = useAppContext();
  const [dadosRestaurante, setDadosRestaurante] = useState('');
  const [listaCardapio, setListaCardapio] = useState([]);
  const [novaLista, setNovaLista] = useState([]);
  const [color, setColor] = useState('');

  function buscarCardapiosPorIdRestaurante() {
    setLoading(true);

    handleGetWithParams("menu/idRestaurant/", route?.params?._id).then((response) => {
      console.log("Retorno do restaurante id", response);
      if (response.data) {
        setListaCardapio(response.data.result);
        setNovaLista(response.data.result);
        setColor("Todos");
        setLoading(false);
      } else {
        errorMessage("Não retornou nenhum dado!");
        setListaCardapio([]);
        setNovaLista([]);
        setLoading(false);
      }
    }).catch((error) => {
      infoMessage(error ? error : "Tempo limite excedido");
      setListaCardapio([]);
      setNovaLista([]);
      console.log("Pesquisa", error);
      setLoading(false);
    }).finally(() => setLoading(false));
  }

  function filtrarLista(filter) {
    if (filter) {
      let listaFiltrada = listaCardapio.filter(item => item.title === filter);
      setNovaLista(listaFiltrada);
      setColor(filter);
    } else {
      setNovaLista(listaCardapio);
      setColor("Todos");
    }
  }



  useEffect(() => {
    setDadosRestaurante(route?.params);
    buscarCardapiosPorIdRestaurante();
    setColorDrawer('');
  }, []);

  return (
    <View flex={1}>
      <Drawer open={openDrawer} drawerContent={drawerView()}>
        <View w="100%" flex={1} pb={2}>
          <Background opacity={0.4} />
          <VStack rounded="lg" pb={2} bgColor={theme.whiteLight} my={2} mx={2} shadow={3}>
            <HStack mx={4}>
              <Center justifyContent="space-evenly">
                <Image size={20} source={{ uri: dadosRestaurante?.avatar }} rounded="full" alt="Imagem do avatar" />
                <VStack alignItems="center">
                  <Icon
                    as={<MaterialIcons name="star" />}
                    size={8}
                    color={theme.orange}
                  />
                  <Text fontSize={RFValue(10)} fontWeight="bold" textAlign='center' color={theme.orange}>{dadosRestaurante?.score}</Text>
                </VStack>
              </Center>
              <VStack flex={1} pl={4}>
                <View alignItems="flex-start" pt={1} >
                  <Text fontSize={RFValue(16)} fontWeight="bold" color={theme.darkColor}>{`Restaurante: ${dadosRestaurante?.name}`}</Text>
                  <Text fontSize={RFValue(10)} fontWeight="bold" ellipsizeMode="tail" numberOfLines={2} color={theme.darkColor}>{dadosRestaurante?.slogan}</Text>
                  <HStack alignItems="center">
                    <Icon
                      as={<MaterialIcons name="phone" />}
                      size={7}
                      mr={1}
                      color={theme.orange}
                      onPress={() => Linking.openURL(`tel:${dadosRestaurante?.telephone}`)}
                    />
                    <Text fontSize={RFValue(10)} fontWeight="bold" textAlign='center' color={theme.darkColor}>{dadosRestaurante?.telephone}</Text>
                    <Icon
                      as={<MaterialCommunityIcons name="whatsapp" />}
                      size={7}
                      ml={6}
                      mr={1}
                      color={theme.successColor}
                      onPress={() =>
                        Linking.openURL(
                          `whatsapp://send?text=&phone=+55${dadosRestaurante?.telephone}`,
                        )
                      }
                    />
                    <Text fontSize={RFValue(10)} fontWeight="bold" textAlign='center' color={theme.darkColor}>{dadosRestaurante?.telephone}</Text>
                  </HStack>
                  <HStack alignItems="center" pr={6}>
                    <Icon
                      as={<MaterialIcons name="location-pin" />}
                      size={7}
                      mr={1}
                      color={theme.orange}
                    />
                    <Text fontSize={RFValue(10)} fontWeight="bold" ellipsizeMode="tail" numberOfLines={2} textAlign='left' color={theme.darkColor}>{dadosRestaurante?.address}</Text>
                  </HStack>
                </View>
                <HStack>

                  <HStack alignItems="center">
                    <Icon
                      as={<MaterialIcons name="access-time" />}
                      size={7}
                      mr={1}
                      color={theme.orange}
                    />
                    <Text fontSize={RFValue(10)} fontWeight="bold" textAlign='center' color={theme.darkColor}>{dadosRestaurante?.deliveryTime}</Text>
                  </HStack>
                  <HStack alignItems="center">
                    <Icon
                      as={<MaterialIcons name="confirmation-number" />}
                      size={7}
                      ml={6}
                      mr={1}
                      color={theme.orange}
                    />
                    <Text fontSize={RFValue(10)} fontWeight="bold" textAlign='center' color={theme.darkColor}>{`R$ ${dadosRestaurante?.deliveryValue}`}</Text>
                  </HStack>
                  <HStack alignItems="center">
                    <Icon
                      as={<MaterialIcons name="verified" />}
                      size={7}
                      ml={6}
                      mr={1}
                      color={theme.successColor}
                    />
                    <Text fontSize={RFValue(10)} fontWeight="bold" textAlign='center' color={theme.darkColor}>Verificado</Text>
                  </HStack>
                </HStack>
              </VStack>
            </HStack>

          </VStack>

          {listaCardapio.length > 0 &&
            <HStack mx={6} justifyContent="space-around" my={4}>
              <TouchableOpacity onPress={() => filtrarLista()}>
                <Text fontWeight="bold" fontSize={RFValue(14)} color={color === "Todos" ? theme.orange : theme.whiteLight}>Todos</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => filtrarLista("Pratos")}>
                <Text fontWeight="bold" fontSize={RFValue(14)} color={color === "Pratos" ? theme.orange : theme.whiteLight}>Pratos</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => filtrarLista("Bebidas")}>
                <Text fontWeight="bold" fontSize={RFValue(14)} color={color === "Bebidas" ? theme.orange : theme.whiteLight}>Bebidas</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => filtrarLista("Sobremesas")}>
                <Text fontWeight="bold" fontSize={RFValue(14)} color={color === "Sobremesas" ? theme.orange : theme.whiteLight}>Sobremesas</Text>
              </TouchableOpacity>
            </HStack>
          }

          {loading ?
            <View mt={20} justifyContent="center">
              <ActivityIndicator size={70} color={theme.whiteLight} />
              <Text textAlign="center" fontSize={32} color={theme.whiteLight}>aguarde...</Text>
            </View>
            :

            <SectionList
              removeClippedSubviews={true}
              contentContainerStyle={{ paddingHorizontal: 6 }}
              stickySectionHeadersEnabled={false}
              sections={novaLista}
              initialNumToRender={10}
              ListEmptyComponent={() =>
                <Center w="full" bgColor={theme.overlayColor} py={4} px={1} mt={10} rounded="xl">
                  <Text textAlign="center" fontSize={RFValue(20)} fontWeight="bold" color={theme.whiteLight}>Não há nenhum item cadastrado neste restaurante!</Text>
                </Center>
              }
              // renderSectionHeader={({ section }) => (
              //   <Text textAlign="center" fontWeight="bold" fontSize={RFValue(16)} color={theme.orange}>{section.title}</Text>
              // )}
              renderItem={({ item, section }) =>
                <VStack flex={1} rounded="lg" pb={2} bgColor={theme.whiteLight} my={2} mx={2} shadow={3} >
                  <TouchableOpacity onPress={() => navigation.navigate("CardapioDetalhe", { item, dadosRestaurante })}>
                    <Image resizeMode="cover" w="full" h={24} source={{ uri: item.background }} rounded="lg" alt="Imagem do item" />
                    <HStack alignItems="flex-end">
                      <VStack flex={1} px={4} >
                        <View alignItems="flex-start" pt={1} >
                          <Text fontSize={RFValue(12)} fontWeight="bold" color={theme.darkColor}>{item?.name}</Text>
                          <Text fontSize={RFValue(8)} fontWeight="bold" ellipsizeMode="tail" numberOfLines={2} color={theme.darkColor}>{item?.description}</Text>
                          <Text fontSize={RFValue(12)} fontWeight="bold" color={theme.orange}>{`R$ ${item?.value}`}</Text>
                        </View>

                      </VStack>
                      <Icon
                        as={<MaterialIcons name="add-circle" />}
                        size={10}
                        mr={4}
                        mb={2}
                        color={theme.successColor}
                        onPress={() => console.log("Adiconar item", item)}
                      />
                    </HStack>
                  </TouchableOpacity>
                </VStack>
              }
            />

          }


        </View>
      </Drawer>
    </View>
  );
};