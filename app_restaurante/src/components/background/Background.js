import { Center, Image, View } from "native-base";
import React from "react";
import BackgroundImg from '../../assets/img/background.png';

export const Background = ({ flex, ...rest }) => {
  return (
    <View flex={flex}>
      <Image
        w="full"
        source={BackgroundImg}
        defaultSource={BackgroundImg}
        alt="Imagem de fundo"
        resizeMode="cover"
        position="absolute"
        {...rest}
      />
    </View>);
};