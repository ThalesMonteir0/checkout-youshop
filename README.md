# Projeto de Teste Técnico - Tela de checkout DeepSpaceStore

Este é um projeto desenvolvido como parte de um teste técnico. O projeto consiste em criar uma sequencia de telas de formulário para a simulação de uma compra em telas de checkout.

## Tecnologias Utilizadas
- [Vuejs]: Framework progressivo utlizado para criação de SPA. 
- [VUEX]: Biblioteca para gerenciamento de estado, Utilizei nesse projeto para centralizar o estado entre os componentes e sendo assim tendo uma maior facilidade e dinamismo para o compartilhamento de estados entre toda a aplicação
- [Vuetify]: Biblioteca de componentes UX/UI baseado no materialDesign. Utilizado para construir toda a parte visual da aplicação, obtendo uma maior facilidade no desenvolvimento e rapidez.
- [Vue-router]: Biblioteca oficial de roteamento para aplicativos Vue.js, ele permite a navegação entre diferentes partes da aplicação. Utilizado para fazer a navegação entre paginas.
- [Mock-Service-Worker]: Biblioteca que permite simular uma API em um ambiente de desenvolvimento. Utilizado para mockar e simular uma api RESTFULL onde foi feitas requisições GET e POST.
- [Jest]: Framework para testes em javascript. Utilizado para fazer um teste unitario (testando a função de validar cpf) 

## Instalação
- Clone o repositório
- navegue até o diretorio do projeto
- execute "npm install" para baixar todas as dependencias
- execute npx msw init .\public\ para inicializar a primeira vez o msw (caso nescessario)
- rode o projeto com npm run dev 
- acesse http://localhost:3000/1
- rodar os testes -> npx jest

## Telas 
![Tela Formulário dados do cliente](src/assets/mocksScreens/formDataClient.png)
![Tela Formulário dados de pagamento](src/assets/mocksScreens/formDataPayment.png)
![Tela Formulário dados de pagamento com cartão](src/assets/mocksScreens/formDataPaymentCard.png)
![Tela de Sucesso com boleto](src/assets/mocksScreens/sucessBoleto.png)
![Tela de sucesso com cartão](src/assets/mocksScreens/sucessCard.png)
![Tela de sucesso com pix](src/assets/mocksScreens/sucessPix.png)


