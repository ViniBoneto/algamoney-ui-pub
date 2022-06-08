import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { MoneyHttpInterceptor } from './money-http.interceptor';
import { AuthGuard } from './auth.guard';

/* 19.7. Adicionando o Access Token nas chamadas HTTP:

  Configurações @auth0/angular-jwt

    Nessa versão da biblioteca de JWT, a integração com o componente HttpClient se dá de forma muito transparente,
      não sendo necessário utilizarmos mais o Wrapper citado na aula.

    Porém, precisamos especificar de onde será obtido o valor do nosso token, mesmo que estivermos seguindo o padrão
      de salvá-lo no localStorage como "token".

    Para isso, precisaremos, no seguranca.module.ts, adicionar algumas configurações (das que já iniciamos em aulas
      anteriores).

    Declarar uma função para obter o token:
      Definimos, no início do nosso arquivo de módulo, uma função que irá retornar o token, ela não recebe argumentos
        e retorna uma string. */
export function tokenGetter(): string | null {
  return localStorage.getItem('token');
}

/* 19.3. Desafio: módulo de segurança e protótipo da tela de login:
  Criando mód de seg c/ mód aux de roteamento (ambos seguindo padrão de como já feito na app) e protótipo
  de tela de login. */
@NgModule({
  declarations: [
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    // Mód p/ templs direcionado à forms (template-driven forms) em NG. Ex: ngForm, ngModel...
    FormsModule,

    // Mód p/ usar o comp PNG p-button ou a dir PNG pButton
    ButtonModule,
    // Mód p/ usar a dir PNG pInputText
    InputTextModule,
/*  19.5. Decodificando o JWT e armazenando no Local Storage:

      Dependência angular2-jwt:
        A dependência que precisaremos instalar em nosso projeto mudou, pois a versão utilizada na aula não é
          compatível com o módulo HttpClient. Instala-se o utlitário angular-jwt p/ se manusear e decodificar
          o token JWT:
          npm install --save @auth0/angular-jwt

      JwtModule e JwtHelperService:
        Precisamos também, no arquivo seguranca.module.ts, importar o JwtModule e adicionar nos providers o
        JwtHelperService. O JwtModule requer uma configuração adicional. */
    JwtModule.forRoot({
      config: {
/*      O tokenGetter é uma função que retornará o token do usuário. Essa função simplesmente precisa fazer
          uma chamada de recuperação para onde quer que o token esteja armazenado. Em muitos casos, o token
          será armazenado em armazenamento local ou armazenamento de sessão.

        Como, em nosso caso, o token será obtido direto do corpo de resp da req, ñ é necessário retornar token
          p/ aqui. Logo, retornarei str vazia. */
        // tokenGetter: () => {
        //   return '';
        // }

/*     19.7. Adicionando o Access Token nas chamadas HTTP:

          Declarar uma função para obter o token:
            Agora declaramos a função que irá retornar o token nas propriedades de configuração do JwtModule.

          Quais URLs interceptar?
            Para que funcione a interceptação das requisições, e para que seja adicionado o token nos Headers,
              precisamos informar quais URLs devemos interceptar, e quais devemos ignorar. Com isso, indicamos
              que no domínio "localhost:8080", todas as requisições serão interceptadas e o token será adicionado.
              Já para "http://localhost:8080/oauth/token" não ocorrerá nenhuma interceptação, pois neste endpoint,
              não utilizamos o token armazenado, e sim a autenticação básica, como vimos em aulas anteriores. */
        tokenGetter,
        allowedDomains: ['localhost:8080'],
        disallowedRoutes: ['http://localhost:8080/oauth/token']
      }
    }),

    // Mód de roteamento atrelado ao mód de seg
    SegurancaRoutingModule
  ],
/* 19.5. Decodificando o JWT e armazenando no Local Storage:
    JwtModule e JwtHelperService:
      Precisamos também, no arquivo seguranca.module.ts, importar o JwtModule e adicionar nos providers o
        JwtHelperService. O JwtModule requer uma configuração adicional. */
  providers: [
    JwtHelperService,

/*  19.11. Interceptando chamadas HTTP para tratar a expiração do access token:
      Declarando o interceptador:
        Para que o interceptador seja reconhecido por nossa aplicação, precisamos declará-lo na seção de
          Providers. Vamos adicioná-lo no módulo segurança: */
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MoneyHttpInterceptor,
      multi: true
    },

    // 19.13. Protegendo rotas com guarda de rotas (CanActivate):
    //   Inserindo a guarda de rotas como um dos servs injetáveis providos pelo mód de segurança.
    AuthGuard
  ]
})
export class SegurancaModule { }
