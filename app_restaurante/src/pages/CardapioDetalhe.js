import { Center, HStack, Icon, Text, VStack, View } from "native-base";
import React, { useEffect, useState } from "react";
import { Linking } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from "../assets/theme";
import { Button } from "../components/button/Button";
import { Drawer } from "../components/drawer/Drawer";
import { Image } from "../components/image/image";
import { useAppContext } from "../context/AppContext";

export const CardapioDetalhe = ({ route }) => {
  console.log("routes", route);
  const {
    openDrawer,
    drawerView,
    setColorDrawer
  } = useAppContext();
  const [dadosCardapio, setDadosCardapio] = useState('');

  useEffect(() => {
    setDadosCardapio(route?.params);
    setColorDrawer('');
  }, []);

  return (
    <View flex={1} bgColor={theme.grayLight}>
      <Drawer open={openDrawer} drawerContent={drawerView()}>
        <View w="100%" flex={1} pb={2} >
          <VStack rounded="lg" pb={2} bgColor={theme.whiteLight} mt={2} mx={2} shadow={3}>

            <HStack mx={4}>
              <Center justifyContent="space-evenly">
                <Image size={20} source={{ uri: dadosCardapio?.avatarRestaurant }} rounded="full" alt="Imagem do avatar" />
                <VStack alignItems="center">
                  <Icon
                    as={<MaterialIcons name="star" />}
                    size={8}
                    color={theme.orange}
                  />
                  <Text fontSize={RFValue(10)} fontWeight="bold" textAlign='center' color={theme.orange}>{dadosCardapio?.scoreRestaurant}</Text>
                </VStack>
              </Center>
              <VStack flex={1} pl={4}>
                <View alignItems="flex-start" pt={1} >
                  <Text fontSize={RFValue(16)} fontWeight="bold" color={theme.darkColor}>{`Restaurante: ${dadosCardapio?.nameRestaurant}`}</Text>
                  <HStack alignItems="center">
                    <Icon
                      as={<MaterialIcons name="phone" />}
                      size={7}
                      mr={1}
                      color={theme.orange}
                      onPress={() => Linking.openURL(`tel:${dadosCardapio?.telephoneRestaurant}`)}
                    />
                    <Text fontSize={RFValue(10)} fontWeight="bold" textAlign='center' color={theme.darkColor}>{dadosCardapio?.telephoneRestaurant}</Text>
                    <Icon
                      as={<MaterialCommunityIcons name="whatsapp" />}
                      size={7}
                      ml={6}
                      mr={1}
                      color={theme.successColor}
                      onPress={() =>
                        Linking.openURL(
                          `whatsapp://send?text=&phone=+55${dadosCardapio?.telephoneRestaurant}`,
                        )
                      }
                    />
                    <Text fontSize={RFValue(10)} fontWeight="bold" textAlign='center' color={theme.darkColor}>{dadosCardapio?.telephoneRestaurant}</Text>
                  </HStack>
                  <HStack alignItems="center" pr={6}>
                    <Icon
                      as={<MaterialIcons name="location-pin" />}
                      size={7}
                      mr={1}
                      color={theme.orange}
                    />
                    <Text fontSize={RFValue(10)} fontWeight="bold" ellipsizeMode="tail" numberOfLines={2} textAlign='left' color={theme.darkColor}>{dadosCardapio?.enderecoRestaurante}</Text>
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
                    <Text fontSize={RFValue(10)} fontWeight="bold" textAlign='center' color={theme.darkColor}>{dadosCardapio?.tempoEntregaRestaurante}</Text>
                  </HStack>
                  <HStack alignItems="center">
                    <Icon
                      as={<MaterialIcons name="confirmation-number" />}
                      size={7}
                      ml={6}
                      mr={1}
                      color={theme.orange}
                    />
                    <Text fontSize={RFValue(10)} fontWeight="bold" textAlign='center' color={theme.darkColor}>{`R$ ${dadosCardapio?.valorEntregaRestaurante}`}</Text>
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
          <VStack rounded="lg" py={2} bgColor={theme.whiteLight} mx={2} shadow={3}>
            <Image resizeMode="cover" w="full" h={64} source={{ uri: dadosCardapio.background }} rounded="lg" alt="Imagem do cardápio" />
            <View mx={2}>
              <Text fontSize={RFValue(18)} fontWeight="bold" color={theme.orange}>{dadosCardapio?.name}</Text>
              <Text my={4} fontSize={RFValue(14)} fontWeight="bold" color={theme.darkColor}>{dadosCardapio?.description}</Text>
              <Text fontSize={RFValue(14)} fontWeight="bold" textAlign="right" color={theme.darkColor}>{`R$ ${dadosCardapio?.value}`}</Text>

            </View>
          </VStack>

        </View>
        <Center>
          <Button
            mb={10}
            w="50%"
            title={`Adicionar    R$ ${dadosCardapio?.value}`}
            onPress={() => console.log("adicionar ao carrinho", dadosCardapio)}
          />
        </Center>
      </Drawer>
    </View>
  );
};