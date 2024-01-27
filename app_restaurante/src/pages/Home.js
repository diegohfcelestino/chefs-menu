import { Button, Image, Text, View } from 'native-base';
import React from 'react';
import HomeImg from '../assets/img/home.png';
import { IconArrowLeft, IconArrowRight } from '../utils/icons';
import theme from '../assets/theme';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from "react-native-responsive-fontsize";

export const Home = () => {
  const navigation = useNavigation();
  return (
    <View flex={1} >
      <Image
        w="full"
        h="100%"
        source={HomeImg}
        defaultSource={HomeImg}
        alt="Imagem de fundo"
        resizeMode="cover"
        position="absolute"
      />
      <View>
        <View w="full" bgColor={theme.overlayColor} py={10} px={1}>
          <Text textAlign="center" fontSize={RFValue(40)} pb={10} fontWeight="bold" color={theme.orange}>Chef's Menu</Text>
          <Text textAlign="center" fontSize={RFValue(20)} fontWeight="bold" color={theme.whiteLight}>Os melhores restaurante da cidade!</Text>
        </View>
      </View>
      <View bgColor={theme.whiteLight} justifyContent="center" alignItems="center" size={20} rounded="full" position="absolute" bottom={5} right={5}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")} >
          <IconArrowRight color={theme.orange} />
        </TouchableOpacity>
      </View>
    </View>
  );

};