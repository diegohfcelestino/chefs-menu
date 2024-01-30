import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { HStack, Icon, Pressable, Text, View, VStack } from "native-base";
import React, { useCallback } from "react";
import { ActivityIndicator, Keyboard, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from "../assets/theme";
import { Background } from "../components/background/Background";
import { Button } from "../components/button/Button";
import { Input } from "../components/input/Input";
import { infoMessage } from "../components/toast/Toast";
import { useAppContext } from "../context/AppContext";
import { handlePost } from "../services/service";
import { handleGetAsyncStorage, handleSetAsyncStorage } from "../services/storage";
import { IconArrowLeft } from "../utils/icons";
import { criptografarDados } from "../services/crypto";

export const Login = () => {
  const {
    navigation,
    formUsuario,
    setFormUsuario,
    showSenha,
    setShowSenha,
    loading,
    setLoading,
    salvarUsuario,
    setSalvarUsuario,
    initialFormUsuario
  } = useAppContext();

  async function salvarDadosStorage(dadosUsuario) {
    dadosUsuario && handleSetAsyncStorage(dadosUsuario.token, dadosUsuario, criptografarDados(formUsuario?.usuario), criptografarDados(formUsuario?.senha));
  }

  async function login() {
    try {
      const { emailStorage, senhaStorage } = await handleGetAsyncStorage();
      setLoading(true);
      const params = {
        email: formUsuario?.usuario ? criptografarDados(formUsuario?.usuario) : emailStorage,
        password: formUsuario?.senha ? criptografarDados(formUsuario?.senha) : senhaStorage,
      };
      handlePost("auth", params).then(async (response) => {
        if (response.data.token) {
          await salvarDadosStorage(response?.data);
          setFormUsuario({
            ...formUsuario,
            id: response?.data?.id,
            nome: response?.data?.name,
            nomeUsuario: response?.data?.username,
            usuario: response?.data?.email,
            avatar: response?.data?.avatar,
            background: response?.data?.background,

          });
        }
        if (salvarUsuario) {
          AsyncStorage.setItem('chefsMenu@salvarUsuario', "sim");
        } else {
          AsyncStorage.removeItem('chefsMenu@salvarUsuario');
        }
        navigation.navigate("Restaurantes");
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        console.log("Catch login", error);
        infoMessage(error ? error : "Tempo limite excedido");
        AsyncStorage.multiRemove([`chefsMenu@accessToken`, `chefsMenu@email`, `chefsMenu@password`, `chefsMenu@usuario`]);
      }).finally(() => setLoading(false));
    } catch (error) {
      console.log("Erro ao buscar dados no storage");
    }

  }

  async function loginAoRenderizar() {
    const { validaUsuario, emailStorage, senhaStorage } = await handleGetAsyncStorage();
    if (validaUsuario === "sim" && emailStorage && senhaStorage) {
      setSalvarUsuario(true);
      login();
    } else {
      console.log("Não tem usuário salvo no storage");
    }
  }

  useFocusEffect(useCallback(() => {
    loginAoRenderizar();
    setFormUsuario(initialFormUsuario);
  }, []));

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      containerStyle={{ flex: 1 }}>
      <VStack flex={1}>
        <Background opacity={0.3} />
        <View flex={1} bgColor={theme.overlayColor}>
          <HStack justifyContent="space-between" alignItems="center" pt={10} px={5}>
            <View bgColor={theme.whiteLight} justifyContent="center" alignItems="center" size={16} rounded="full">
              <TouchableOpacity onPress={() => navigation.navigate("Home")} >
                <IconArrowLeft color={theme.orange} size={30} />
              </TouchableOpacity>
            </View>

            <VStack alignItems="flex-end">
              <Text fontSize={24} fontWeight="bold" color={theme.whiteLight}>Não tem conta?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Cadastro")} >
                <Text fontSize={28} fontWeight="bold" color={theme.orange}>Cadastre-se</Text>
              </TouchableOpacity>
            </VStack>
          </HStack>



          <VStack pb={20} flex={1} mx={10} justifyContent="flex-end" alignItems="center">
            {loading ?
              <View>
                <ActivityIndicator size={70} color={theme.whiteLight} />
                <Text alignItems="center" fontSize={32} color={theme.whiteLight}>Fazendo Login...</Text>
              </View>
              :
              <>
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
                <HStack pb={5} alignItems="center">
                  <TouchableOpacity onPress={() => setSalvarUsuario(!salvarUsuario)}>
                    <Icon
                      as={
                        <MaterialIcons
                          name={salvarUsuario ? 'check-box' : 'check-box-outline-blank'}
                        />
                      }
                      mr={4}
                      size={10}
                      color={salvarUsuario ? theme.successColor : theme.whiteLight}

                    />
                  </TouchableOpacity>
                  <Text color={theme.whiteLight} fontSize={24} fontWeight="bold">Salvar Usuário</Text>
                </HStack>
                <Button
                  title="Entrar"
                  onPress={() => login()}
                  isDisabled={!formUsuario.usuario || !formUsuario.senha}
                // isLoading={loading}
                />
              </>
            }
          </VStack>
        </View>
      </VStack>
    </TouchableWithoutFeedback>
  );

};