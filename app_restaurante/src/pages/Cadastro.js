import { Center, Heading, Icon, Image, Pressable, ScrollView, Text, VStack, View } from "native-base";
import React, { useEffect } from "react";
import CadastroImg from '../assets/img/login.png';
import LogoImg from '../assets/img/logo.png';
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { useAppContext } from "../context/AppContext";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Input } from "../components/input/Input";
import theme from "../assets/theme";
import { Button } from "../components/button/Button";
import { validaAvatar, validaConfirmaSenha, validaEmail, validaNome, validaNomeUsuario, validaSenha } from "../utils/validacoes";

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
    handleGoBack
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

  useEffect(() => {
    validarInput();
  }, [formUsuario]);
  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      containerStyle={{ flex: 1 }}>
      <ScrollView flex={1} flexGrow={1} bgColor={theme.overlayColor} >
        <VStack pb={10} >

          <Image
            w="full"
            source={CadastroImg}
            defaultSource={CadastroImg}
            alt="Imagem de fundo"
            resizeMode="cover"
            opacity={0.2}
            position="absolute"
          />
          <View mx={6} flex={1}>
            <Center>
              <Text textAlign="center" fontSize={48} py={0} fontWeight="bold" color={theme.orange}>Chef's Menu</Text>
              <Heading color={theme.lightColor} fontSize={32} mb={4} fontFamily="heading">
                Iniciar Cadastro
              </Heading>

              {erro != '' && (
                <Heading
                  color="yellow.300"
                  fontSize={16}
                  pb={2}
                  fontFamily="heading"
                >
                  {erro}
                </Heading>
              )}

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
                          name={showSenha ? 'visibility' : 'visibility-off'}
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
              <Button
                mt={4}
                w="full"
                h={12}
                color={theme.lightColor}
                disabled={erro}
                title="Cadastrar"
                bg={!erro ? theme.orange : theme.grayLight}
              />
              <Button
                mt={8}
                h={12}
                title="Voltar para o Login"
                variant="outline"
                onPress={handleGoBack}
              />
            </Center>

          </View>
        </VStack>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};