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
          <Text color={theme.orange} fontSize={18} fontWeight="bold">
            {`Olá ${formUsuario?.nome ? formUsuario?.nome : ""}, seja bem vindo`}
          </Text>
          <Text color={theme.whiteLight} fontSize={14} fontWeight="bold">Faça seu pedido!</Text>
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
                    <Text fontSize={12} fontWeight="bold" textAlign='center' color={theme.darkColor}>{item?.score}</Text>
                  </HStack>
                </VStack>
                <VStack flex={1} pl={4} >
                  <View alignItems="flex-start" pt={1} >
                    <Text fontSize={18} fontWeight="bold" color={theme.orange}>{item?.name}</Text>
                    <Text fontSize={12} fontWeight="bold" ellipsizeMode="tail" numberOfLines={2} color={theme.darkColor}>{item?.slogan}</Text>
                  </View>
                  <HStack justifyContent="space-between">

                    <HStack alignItems="center">
                      <Icon
                        as={<MaterialIcons name="access-time" />}
                        size={6}
                        mr={1}
                        color={theme.orange}
                      />
                      <Text fontSize={12} fontWeight="bold" textAlign='center' color={theme.darkColor}>{item?.deliveryTime}</Text>
                    </HStack>
                    <HStack alignItems="center">
                      <Icon
                        as={<MaterialIcons name="confirmation-number" />}
                        size={6}
                        ml={6}
                        mr={1}
                        color={theme.orange}
                      />
                      <Text fontSize={12} fontWeight="bold" textAlign='center' color={theme.darkColor}>{`R$ ${item?.deliveryValue}`}</Text>
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