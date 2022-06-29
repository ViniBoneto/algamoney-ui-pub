/* 20.3. Respondendo requisições com Node.js e Express:
  Vamos servir a app gerada c/ o cmd "ng build", no dir /dist, num servidor HTTP, usando Node e o framework
    de webapp Express (https://expressjs.com/), q já vem com o NG CLI. */

// Importamos o framework JS p/ servidor web Express, já vindo c/ o proj.
const express = require("express");
// Chamamdos a func importada do express q vai nos retornar uma app servidora web, na qual podemos invocar alguns
//   métodos p/ controlar nosso servidor.
const app = express();
// A chamada abaixo configura o servidor p/ servir arqs estáticos (.js, .html. css, imgs, etc...) na pasta /dist.
//  a var __dirname aramazena dinamicamente o dir corrente (no caso, a raiz do proj).
app.use(express.static( __dirname + "/dist/algamoney-ui"));
/* Quando invocamos uma URL como "localhost:4200/lancamentos" ou "localhost:4200/pessoas", fazemos uma req GET no
  servidor HTTP, onde está servido nosso cód frontend (a app NG). Abaixo, vamos configurar a app servidora Express
  a mapear tds as reqs GET, q ñ forem p/ recursos estáticos específicos (já servidos acima), p/ uma func tratadora
  q vai retornar o arq index.html. Como a app NG é uma single page app, só precisamos do arq index, onde serão
  renderizadas tds as telas da app. */
app.get("/*", function(req, res) {
  res.sendFile( __dirname + "/dist/algamoney-ui/index.html");
});
// Passa a aguardar ("ouvir") p/ conexões na porta 4200 (porta padrão ng cli).
// app.listen(4200);

/* 20.4. Fazendo deploy em produção no Heroku:
  Até agora estávamos ouvindo fixamente na porta 4200 (padrão do NG CLI). Porém, ao subir nossa app em seu amb, o
    Heroku atribui dinamicamente uma porta a nossa app, armazenada na var de amb PORT. Agora, vamos 1º tentar obter
    a porta nesta var de amb (q sempre será válida no Heroku) e, caso esta ñ esteja definida, atribuiremos a porta
    padrão 4200. */
app.listen(process.env.PORT || 4200);

/* 20.4. Fazendo deploy em produção no Heroku:
  Configuração do package.json - Próximas alts são no arq package.json mas estão comentadas aqui, pq ñ é possível inserir coments em arqs .json:

    Seção scripts contém scripts q serão executados pelo build do Heroku, cuja ordem e/ou momento de exec é def pela
      chave/gatilho associada ao script. Então, vamos inserir a chave/gatilho "postinstall", c/ o script q será executado
      após a instalação das depends e antes a inicialização da app e, vamos associar a ela o nosso cmd de build "ng build --prod".
      Vamos alterar tb a chave/gatilho "start", usada pelo Heroku p/ iniciar a app do padrão "ng serve" p/ o cmd q inicia
      nosso servidor Node/Express "node server.js".

    Vamos copiar as depends do amb de dev (devDependencies) p/ o amb de prod (dependencies), pois o Heroku apenas olha e inclui
      as depends do 2º e ñ do 1º. Como vamos executar o build de nossa app (cmd "ng build --prod") no Heroku, precisamos tb
      instalar as depends de dev lá.

    Inserimos tb uma seção "engines", sinalizando as versões do Node e npm q usamos no amb de dev, p/ q as usadas em prod sejam as
      msms (uma boa prática de prog).

    Obs:
      A única diferença que teremos nessa aula, é o nome da propriedade que o heroku utilizará para fazer o build. Na aula
        utilizamos a propriedade "postinstall", dessa vez precisamos apenas renomear para "heroku-postbuild". */
