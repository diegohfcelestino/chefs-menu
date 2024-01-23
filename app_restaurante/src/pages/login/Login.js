import React from "react";
import { HStack, Image, Text, VStack, View } from "native-base";
import LoginImg from '../../assets/img/login.png';
import { TouchableOpacity } from "react-native";
import { IconArrowLeft } from "../../utils/icons";
import theme from "../../assets/theme";
import { useNavigation } from "@react-navigation/native";

export const Login = () => {
  const navigation = useNavigation();
  return (
    <View flex={1} >
      <Image
        w="full"
        source={LoginImg}
        defaultSource={LoginImg}
        alt="Imagem de fundo"
        resizeMode="cover"
        position="absolute"
      />

      <HStack justifyContent="space-between" alignItems="center" pt={10} px={5}>
        <View bgColor={theme.overlayColor} justifyContent="center" alignItems="center" size={16} rounded="full">
          <TouchableOpacity onPress={() => navigation.navigate("Home")} >
            <IconArrowLeft size={25} />
          </TouchableOpacity>
        </View>

        <VStack alignItems="flex-end">
          <Text fontSize={18} fontWeight="bold" color={theme.darkColor}>Não tem conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")} >
            <Text fontSize={20} fontWeight="bold" color={theme.pink}>Cadastre-se</Text>
          </TouchableOpacity>
        </VStack>
      </HStack>
    </View>
  );

};