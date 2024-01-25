import { Button, Image, Text, View } from 'native-base';
import React from 'react';
import HomeImg from '../assets/img/home.png';
import { IconArrowLeft, IconArrowRight } from '../utils/icons';
import theme from '../assets/theme';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const Home = () => {
  const navigation = useNavigation();
  return (
    <View flex={1} >
      <Image
        w="full"
        source={HomeImg}
        defaultSource={HomeImg}
        alt="Imagem de fundo"
        resizeMode="cover"
        position="absolute"
      />
      <View w="full" bgColor={theme.overlayColor} py={10} px={1}>
        <Text textAlign="center" fontSize={40} pb={10} fontWeight="bold" color={theme.orange}>Chef's Menu</Text>
        <Text fontSize={28} fontWeight="bold" color={theme.whiteLight}>Encontre os melhores restaurante de sua cidade!</Text>
      </View>
      <View bgColor={theme.overlayColor} justifyContent="center" alignItems="center" size={20} rounded="full" position="absolute" bottom={5} right={5}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")} >
          <IconArrowRight />
        </TouchableOpacity>
      </View>
    </View>);

};