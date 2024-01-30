import { Icon, Pressable, ScrollView, Text, View, VStack } from "native-base";
import React, { useEffect } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import theme from "../assets/theme";
import { Background } from "../components/background/Background";
import { Button } from "../components/button/Button";
import { Input } from "../components/input/Input";
import { errorMessage, infoMessage, successMessage } from "../components/toast/Toast";
import { useAppContext } from "../context/AppContext";
import { handlePost } from "../services/service";
import { validaAvatar, validaConfirmaSenha, validaEmail, validaNome, validaNomeUsuario, validaSenha } from "../utils/validacoes";
import { criptografarDados } from "../services/crypto";

export const Cadastro = () => {
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

  async function cadastrar() {
    setLoading(true);
    const params = {
      name: formUsuario?.nome,
      username: formUsuario?.nomeUsuario,
      email: criptografarDados(formUsuario?.usuario),
      password: criptografarDados(formUsuario?.senha),
      avatar: formUsuario?.avatar,
      background: formUsuario?.background
    };
    handlePost("user", params).then(async (response) => {
      if (response.data) {
        successMessage(response.data.message);
        navigation.navigate("Login");
      }
      setLoading(false);
    }).catch((error) => {
      let message = error.includes("duplicate key");
      if (message) {
        errorMessage("Nome de usuário ou e-mail já cadastrados.");
      } else {
        infoMessage(error ? error : "Tempo limite excedido");
      }
      setLoading(false);
      console.log("Catch login", error);
    }).finally(() => setLoading(false));

  }

  useEffect(() => {
    validarInput();
  }, [formUsuario]);
  useEffect(() => {
    setFormUsuario(initialFormUsuario);
  }, []);
  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      containerStyle={{ flex: 1 }}>
      <View flex={1}>
        <Background opacity={0.3} />
        <VStack pb={10} flex={1} bgColor={theme.overlayColor}>

          <View alignItems="center" my={4}>
            <Text fontSize={48} py={0} fontWeight="bold" color={theme.orange}>
              Chef's Menu
            </Text>
            <Text color={theme.lightColor} fontSize={32} mb={4} fontWeight="bold">
              Iniciar Cadastro
            </Text>
            {erro != '' && (
              <Text
                color="yellow.300"
                fontSize={16}
                pb={2}
                fontWeight="bold"
              >
                {erro}
              </Text>
            )}
          </View>


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
              />
            </VStack>

          </ScrollView>

          <View mx={10}>
            <Button
              mt={4}
              w="full"
              h={12}
              color={theme.lightColor}
              disabled={erro}
              title="Cadastrar"
              isDisabled={!formUsuario.nome || !formUsuario.nomeUsuario || !formUsuario.usuario || !formUsuario.senha || !formUsuario.confirmaSenha || !formUsuario.avatar || !formUsuario.background}
              isLoading={loading}
              bg={theme.orange}
              onPress={() => cadastrar()}
            />
            <Button
              mt={8}
              h={12}
              title="Voltar para o Login"
              variant="outline"
              onPress={() => handleGoBack()}
            />
          </View>


        </VStack>
      </View>
    </TouchableWithoutFeedback>
  );
};