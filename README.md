<h1 align="center">Exercício Técnico – FULL STACK</h1>

<p align="center">
  <img src="./assets/exercicio.png" width="700">
</p>

<p align="center">
  <a href="#-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="https://api-restaurant-scxy.onrender.com/documentation/" target="_blank">Documentação Backend</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-autor">Autor</a>
</p>



## ✨ Sobre


Projeto desenvolvido no desafio tecnico para vaga de Full Stack na empresa <a href="https://www.graodireto.com.br/" target="_blank">Grão Direto</a>.
Informações do desafio:

Suponha que você tenha sido solicitado a desenvolver uma plataforma no ramo de gastronomia. O cliente solicitou um MVP para validar seu conhecimento, 
com as seguintes características:

- Um portal WEB responsivo ou aplicativo mobile;
- Autenticação por e-mail e senha criptografados;
- Tela inicial com uma lista dos restaurantes;
- A tela deve possuir um campo de busca livre, que filtra os restaurantes cujo NOME DO RESTAURANTE, NOME E DESCRIÇÃO DO PRATO possuam os caracteres digitados;
- Ao clicar em um restaurante na lista, a plataforma deve ir para a tela de detalhe do restaurante e cardápio;
- Tela com detalhe do restaurante, mostrando nome, telefone e endereço, além da lista de itens do cardápio (nome, descrição e preço)

Desenvolva o MVP solicitado, em qualquer tecnologia, respeitando os seguintes critérios: 

