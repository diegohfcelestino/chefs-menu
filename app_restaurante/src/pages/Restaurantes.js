import { FlatList, HStack, Icon, Text, View, VStack } from "native-base";
import React, { useEffect } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from "../assets/theme";
import { Background } from "../components/background/Background";
import { FooterMenu } from "../components/footerMenu/FooterMenu";
import { Image } from "../components/image/image";
import { errorMessage, infoMessage } from "../components/toast/Toast";
import { useAppContext } from "../context/AppContext";
import { handleGetDefault } from "../services/service";
import SemImagem from '../assets/img/sem-imagem.png';

export const Restaurantes = ({ route }) => {

  const {
    navigation,
    formUsuario,
    loading,
    setLoading,
    listaRestaurantes,
    setListaRestaurantes,
  } = useAppContext();

  let listaLocal = [
    {
      "_id": "65b049469eb516867d4466c0",
      "name": "Rios de Sabor",
      "slogan": "Rios de Sabor: Uma Jornada Culinaría Nas Correntezas do Prazer!",
      "avatar": "https://images.unsplash.com/photo-1497644083578-611b798c60f3?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "background": "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "score": 4.8,
      "deliveryTime": "10m - 50m",
      "deliveryValue": "8,00",
      "telephone": "(16) 44444-4444",
      "address": "Rua: Segundo de Abril, 400 - Residencial Junior, Franca SP",
      "km": 3,
      "__v": 0
    },
    {
      "_id": "65b04e1a9eb516867d4466cf",
      "name": "Trattoria Bella Italia",
      "slogan": "Trattoria Bella Italia: Onde Cada Prato É Uma Canção de Amor à Cozinha Italiana.",
      "avatar": "https://images.unsplash.com/photo-1579926545913-448d525562db?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "background": "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "score": 4.8,
      "deliveryTime": "10m - 50m",
      "deliveryValue": "5,00",
      "telephone": "(16) 99999-9999",
      "address": "Rua: Nove de Setembro, 800 - Santa Mogiana, Franca SP",
      "km": 4,
      "__v": 0
    },
    {
      "_id": "65b048699eb516867d4466bd",
      "name": "Tropicanto Gastronomia",
      "slogan": "Tropicanto Gastronomia: Dança de Sabores Tropicais em Cada Prato!",
      "avatar": "https://images.unsplash.com/photo-1670130669519-ce0071d69228?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "background": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "score": 4.9,
      "deliveryTime": "10m - 50m",
      "deliveryValue": "6,00",
      "telephone": "(16) 33333-3333",
      "address": "Rua: Primeiro de Março, 300 - Jardim Pretopolis, Franca SP",
      "km": 5,
      "__v": 0
    },
    {
      "_id": "65b0471f9eb516867d4466b7",
      "name": "Sabores da Serra",
      "slogan": "Sabores da Serra: Uma Experiência Culinária nas Alturas da Gastronomia!",
      "avatar": "https://images.unsplash.com/photo-1508424757105-b6d5ad9329d0?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "background": "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "score": 5,
      "deliveryTime": "20m - 60m",
      "deliveryValue": "5,00",
      "telephone": "(16) 11111-1111",
      "address": "Rua: Primeiro de Janeiro, 100 - Centro, Franca SP",
      "km": 7,
      "__v": 0
    },
    {
      "_id": "65b04e969eb516867d4466d2",
      "name": "Imperatriz do Sabor Oriental",
      "slogan": "Imperatriz do Sabor Oriental: Descubra o Palácio de Sabores da China em Cada Prato.",
      "avatar": "https://images.unsplash.com/photo-1583475020831-fb4fbb497315?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "background": "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=1862&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "score": 4.9,
      "deliveryTime": "10m - 40m",
      "deliveryValue": "6,00",
      "telephone": "(16) 10100-1010",
      "address": "Rua: Dez de Dezembro, 1010 - Virginia, Franca SP",
      "km": 7,
      "__v": 0
    },
    {
      "_id": "65b049ac9eb516867d4466c3",
      "name": "Encanto dos Paladares",
      "slogan": "Encanto dos Paladares: Transformando Ingredientes em Magia para sua Mesa!",
      "avatar": "https://images.unsplash.com/photo-1505275350441-83dcda8eeef5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "background": "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "score": 5,
      "deliveryTime": "20m - 50m",
      "deliveryValue": "8,00",
      "telephone": "(16) 55555-5555",
      "address": "Rua: Segundo de Maio, 500 - Residencial Junior, Franca SP",
      "km": 8,
      "__v": 0
    },
    {
      "_id": "65b047e89eb516867d4466ba",
      "name": "Brisa Culinária",
      "slogan": "Brisa Culinária: Onde Cada Prato é uma Suave Brisa de Sabor!",
      "avatar": "https://images.unsplash.com/photo-1674061047052-b4d9acbf255e?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "background": "https://images.unsplash.com/photo-1493770348161-369560ae357d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "score": 4.5,
      "deliveryTime": "30m - 70m",
      "deliveryValue": "6,00",
      "telephone": "(16) 22222-2222",
      "address": "Rua: Primeiro de Fevereiro, 200 - Jardim Martins, Franca SP",
      "km": 10,
      "__v": 0
    },
    {
      "_id": "65b04a6b9eb516867d4466c6",
      "name": "Maravilhas à Mesa",
      "slogan": "Maravilhas à Mesa: Onde Cada Prato Revela um Mundo de Sabor!",
      "avatar": "https://images.unsplash.com/photo-1488992783499-418eb1f62d08?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "background": "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "score": 5,
      "deliveryTime": "20m - 50m",
      "deliveryValue": "7,00",
      "telephone": "(16) 88888-8888",
      "address": "Rua: Segundo de Junho, 600 - Recanto das Oliveiras, Franca SP",
      "km": 12,
      "__v": 0
    },
    {
      "_id": "65b04c4a9eb516867d4466c9",
      "name": "Sushiyama Sabor Oriental",
      "slogan": "Sushiyama Sabor Oriental: Uma Viagem Culinária ao Coração do Japão, em Cada Mordida!",
      "avatar": "https://images.unsplash.com/photo-1512132411229-c30391241dd8?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "background": "https://images.unsplash.com/photo-1607301406259-dfb186e15de8?q=80&w=1822&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "score": 5,
      "deliveryTime": "30m - 80m",
      "deliveryValue": "12,00",
      "telephone": "(16) 66666-6666",
      "address": "Rua: Terceiro de Julho, 7700 - Santa Luzia, Franca SP",
      "km": 20,
      "__v": 0
    },
    {
      "_id": "65b04cc49eb516867d4466cc",
      "name": "Sakura Sabor Nipônico",
      "slogan": "Sakura Sabor Nipônico: Florescer de Sabores, Onde Cada Prato Conta uma História do Japão!",
      "avatar": "https://images.unsplash.com/photo-1534247555660-d4af46712d27?q=80&w=1938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "background": "https://images.unsplash.com/photo-1617196034564-65baf56380ab?q=80&w=1816&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "score": 5,
      "deliveryTime": "30m - 80m",
      "deliveryValue": "12,00",
      "telephone": "(16) 77777-7777",
      "address": "Rua: Terceiro de Agosto, 800 - Santa Luzia, Franca SP",
      "km": 22,
      "__v": 0
    }
  ];


  function buscarRestaurantes() {
    setLoading(true);
    handleGetDefault("restaurant").then((response) => {
      if (response.data) {
        setListaRestaurantes(response.data);
      } else {
        errorMessage("Não retornou nenhum dado!");
      }
      setLoading(false);
    }).catch((error) => {
      infoMessage(error ? error : "Tempo limite excedido");
      setLoading(false);
    }).finally(() => setLoading(false));
  }

  useEffect(() => {
    buscarRestaurantes();
  }, []);
  return (
    <View flex={1}>
      <Background opacity={0.4} />
      <HStack w="100%" bgColor={theme.overlayColor} h={16} flex={1} justifyContent="space-between" position="absolute" alignItems="center" top={0} >
        <VStack mr={6} flex={1} alignItems="flex-end">
          <Text color={theme.orange} fontSize={20} fontWeight="bold">
            {`Olá ${formUsuario?.nome ? formUsuario?.nome : ""}, seja bem vindo`}
          </Text>
          <Text color={theme.whiteLight} fontSize={16} fontWeight="bold">Faça seu pedido!</Text>
        </VStack>
      </HStack>
      {loading ?
        <View mt={20} justifyContent="center">
          <ActivityIndicator size={70} color={theme.whiteLight} />
          <Text textAlign="center" fontSize={32} color={theme.whiteLight}>aguarde...</Text>
        </View>
        :
        <FlatList removeClippedSubviews={true} my={16} keyExtractor={item => item._id} flex={1} data={listaRestaurantes} renderItem={({ item }) =>
          <VStack flex={1} rounded="lg" pb={2} bgColor={theme.whiteLight} my={2} mx={2} shadow={3}>
            <TouchableOpacity onPress={() => navigation.navigate("Cardapio", item)}>
              <Image w="full" h={32} source={item.background ? { uri: item.background } : SemImagem} rounded="lg" alt="Imagem de fundo do restaurante" />
              <HStack mx={4}>
                <VStack alignItems="center">
                  <Image mt={-4} size={20} source={item.avatar ? { uri: item.avatar } : SemImagem} rounded="full" alt="Imagem do avatar" />
                  <HStack alignItems="center">
                    <Icon
                      as={<MaterialIcons name="star" />}
                      size={7}
                      color={theme.orange}
                      mr={1}
                    />
                    <Text fontSize={14} fontWeight="bold" textAlign='center' color={theme.darkColor}>{item?.score}</Text>
                  </HStack>
                </VStack>
                <VStack flex={1} pl={4} >
                  <View alignItems="flex-start" pt={1} >
                    <Text fontSize={20} fontWeight="bold" color={theme.darkColor}>{item?.name}</Text>
                    <Text fontSize={14} fontWeight="bold" ellipsizeMode="tail" numberOfLines={2} color={theme.darkColor}>{item?.slogan}</Text>
                  </View>
                  <HStack justifyContent="space-between">

                    <HStack alignItems="center">
                      <Icon
                        as={<MaterialIcons name="access-time" />}
                        size={6}
                        mr={1}
                        color={theme.orange}
                      />
                      <Text fontSize={14} fontWeight="bold" textAlign='center' color={theme.darkColor}>{item?.deliveryTime}</Text>
                    </HStack>
                    <HStack alignItems="center">
                      <Icon
                        as={<MaterialIcons name="confirmation-number" />}
                        size={6}
                        ml={6}
                        mr={1}
                        color={theme.orange}
                      />
                      <Text fontSize={14} fontWeight="bold" textAlign='center' color={theme.darkColor}>{`R$ ${item?.deliveryValue}`}</Text>
                    </HStack>
                    <HStack alignItems="center">
                      <Icon
                        as={<MaterialIcons name="verified" />}
                        size={6}
                        ml={6}
                        mr={1}
                        color={theme.successColor}
                      />

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
  );
};