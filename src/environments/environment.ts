// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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

    Obs: P/ padrão o amb de dev é usado (props deste arq). P/ usar o amb de prod (props do arq de prod), deve-se
      usar o cmd: `ng build --env=prod`. */
  apiUrl: "http://localhost:8080",
  tokenAllowedDomains: [  /localhost:8080/ ],
  tokenDisallowedRoutes: [/\/oauth\/token/]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
