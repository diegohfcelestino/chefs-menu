import { Center, FlatList, HStack, Icon, Text, View, VStack } from "native-base";
import React, { useEffect } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SemImagem from '../assets/img/sem-imagem.png';
import theme from "../assets/theme";
import { Background } from "../components/background/Background";
import { FooterMenu } from "../components/footerMenu/FooterMenu";
import { Image } from "../components/image/image";
import { useAppContext } from "../context/AppContext";
import CryptoJS from 'crypto-js';

export const Pedidos = ({ route }) => {
  const {
    navigation,
    loading,
    formUsuario,
    listaPedidos,
    buscarListaPedidos,
    removerPedido
  } = useAppContext();

  async function remover(item) {
    await removerPedido(item);

  }

  const somaTotalValores = listaPedidos?.map(item => parseFloat(item.value)).reduce((prev, curr) => prev + curr, 0);

  useEffect(() => {
    buscarListaPedidos();
  }, []);

  return (
    <View flex={1}>
      <View w="100%" flex={1}>
        <Background opacity={0.4} />
        <HStack w="100%" bgColor={theme.overlayColor} h={32} flex={1} justifyContent="space-between" position="absolute" alignItems="center" top={0} >
          <VStack flex={1} alignItems="center">
            <Text fontSize={36} fontWeight="bold" color={theme.orange}>
              Chef's Menu
            </Text>
            <Text color={theme.whiteLight} fontSize={10} fontWeight="bold">
              {`Olá ${formUsuario?.nome ? formUsuario?.nome : ""}, por aqui você vê seus pedidos.`}
            </Text>
            <HStack justifyContent="flex-end" alignItems="center" pt={2}>
              <Text fontSize={14} color={theme.whiteLight}>Valor Total do pedido: </Text>
              <Text fontSize={16} color={theme.orange}>{`R$ ${somaTotalValores ? somaTotalValores?.toFixed(2).split(".").join(",") : "0,00"}`}</Text>
            </HStack>
          </VStack>
        </HStack>

        {loading ?
          <View mt={48} justifyContent="center">
            <ActivityIndicator size={70} color={theme.whiteLight} />
            <Text textAlign="center" fontSize={32} color={theme.whiteLight}>aguarde...</Text>
          </View>
          :

          <FlatList removeClippedSubviews={true} mt={32} mb={16} keyExtractor={item => item.id} flex={1} data={listaPedidos}
            ListEmptyComponent={() =>
              <Center w="full" bgColor={theme.overlayColor} py={4} px={1} mt={32} rounded="xl">
                <Text textAlign="center" fontSize={24} fontWeight="bold" color={theme.whiteLight}>Não há nenhum item cadastrado neste restaurante!</Text>
              </Center>
            }
            renderItem={({ item }) =>
              <VStack flex={1} rounded="lg" pb={2} bgColor={theme.whiteLight} my={2} mx={2} shadow={3}>
                <TouchableOpacity onPress={() => navigation.navigate("CardapioDetalhe", item)}>
                  <Image resizeMode="cover" w="full" h={24} source={item.background ? { uri: item.background } : SemImagem} rounded="lg" alt="Imagem do item" />
                  <HStack alignItems="flex-end">
                    <VStack flex={1} px={4} >
                      <View alignItems="flex-start" pt={1} >
                        <Text fontSize={20} fontWeight="bold" color={theme.orange}>{item?.nameRestaurant}</Text>
                        <Text fontSize={16} fontWeight="bold" color={theme.darkColor}>{item?.name}</Text>
                        <Text fontSize={12} fontWeight="bold" ellipsizeMode="tail" numberOfLines={2} color={theme.darkColor}>{item?.description}</Text>
                        <Text fontSize={14} fontWeight="bold" color={theme.orange}>{`R$ ${item?.value}`}</Text>
                      </View>

                    </VStack>
                    <Icon
                      as={<FontAwesome name="remove" />}
                      size={10}
                      mr={4}
                      mb={2}
                      color={theme.dangerColor}
                      onPress={() => remover(item)}
                    />
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