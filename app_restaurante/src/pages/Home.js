import { useNavigation } from '@react-navigation/native';
import { Image, Text, View } from 'native-base';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import HomeImg from '../assets/img/home.png';
import theme from '../assets/theme';
import { IconArrowRight } from '../utils/icons';


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
        <View w="full" bgColor={theme.overlayColor} py={8} px={1}>
          <Text textAlign="center" fontSize={48} pb={2} fontWeight="bold" color={theme.orange}>Chef's Menu</Text>
          <Text textAlign="center" fontSize={20} fontWeight="bold" color={theme.whiteLight}>Os melhores restaurante da cidade!</Text>
        </View>
      </View>
      <View bgColor={theme.whiteLight} justifyContent="center" alignItems="center" size={16} rounded="full" position="absolute" bottom={5} right={5}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")} >
          <IconArrowRight color={theme.orange} />
        </TouchableOpacity>
      </View>
    </View>
  );

};