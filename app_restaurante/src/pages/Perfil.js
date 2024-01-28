import { Center, HStack, Icon, Image, Pressable, ScrollView, Text, VStack, View } from "native-base";
import React, { useEffect, useState } from "react";
import CadastroImg from '../assets/img/login.png';
import LogoImg from '../assets/img/logo.png';
import { ActivityIndicator, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useAppContext } from "../context/AppContext";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Input } from "../components/input/Input";
import theme from "../assets/theme";
import { Button } from "../components/button/Button";
import { RFValue } from "react-native-responsive-fontsize";
import { validaAvatar, validaConfirmaSenha, validaEmail, validaNome, validaNomeUsuario, validaSenha } from "../utils/validacoes";
import { handleGetWithParams, handlePatch, handlePost } from "../services/service";
import { errorMessage, infoMessage, successMessage } from "../components/toast/Toast";
import { Background } from "../components/background/Background";
import { FooterMenu } from "../components/footerMenu/FooterMenu";
import { handleGetAsyncStorage, handleSetAsyncStorage } from "../services/storage";

export const Perfil = ({ route }) => {
  const {
    navigation,
    formUsuario,
    setFormUsuario,
    showSenha,
    setShowSenha,
    showConfirmaSenha,
    setShowConfirmaSenha,
    erro,
    setErro,
    handleGoBack,
    loading,
    setLoading,
    initialFormUsuario
  } = useAppContext();

  const [editar, setEditar] = useState(true);

  const validarInput = () => {
    const nomeEValido = validaNome(formUsuario?.nome);
    const nomeUsuarioEValido = validaNomeUsuario(formUsuario?.nomeUsuario);
    const emailEValido = validaEmail(formUsuario?.usuario);
    const senhaEvalida = validaSenha(formUsuario?.senha);
    const confirmaSenhaEValida = validaConfirmaSenha(formUsuario?.senha, formUsuario?.confirmaSenha);
    const avatarEValido = validaAvatar(formUsuario?.avatar);
    const backgroundEValido = validaAvatar(formUsuario?.background);

    if (!nomeEValido && formUsuario?.nome !== '') {
      setErro('Nome deve ter mais de 10 caracteres!');
    } else if (!nomeUsuarioEValido && formUsuario?.nomeUsuario !== '') {
      setErro('Nome usuário deve ter mais de 6 caracteres!');
    } else if (!emailEValido && formUsuario?.usuario !== '') {
      setErro('Email inválido!');
    } else if (!senhaEvalida && formUsuario?.senha !== '') {
      setErro('Senha curta');
    } else if (!confirmaSenhaEValida && formUsuario?.confirmaSenha !== '') {
      setErro('Senhas estão diferentes');
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
      console.log("resposta", response);
      // if (response) {
      //   successMessage(response.message);
      //   buscarDadosAtualizados();
      // }
      setLoading(false);
    }).catch((error) => {
      infoMessage(error ? error : "Tempo limite excedido");
      setLoading(false);
      console.log("Catch login", error);
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
          usuario: usuario?.email,
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

          <View alignItems="center" my={4}>
            <Text fontSize={RFValue(40)} py={0} fontWeight="bold" color={theme.orange}>
              Chef's Menu
            </Text>

            {erro != '' && (
              <Text
                color="yellow.300"
                fontSize={RFValue(12)}
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
              <HStack justifyContent="center" my={8}>
                <VStack>
                  {formUsuario?.avatar && <Image size={32} source={{ uri: formUsuario?.avatar }} defaultSource={{ uri: formUsuario?.avatar }} rounded="full" alt="Imagem do usuário" />}
                  <Text fontSize={RFValue(20)} color={theme.whiteLight}>{formUsuario?.nome}</Text>
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
                    editable={!editar}
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
                    editable={!editar}
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
                    editable={!editar}
                  />
                  {/* {!editar ?
                    <>
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
                        editable={!editar}
                      />

                      <Input
                        placeholder="Confirmar Senha"
                        type={showConfirmaSenha ? 'text' : 'password'}
                        InputLeftElement={
                          <Icon
                            as={<MaterialIcons name="lock-outline" />}
                            size={7}
                            ml="2"
                            color={theme.orange}
                          />
                        }
                        InputRightElement={
                          <Pressable onPress={() => setShowConfirmaSenha(!showConfirmaSenha)}>
                            <Icon
                              as={
                                <MaterialIcons
                                  name={showConfirmaSenha ? 'visibility' : 'visibility-off'}
                                />
                              }
                              size={7}
                              mr="2"
                              color={theme.orange}
                            />
                          </Pressable>
                        }
                        onChangeText={e => setFormUsuario({ ...formUsuario, confirmaSenha: e })}
                        value={formUsuario?.confirmaSenha}
                        editable={!editar}
                      />
                    </>
                    : null} */}
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
                    editable={!editar}
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
                    editable={!editar}
                  />
                </VStack>

              </ScrollView>

              <HStack mx={10} my={4} justifyContent="space-between" alignItems="center">
                <Button
                  h={12}
                  w="45%"
                  title={editar ? "Alterar dados" : "Cancelar Edição"}
                  onPress={() => setEditar(!editar)}
                  isLoading={loading}
                />
                <Button
                  w="45%"
                  h={12}
                  color={theme.lightColor}
                  disabled={erro}
                  title="Salvar"
                  isDisabled={editar}
                  isLoading={loading}
                  bg={theme.orange}
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