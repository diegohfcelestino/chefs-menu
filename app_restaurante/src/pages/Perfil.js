import { HStack, Icon, Image, ScrollView, Text, View, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Keyboard, TouchableWithoutFeedback } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from "../assets/theme";
import { Background } from "../components/background/Background";
import { Button } from "../components/button/Button";
import { FooterMenu } from "../components/footerMenu/FooterMenu";
import { Input } from "../components/input/Input";
import { errorMessage, infoMessage, successMessage } from "../components/toast/Toast";
import { useAppContext } from "../context/AppContext";
import { handleGetWithParams, handlePatch } from "../services/service";
import { handleGetAsyncStorage, handleSetAsyncStorage } from "../services/storage";
import { validaAvatar, validaEmail, validaNome, validaNomeUsuario } from "../utils/validacoes";
import SemImagem from '../assets/img/sem-imagem.png';
import { descriptografarDados } from "../services/crypto";

export const Perfil = ({ route }) => {
  const {
    formUsuario,
    setFormUsuario,
    erro,
    setErro,
    loading,
    setLoading,
    sairDoAplicativo
  } = useAppContext();

  const [editar, setEditar] = useState(false);

  const validarInput = () => {
    const nomeEValido = validaNome(formUsuario?.nome);
    const nomeUsuarioEValido = validaNomeUsuario(formUsuario?.nomeUsuario);
    const emailEValido = validaEmail(formUsuario?.usuario);
    const avatarEValido = validaAvatar(formUsuario?.avatar);
    const backgroundEValido = validaAvatar(formUsuario?.background);

    if (!nomeEValido && formUsuario?.nome !== '') {
      setErro('Nome deve ter mais de 10 caracteres!');
    } else if (!nomeUsuarioEValido && formUsuario?.nomeUsuario !== '') {
      setErro('Nome usuário deve ter mais de 6 caracteres!');
    } else if (!emailEValido && formUsuario?.usuario !== '') {
      setErro('Email inválido!');
    } else if (!avatarEValido && formUsuario?.avatar !== '') {
      setErro('Link inválido');
    } else if (!backgroundEValido && formUsuario?.background !== '') {
      setErro('Link inválido');
    } else {
      setErro('');
    }
  };

  async function salvarDadosStorage(dadosUsuario) {
    dadosUsuario && handleSetAsyncStorage("", dadosUsuario, "", "");
  }

  async function buscarDadosAtualizados() {
    setLoading(true);
    handleGetWithParams("user/", formUsuario?.id).then(async (response) => {
      if (response.data) {
        await salvarDadosStorage(response?.data);
        setFormUsuario({
          nome: response.data.name,
          nomeUsuario: response.data.username,
          usuario: response.data.email,
          avatar: response.data.avatar,
          background: response.data.background
        });
      }
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      console.log("Catch buscar dados", error);
      infoMessage(error ? error : "Tempo limite excedido");
      AsyncStorage.multiRemove([`chefsMenu@accessToken`, `chefsMenu@email`, `chefsMenu@password`, `chefsMenu@usuario`]);
    }).finally(() => setLoading(false));
  }

  async function alterar() {
    setLoading(true);

    const params = {
      name: formUsuario?.nome,
      username: formUsuario?.nomeUsuario,
      email: formUsuario?.usuario,
      avatar: formUsuario?.avatar,
      background: formUsuario?.background
    };
    handlePatch(`user/${formUsuario?.id}`, params).then(async (response) => {
      if (response?.data) {
        successMessage(response?.data?.message);
        buscarDadosAtualizados();
      }
      setLoading(false);
    }).catch((error) => {
      infoMessage(error ? error : "Tempo limite excedido");
      setLoading(false);
      console.log("Catch alterar", error);
    }).finally(() => setLoading(false));

  }


  async function pegarDadosDoUsuario() {
    setLoading(true);
    try {
      const { dadosUsuario } = await handleGetAsyncStorage();
      if (dadosUsuario !== null) {
        const usuario = JSON.parse(dadosUsuario);

        setFormUsuario({
          ...formUsuario,
          id: usuario?.id,
          nome: usuario?.name,
          nomeUsuario: usuario?.username,
          usuario: descriptografarDados(usuario?.email),
          senha: "",
          confirmaSenha: "",
          avatar: usuario?.avatar,
          background: usuario?.background,

        });
        setLoading(false);
      } else {
        errorMessage("Não foi possivel acessar os dados do usuario");
        setLoading(false);
      }
    } catch (error) {
      console.log("erro ao pegar dados do usuario no storage", error);
      setLoading(false);
    }
  }


  useEffect(() => {
    validarInput();
  }, [formUsuario]);
  useEffect(() => {
    pegarDadosDoUsuario();
  }, []);
  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      containerStyle={{ flex: 1 }}>
      <View flex={1}>
        <Background opacity={0.3} />
        <VStack pb={16} flex={1} bgColor={theme.overlayColor}>
          <View alignItems="center" my={2}>
            <HStack w="full" justifyContent="space-evenly" alignItems="baseline">
              <Text fontSize={46} fontWeight="bold" color={theme.orange}>
                Chef's Menu
              </Text>

              <Icon
                as={<FontAwesome name="sign-out" />}
                size={8}
                color={theme.whiteLight}
                mx={4}
                onPress={() => sairDoAplicativo()}
              />
            </HStack>

            {erro != '' && (
              <Text
                color="yellow.300"
                fontSize={26}
                pb={2}
                fontWeight="bold"
              >
                {erro}
              </Text>
            )}
          </View>
          {loading ?
            <View mt={20} justifyContent="center">
              <ActivityIndicator size={70} color={theme.whiteLight} />
              <Text textAlign="center" fontSize={32} color={theme.whiteLight}>aguarde...</Text>
            </View>
            :

            <>
              <HStack justifyContent="center" py={8} mb={6} mx={2}>
                <Image position="absolute" top={0} w="full" h={56} px={10} source={formUsuario?.background ? { uri: formUsuario?.background } : SemImagem} defaultSource={{ uri: formUsuario?.background }} rounded="lg" alt="Imagem de fundo do usuário" />
                <VStack alignItems="center">
                  <Image size={32} source={formUsuario?.avatar ? { uri: formUsuario?.avatar } : SemImagem} defaultSource={{ uri: formUsuario?.avatar }} rounded="full" alt="Imagem do usuário" />
                  <Text fontWeight="bold" fontSize={32} color={theme.whiteLight}>{formUsuario?.nome}</Text>
                </VStack>
              </HStack>

              <ScrollView flex={1} flexGrow={1}  >

                <VStack flex={1} mx={10}>
                  <Input
                    placeholder="Informe seu nome"
                    autoCapitalize="none"
                    InputLeftElement={
                      <Icon
                        as={<MaterialIcons name="person" />}
                        size={7}
                        ml="2"
                        color={theme.orange}
                      />
                    }
                    onChangeText={(e) => setFormUsuario({ ...formUsuario, nome: e })}
                    value={formUsuario?.nome}
                    editable={editar}
                  />
                  <Input
                    placeholder="Informe seu nome de usuário"
                    autoCapitalize="none"
                    InputLeftElement={
                      <Icon
                        as={<MaterialIcons name="person" />}
                        size={7}
                        ml="2"
                        color={theme.orange}
                      />
                    }
                    onChangeText={(e) => setFormUsuario({ ...formUsuario, nomeUsuario: e })}
                    value={formUsuario?.nomeUsuario}
                    editable={editar}
                  />
                  <Input
                    placeholder="Informe seu e-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    InputLeftElement={
                      <Icon
                        as={<MaterialIcons name="alternate-email" />}
                        size={7}
                        ml="2"
                        color={theme.orange}
                      />
                    }
                    onChangeText={e => setFormUsuario({ ...formUsuario, usuario: e })}
                    value={formUsuario?.usuario}
                    editable={editar}
                  />
                  <Input
                    placeholder="Informe o link de seu avatar"
                    autoCapitalize="none"
                    InputLeftElement={
                      <Icon
                        as={<MaterialIcons name="person" />}
                        size={7}
                        ml="2"
                        color={theme.orange}
                      />
                    }
                    onChangeText={(e) => setFormUsuario({ ...formUsuario, avatar: e })}
                    value={formUsuario?.avatar}
                    editable={editar}
                  />
                  <Input
                    placeholder="Informe o link de sua imagem de fundo"
                    autoCapitalize="none"
                    InputLeftElement={
                      <Icon
                        as={<MaterialIcons name="aspect-ratio" />}
                        size={7}
                        ml="2"
                        color={theme.orange}
                      />
                    }
                    onChangeText={(e) => setFormUsuario({ ...formUsuario, background: e })}
                    value={formUsuario?.background}
                    editable={editar}
                  />
                </VStack>

              </ScrollView>

              <HStack mx={12} my={4} justifyContent="space-between" alignItems="center">
                <Button
                  h={12}
                  w="45%"
                  title={!editar ? "Alterar dados" : "Cancelar Edição"}
                  onPress={() => setEditar(!editar)}
                  isLoading={loading}
                  bg={editar ? theme.dangerColor : theme.orange}
                />
                <Button
                  w="45%"
                  h={12}
                  color={theme.lightColor}
                  disabled={erro}
                  title="Salvar"
                  isDisabled={!editar}
                  isLoading={loading}
                  onPress={() => alterar()}
                />

              </HStack>
            </>
          }


        </VStack>
        <FooterMenu color={route?.name} />
      </View>
    </TouchableWithoutFeedback>
  );
};