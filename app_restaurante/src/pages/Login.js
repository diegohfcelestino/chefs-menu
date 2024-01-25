import React, { useState } from "react";
import { Center, HStack, Icon, Image, KeyboardAvoidingView, Pressable, Text, VStack, View } from "native-base";
import LoginImg from '../assets/img/login.png';
import { Keyboard, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { IconArrowLeft, IconPerson, IconUserConfig } from "../utils/icons";
import theme from "../assets/theme";
import { Button } from "../components/button/Button";
import { Input } from "../components/input/Input";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAppContext } from "../context/AppContext";

export const Login = () => {
  const {
    navigation,
    formUsuario,
    setFormUsuario,
    showSenha,
    setShowSenha
  } = useAppContext();


  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      containerStyle={{ flex: 1 }}>
      <VStack flex={1}>
        <Image
          w="full"
          source={LoginImg}
          defaultSource={LoginImg}
          alt="Imagem de fundo"
          resizeMode="cover"
          opacity={0.6}
          position="absolute"
        />
        <View flex={1}>
          <HStack justifyContent="space-between" alignItems="center" pt={10} px={5}>
            <View bgColor={theme.overlayColor} justifyContent="center" alignItems="center" size={16} rounded="full">
              <TouchableOpacity onPress={() => navigation.navigate("Home")} >
                <IconArrowLeft size={25} />
              </TouchableOpacity>
            </View>

            <VStack alignItems="flex-end">
              <Text fontSize={18} fontWeight="bold" color={theme.darkColor}>Não tem conta?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Cadastro")} >
                <Text fontSize={20} fontWeight="bold" color={theme.pink}>Cadastre-se</Text>
              </TouchableOpacity>
            </VStack>
          </HStack>

          <VStack pb={20} flex={1} mx={6} justifyContent="flex-end" alignItems="center">
            <Input
              placeholder="Usuário"
              keyboardType="email-address"
              autoCapitalize="none"
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="person" />}
                  size={7}
                  ml="2"
                  color={theme.orange}
                />
              }
              onChangeText={(e) => setFormUsuario({ ...formUsuario, usuario: e })}
              value={formUsuario?.usuario}
            />
            <Input
              placeholder="Senha"
              type={showSenha ? 'text' : 'password'}
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="lock-outline" />}
                  size={7}
                  ml="2"
                  color={theme.orange}
                />
              }
              InputRightElement={
                <Pressable onPress={() => setShowSenha(!showSenha)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={showSenha ? 'visibility' : 'visibility-off'}
                      />
                    }
                    size={7}
                    mr="2"
                    color={theme.orange}
                  />
                </Pressable>
              }
              onChangeText={e => setFormUsuario({ ...formUsuario, senha: e })}
              value={formUsuario?.senha}
            />
            <Button
              title="Entrar"
            />

          </VStack>
        </View>
      </VStack>
    </TouchableWithoutFeedback>
  );

};