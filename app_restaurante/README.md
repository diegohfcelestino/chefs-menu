# Aplicativo móvel - Chefs Menu


# Pré-requisitos

- [Node JS](https://nodejs.org/en/) - versão 16.13.1 ou superior
- [GIT](https://git-scm.com/)
- [Java JDK11](https://jdk.java.net/java-se-ri/11)
- [Python e C++]()
- [Android Studio (Android)](https://developer.android.com/studio/index.html?hl=pt-br) no caso do Windows
- [Xcode](https://developer.apple.com/xcode/) no caso do IOS
- [Gradle](https://gradle.org/install/)
- 
- Para IOS é necessário o Xcode

# Executando o projeto

## Android

#### Abra seu prompt

- ` git clone https://github.com/diegohfcelestino/desafio-tecnico-fullstack-graoDireto.git`
- `cd app_restaurante`
  
- Rodar o comando `yarn` para instalar as dependências do projeto.  

- Para rodar o projeto basta abrir o emulador e digitar o comando abaixo
- `yarn android`

## IOS

- IOS - minima 13
- IOS - target 15/atual
  
- `https://github.com/diegohfcelestino/desafio-tecnico-fullstack-graoDireto.git`
- `cd app_restaurante`

## Gerando os aplicativos IOS

- Entrar no caminho `raizprojeto/ios/` com o terminal e rodar o comando `pod install`.
- Abra o arquivo `raizprojeto/ios/nomedaempresa.xcworkspace` com XCode.
- Rode o projeto pelo emulador ou aparelho movel IOS.

* Observação: Caso der erro ao selecionar o node, utilize os comandos abaixo no terminal.

Fazer um diretório global
`mkdir ~/.npm-global`
Configurar o npm para usar o novo caminho do diretório
`npm config set prefix '~/.npm-global'`
Abra ou crie um arquivo ~ / .profile e adicione esta linha:
`export PATH=~/.npm-global/bin:$PATH`
Atualize as variáveis de sistema:
`source ~/.profile`

- Caso já tenha um diretório global basta fazer da seguinte forma

Limpar a variavel global
`clear prefix '~/.npm-global'`
Seleciona a versão com o comando do nvm
`nvm use 10.16.3` ou `nvm use 14.17.6` ou a versão que precisa.
Configurar o npm para usar o novo caminho do diretório
`npm config set prefix '~/.npm-global'`
Abra ou crie um arquivo ~ / .profile e adicione esta linha:
`export PATH=~/.npm-global/bin:$PATH`
Atualize as variáveis de sistema:
`source ~/.profile`

  
# Erro
### iPhone conecta e desconecta no USB do MacBook Air

Abra o terminal e digite essa linha de comando:

1 - `sudo killall usbd`

2 - `sudo killall -STOP -c usbd`

* Seja feliz!




