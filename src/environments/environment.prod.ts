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
      usar o cmd: `ng build --env=prod`. */
  apiUrl: "https://vineto-algamoney-api.herokuapp.com",
  tokenAllowedDomains: [  /vineto-algamoney-api\.herokuapp\.com/ ],
  tokenDisallowedRoutes: [/\/oauth\/token/]
};
