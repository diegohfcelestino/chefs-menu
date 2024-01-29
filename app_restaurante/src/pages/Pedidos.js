import { Center, FlatList, HStack, Icon, SectionList, Text, VStack, View } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Keyboard, Linking, Pressable, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Pedidos = ({ route }) => {
  console.log("routes", route);
  const {
    navigation,
    loading,
    formUsuario,
    setLoading,
    openDrawer,
    drawerView,
    setColorDrawer,
    listaPedidos,
    setListaPedidos,
    removerPedido
  } = useAppContext();

  let listaPedidosFormatada = listaPedidos?.length > 0 ? JSON.parse(listaPedidos) : [];
  async function buscarListaPedidos() {
    setListaPedidos(await AsyncStorage.getItem(`chefsMenu@listaDePedidos`) || "[]");
    setLoading(false);
  };

  async function remover(item) {
    await removerPedido(item);
    buscarListaPedidos();
  }

  useEffect(() => {
    buscarListaPedidos();
  }, []);

  console.log("lista de pedidos", listaPedidos);


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
          <View mt={48} justifyContent="center">
            <ActivityIndicator size={70} color={theme.whiteLight} />
            <Text textAlign="center" fontSize={32} color={theme.whiteLight}>aguarde...</Text>
          </View>
          :

          <FlatList removeClippedSubviews={true} my={32} keyExtractor={item => item.id} flex={1} data={listaPedidosFormatada}
            ListEmptyComponent={() =>
              <Center w="full" bgColor={theme.overlayColor} py={4} px={1} mt={32} rounded="xl">
                <Text textAlign="center" fontSize={RFValue(20)} fontWeight="bold" color={theme.whiteLight}>Não há nenhum item cadastrado neste restaurante!</Text>
              </Center>
            }
            renderItem={({ item }) =>
              <VStack flex={1} rounded="lg" pb={2} bgColor={theme.whiteLight} my={2} mx={2} shadow={3}>

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
                    as={<FontAwesome name="remove" />}
                    size={10}
                    mr={4}
                    mb={2}
                    color={theme.dangerColor}
                    onPress={() => remover()}
                  />
                </HStack>
              </VStack>
            } />



        }

        <FooterMenu color={route?.name} />
      </View>
    </View>
  );
};