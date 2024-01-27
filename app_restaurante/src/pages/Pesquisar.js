import { Center, HStack, Icon, SectionList, Text, VStack, View } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Keyboard, Pressable, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from "../assets/theme";
import { Background } from "../components/background/Background";
import { FooterMenu } from "../components/footerMenu/FooterMenu";
import { Image } from "../components/image/image";
import { Input } from "../components/input/Input";
import { errorMessage, infoMessage } from "../components/toast/Toast";
import { useAppContext } from "../context/AppContext";
import { handleGetWithParams } from "../services/service";

export const Pesquisar = ({ route }) => {
  const {
    navigation,
    loading,
    setLoading
  } = useAppContext();
  const [pesquisa, setPesquisa] = useState('');
  const [listaPesquisada, setListaPesquisada] = useState([]);
  const [novaLista, setNovaLista] = useState([]);
  const [color, setColor] = useState('');

  function pesquisar() {

    setLoading(true);
    handleGetWithParams("menu/search?text=", pesquisa).then((response) => {
      if (response.data) {
        setListaPesquisada(response.data);
        setNovaLista(response.data);
        setColor("Todos");
        setLoading(false);
      } else {
        errorMessage("Não retornou nenhum dado!");
        setListaPesquisada([]);
        setNovaLista([]);
        setLoading(false);
      }
    }).catch((error) => {
      infoMessage(error ? error : "Tempo limite excedido");
      setListaPesquisada([]);
      setNovaLista([]);
      console.log("Pesquisa", error);
      setLoading(false);
    }).finally(() => setLoading(false));
  }

  function filtrarLista(filter) {
    if (filter) {
      let listaFiltrada = listaPesquisada.filter(item => item.title === filter);
      setNovaLista(listaFiltrada);
      setColor(filter);
    } else {
      setNovaLista(listaPesquisada);
      setColor("Todos");
    }
  }



  useEffect(() => {
    pesquisar();
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      containerStyle={{ flex: 1 }}>
      <View flex={1} pb={16}>
        <Background opacity={0.4} />
        <View w="full" bgColor={theme.overlayColor} py={1} px={1}>
          <Text textAlign="center" fontSize={RFValue(20)} fontWeight="bold" color={theme.orange}>Chef's Menu</Text>
        </View>

        <Input
          mt={4}
          mx={6}
          placeholder="Digite para pesquisar"
          autoCapitalize="none"
          InputRightElement={
            <Pressable onPress={() => pesquisar()}>
              <Icon
                as={
                  <MaterialIcons
                    name='search'
                  />
                }
                size={10}
                mr="2"
                color={theme.orange}
              />
            </Pressable>
          }
          onChangeText={e => setPesquisa(e)}
          value={pesquisa}
          onEndEditing={() => pesquisar()}
        />
        {listaPesquisada.length > 0 &&
          <HStack mx={6} justifyContent="space-around" mb={4}>
            <TouchableOpacity onPress={() => filtrarLista()}>
              <Text fontSize={RFValue(14)} color={color === "Todos" ? theme.orange : theme.whiteLight}>Todos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => filtrarLista("Pratos")}>
              <Text fontSize={RFValue(14)} color={color === "Pratos" ? theme.orange : theme.whiteLight}>Pratos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => filtrarLista("Bebidas")}>
              <Text fontSize={RFValue(14)} color={color === "Bebidas" ? theme.orange : theme.whiteLight}>Bebidas</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => filtrarLista("Sobremesas")}>
              <Text fontSize={RFValue(14)} color={color === "Sobremesas" ? theme.orange : theme.whiteLight}>Sobremesas</Text>
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
              <Center w="full" bgColor={theme.overlayColor} py={1} px={1}>
                <Text textAlign="center" fontSize={RFValue(20)} fontWeight="bold" color={theme.whiteLight}>Não há nenhum restaurante ou item com essa descrição!</Text>
              </Center>
            }
            renderSectionHeader={({ section }) => (
              <Text textAlign="center" fontWeight="bold" fontSize={RFValue(16)} color={theme.orange}>{section.title}</Text>
            )}
            renderItem={({ item, section }) =>
              <VStack flex={1} rounded="lg" pb={2} bgColor={theme.whiteLight} my={2} mx={2} shadow={3} >
                <TouchableOpacity onPress={() => { console.log("Clicou no cardapio,", novaLista); }}>
                  <Image resizeMode="cover" w="full" h={32} source={{ uri: item.background }} rounded="lg" alt="Imagem do item" />
                  <HStack mx={4}>
                    <Image mt={-4} size={20} source={{ uri: item.avatarRestaurant }} rounded="full" alt="Imagem do avatar" />
                    <VStack flex={1} pl={4} >
                      <View alignItems="flex-start" pt={1} >
                        <Text fontSize={RFValue(12)} fontWeight="bold" color={theme.darkColor}>{item?.name}</Text>
                        <Text fontSize={RFValue(10)} fontWeight="bold" color={theme.orange}>{item?.nameRestaurant}</Text>
                        <Text fontSize={RFValue(8)} fontWeight="bold" ellipsizeMode="tail" numberOfLines={2} color={theme.darkColor}>{item?.description}</Text>
                      </View>

                    </VStack>
                  </HStack>
                </TouchableOpacity>
              </VStack>
            }
          />

        }

        <FooterMenu color={route?.name} />
      </View>
    </TouchableWithoutFeedback>
  );
};