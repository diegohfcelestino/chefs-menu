import { Center, FlatList, HStack, Icon, Text, View, VStack } from "native-base";
import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SemImagem from '../assets/img/sem-imagem.png';
import theme from "../assets/theme";
import { Background } from "../components/background/Background";
import { FooterMenu } from "../components/footerMenu/FooterMenu";
import { Image } from "../components/image/image";
import { useAppContext } from "../context/AppContext";

export const Pedidos = ({ route }) => {
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
    buscarListaPedidos,
    removerPedido
  } = useAppContext();

  async function remover(item) {
    await removerPedido(item);

  }

  useEffect(() => {
    buscarListaPedidos();
  }, []);



  return (
    <View flex={1}>
      <View w="100%" flex={1} pb={2}>
        <Background opacity={0.4} />
        <HStack w="100%" bgColor={theme.overlayColor} h={32} flex={1} justifyContent="space-between" position="absolute" alignItems="center" top={0} >
          <VStack mr={6} flex={1} alignItems="center">
            <Text fontSize={52} ml="15%" fontWeight="bold" color={theme.orange}>
              Chef's Menu
            </Text>
            <Text color={theme.whiteLight} fontSize={20} fontWeight="bold">
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

          <FlatList removeClippedSubviews={true} my={32} keyExtractor={item => item.id} flex={1} data={listaPedidos}
            ListEmptyComponent={() =>
              <Center w="full" bgColor={theme.overlayColor} py={4} px={1} mt={32} rounded="xl">
                <Text textAlign="center" fontSize={24} fontWeight="bold" color={theme.whiteLight}>Não há nenhum item cadastrado neste restaurante!</Text>
              </Center>
            }
            renderItem={({ item }) =>
              <VStack flex={1} rounded="lg" pb={2} bgColor={theme.whiteLight} my={2} mx={2} shadow={3}>

                <Image resizeMode="cover" w="full" h={24} source={item.background ? { uri: item.background } : SemImagem} rounded="lg" alt="Imagem do item" />
                <HStack alignItems="flex-end">
                  <VStack flex={1} px={4} >
                    <View alignItems="flex-start" pt={1} >
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
              </VStack>
            } />



        }

        <FooterMenu color={route?.name} />
      </View>
    </View>
  );
};