- Portal ou aplicativo; 
- Tela de login e autenticação (criar um usuário "fred@graodireto.com.br e senha "123Fred"); 
- Backend respondendo a chamadas API REST; 
- Repositório de dados contendo informações dos usuários, restaurantes e itens do cardápio;


<h2 align="center">Abaixo está o exemplo enviado no desafio</h2>

<p align="center">
  <img src="./assets/exemplo.png" width="700">
</p>


## ✨ Projeto
<!-- <p align="center">
  <img src="./assets/home.png" width="400">
</p> -->



<h3 align="center">O projeto foi desenvolvido usando a MERN STACK, abreviação para MongoDB, Express, React, e Node.js</h3>

<p align="center">
  <img src="./assets/mern.png" width="400">
</p>


### Banco de dados
<div> 
<img src="./assets/mongo.png" width="80">
</div>

Foi utilizado o Mongo Atlas, que alem de ser o banco MongoDB ele já fica em nuvem, facilitando acesso ao mesmo.

### Backend
<div> 
<img src="./assets/express.png" width="80">
<img src="./assets/node.png" width="80">
<img src="./assets/jwt.png" width="80">
<img src="./assets/swagger.png" width="200">
</div>

- <a href="https://github.com/diegohfcelestino/desafio-tecnico-fullstack-graoDireto/tree/main/api-restaurante" target="_blank">Backend</a>
  
O backend foi desenvolvido utilizando NodeJS, Express e o JWT para proteção de rotas. O projeto foi publicado no Rende, plataforma para fazer deploy com Node e nele possui as seguintes requisições/end points:

- Criar usuário, alterar, buscar todos os usuário e buscar um usuário por ID.
- Autenticação,
- Cadastrar restaurante e buscar todos os restaurantes.
- Cadastrar cardápio vinculando um restaurante, buscar todos os cardápios, buscar cardápio por ID.
- Pesquisa dinamica de cardápio, por nome do restaurante, por nome do prato e descrição do prato.
- Buscar os cardápios por ID de um restaurante e apagar cardapios.


Foi criada a documentação de todos os end points utilizando o Swagger, para ter acesso, basta clicar <a href="https://github.com/diegohfcelestino/desafio-tecnico-fullstack-graoDireto/tree/main/api-restaurante" target="_blank">aqui</a>, ou copiar o link `https://api-restaurant-scxy.onrender.com/documentation/` e colar em seu navegador.


### Mobile
<div>   
<img src="./assets/react.png" width="100">
</div>

- <a href="https://github.com/diegohfcelestino/desafio-tecnico-fullstack-graoDireto/tree/main/app_restaurante" target="_blank">Mobile</a>

O aplicativo foi desenvolvido utilizando React-native, utilizado vector-icons para trabalhar com icones, crypto-js para proteger os dados, async-storage para login automático quando usuário salvar e navegação de telas com o native-stack.

#### Telas e funcionalidades do aplicativo

- Tela inicial com apresentação do app.
- Cadastrar usuario.
- Login com autenticação criptografada com a possibilidade do usuário salvar senha e entrar de forma automática.
- Primeira tela do aplicativo traz todos os restaurantes cadastrados por ordem crescente de distancia.
- Ao clicar no banner do restaurante a tela é direcionada para o cardápio.
- Na tela do cardápio traz as informações de todos os prato, bebidas e sobremesas, com a possibilidade de entra no item ou adicionar no pedido.
- Detalhe do cardápio, tras todas as informações do item e pode adicionar ao pedido.
- Nas telas de cardápio e detalhe do cardápio, foi adicionado um menu lateral a direita, para facilitar a navegação.
- Na tela de pesquisa ao entrar ela traz todos os restaurantes cadastrados, com a possibilidade de pesquisar.
- Pedidos, nessa tela figa gravados os pedidos, podendo navegar até a tela de detalhe do item ou excluir o item do cardápio.
- Os pedidos ficam salvos no storage do celular.
- Tela de perfil, tras os dados do usuário e podem ser alterados também.
- Foi utilizado o storage para salvar informações do usuário com email criptografado e token também.
- Abaixo estão as telas do aplicativo.
- 

<div>
<img src="./assets/home.png" width="150">
<img src="./assets/cadastro.png" width="150">
<img src="./assets/login.png" width="150">
<img src="./assets/restaurantes.png" width="150">
<img src="./assets/cardapio.png" width="150">
</div>
<div>
<img src="./assets/detalhe-cardapio.png" width="150">
<img src="./assets/pesquisa.png" width="150">
<img src="./assets/pedidos.png" width="150">
<img src="./assets/perfil.png" width="150">
</div>




## 🧪 Tecnologias

<div>
<img src="./assets/node.png" width="50">
<img src="./assets/express.png" width="50">
<img src="./assets/react.png" width="50">
<img src="./assets/javascript.png" width="50">
<img src="./assets/mongo.png" width="50">
<img src="./assets/jwt.png" width="50">
<img src="./assets/swagger.png" width="100">
</div>


- <a href="https://nodejs.org/en/" target="_blank">Node</a>
- <a href="https://expressjs.com/pt-br/" target="_blank">Express</a>
- <a href="https://reactnative.dev/" target="_blank">React-native</a>
- <a href="https://www.javascript.com/" target="_blank">Javascript</a>
- <a href="https://www.mongodb.com/" target="_blank">MongoDB</a>
- <a href="https://www.md5hashgenerator.com/" target="_blank">MD5</a>
- <a href="https://jwt.io/" target="_blank">JWT</a>
- <a href="https://axios-http.com/ptbr/docs/intro" target="_blank">Axios</a>
- <a href="https://dashboard.render.com/" target="_blank">Render</a>
  



O projeto pode ser clonado e executado localmente.



## ✨ Autor

Feito com amor por **Diego Henrique Ferreira Celestino** seguindo o desafio técnico.
Entre em contato!

[![Github Badge](https://img.shields.io/badge/-Github-000?style=flat-square&logo=Github&logoColor=white&link=link_do_seu_perfil_no_github)](https://github.com/diegohfcelestino)
[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/diego-ferreira-34b6348b/)](https://www.linkedin.com/in/diegohfcelestino/)
[![Whatsapp Badge](https://img.shields.io/badge/-Whatsapp-4CA143?style=flat-square&labelColor=4CA143&logo=whatsapp&logoColor=white&link=https://api.whatsapp.com/send?phone=+5516991187434&text=Hello!)](https://api.whatsapp.com/send?phone=+5516993535938&text=Hello!)
[![Gmail Badge](https://img.shields.io/badge/-Gmail-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:diegohfcelestino@gmail.com)](mailto:diegohfcelestino@gmail.com)
