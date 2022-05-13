import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';


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
        tokenGetter: () => {
          return '';
        }
      }
    }),

    // Mód de roteamento atrelado ao mód de seg
    SegurancaRoutingModule
  ],
/* 19.5. Decodificando o JWT e armazenando no Local Storage:
    JwtModule e JwtHelperService:
      Precisamos também, no arquivo seguranca.module.ts, importar o JwtModule e adicionar nos providers o
        JwtHelperService. O JwtModule requer uma configuração adicional. */
  providers: [JwtHelperService]
})
export class SegurancaModule { }
