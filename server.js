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
app.listen(4200);
