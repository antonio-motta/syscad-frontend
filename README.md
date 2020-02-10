<img src="https://talentosit.com.br/assets/img/logo-full.png" width="200" /> <br>

![][samaiait-logo]

***
# SysCad - System Cadastre
### [Desafio Técnico - Samaia IT] 
Projeto backend do Sistema de cadastro de pessoas fisicas desenvolvido como parte do processo seletivo da [Saimaia IT][samaiait-uri] para Desenvolvedor Java mediado pela [Talentos IT][talentosit-uri].


## Desafio:

* Criar um CRUD que mantenha o cadastro de uma Pessoa Física com os campos:

```
Id(auto incremento)
Nome
CPF(com validação de CPF)
E-mail
Data de Nascimento
Data do cadastro (campo interno de sistema preenchido automaticamente com a data
atual no momento da inclusão)
Lista de Endereços
-Logradouro
-CEP
-Bairro
-Cidade
-UF
Lista de Telefones
-Telefone (com máscara e validação de 8 e 9 dígitos no telefone)
```
* Para camada de persistência podem ser utilizadas as linguagens (Java, NodeJS ou Python)
* para o Front-end Angular, Vue ou React. A escolha das linguagens fica a seu critério.
* É obrigatório usar a arquitetura de microsserviços e conceito de Single Page Application.
* É desejável que a solução seja entregue funcionando no Docker.

Também devem ser entregues:
1. Script de banco de dados para criação de tabelas
2. Todo código fonte produzido no GitHub, o qual será avaliado quanto a sua clareza,
objetividade e padrões seguidos desde a arquitetura, escrita de código e usabilidade pelo
usuário final.
3. Documentação para execução do código produzido.

## Instruções

* [Instrunções][getting-started];
* [Histórico de realease][changelog];

## Licença

Este projeto esta licenciado com sob licença [MIT][license-mit] - acesse o arquivo [LICENSE][license-project]  para obter detalhes.

[samaiait-uri]: <http://expressjs.comhttps://samaiait.com.br/>
[samaiait-logo]: <https://samaiait.com.br/site/wp-content/themes/samaiait/assets/images/logo-samaia-black.svg>
[talentosit-uri]: <https://talentosit.com.br/>
[getting-started]: <https://github.com/antonio-motta/syscad-backend/wiki>
[license-mit]: <https://opensource.org/licenses/MIT>
[license-project]: <blob/master/LICENSE>
[changelog]:<https://github.com/antonio-motta/syscad-frontend/releases>
