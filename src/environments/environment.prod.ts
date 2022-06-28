export const environment = {
  production: true,
/* 20.1. Configurando a aplicação com environment do Angular CLI:
    P/ ñ ficar c/ as URLS dos endpoints do backend "hard coded" e tendo q alterar manualmente entre os dif
      ambientes de exec (dev, prod, etc), vamos aproveitar a funcionalidade q o ng cli já tem, de separação
      de dif ambientes: as props do ambiente padrão (dev) ficam no arq src/environments/environment.ts, enquanto
      as do ambiente de prod ficam no arq src/environments/environment.prod.ts.

    P/ tornar a origem (prot + domínio + porta) dos endpoints do backend dinâmica, registramo-la numa prop de
      ambiente, com os respectivos vals em cada ambiente, e usamos esta prop no cód.

    Configurações das variáveis de ambiente de segurança:
      Além de configurar as variáveis production e apiUrl no arquivo environment, também é necessário configurar
        algumas variáveis relacionadas ao método de autenticação via Token.

      Para isso adicione as variáveis tokenAllowedDomains e tokenDisallowedRoutes nos arquivos de Enviroment.

    Obs: P/ padrão o amb de dev é usado (props do arq de dev). P/ usar o amb de prod (props deste arq), deve-se
      usar o cmd: `ng build --env=prod`.

  20.2. Fazendo build para o ambiente de produção:
    1. Utilizando environment de produção
      Se tentarmos utilizar o comando mostrado na aula iremos nos deparar com um erro:
        $ ng build --environment=prod
        Unknown option: '--environment'
      Isso se dá pelo fato dessa opção ter sido alterada em versões mais recentes.Para resolvermos este problema
        devemos ajustar o comando, utilizando da seguinte forma:
        ng build --configuration=production

    P/ servirmos a app ng e testá-la, usamos o cmd "ng serve". Já p/ fazermos o build da app, gerando um pacote c/
      tds os assets dela, na past dist/, usamos o cmd "ng build". P/ padrão o cmd usa o amb de dev (environment.ts)
      p/ gerar a app. P/ usarmos o amb de prod (environment.prod.ts), devemos usar o cmd "ng build --configuration=production".

    Podemos otimizar o build da app, tornando-a menor e mais rápida. P/ isto, usamos a metaflag --prod (Ex: "ng build --prod")
      q, além de já imbutir a opt --configuration=production, tb utiliza o compilador AOT p/ otimizar a app. A compilação AOT
      já empacota o cód compilado p/ JS, em vez de empacotar o cód em TS e o compilador em si (e biblios associadas), p/ fazer
      a compilação no cliente em tempo de exec. O compilador AOT tb verifica biblios desnecessárias/ñ usadas, evitando q elas
      sejam empacotadas.

    Obs: Após gerada e empacotada, a app está pronta p/ ser provida em qq servidor HTTP (Apache, Tomcat, IIS, Nodejs, etc...).  */
  // apiUrl: "https://vineto-algamoney-api.herokuapp.com",
  // tokenAllowedDomains: [  /vineto-algamoney-api\.herokuapp\.com/ ],
  tokenDisallowedRoutes: [/\/oauth\/token/],

/* 20.3. Respondendo requisições com Node.js e Express:
    Vamos servir a app gerada c/ o cmd "ng build", no dir /dist, num servidor HTTP, usando Node e o framework de webapp Express
      (https://expressjs.com/), q já vem com o NG CLI.

    P/ poder testar a app c/ configs de prod, em nossa máquina local, antes de subí-la p/ amb de prod propriamente dito, alteramos
      temporariamente a prop apiURL p/ o end local (http://localhost:8080). Qdo formos realmente subir a app p/ prod, voltaremo-la
      ao val anterior (https://vineto-algamoney-api.herokuapp.com). */
  apiUrl: "http://localhost:8080",
  tokenAllowedDomains: [  /localhost:8080/ ]
};
