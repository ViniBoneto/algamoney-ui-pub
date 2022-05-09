import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ErrorHandlerService } from './error-handler.service';
import { AuthService } from '../shared/auth.service';
import { NavbarComponent } from './navbar/navbar.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';

/* 17.4. Adicionando filtro por datas na pesquisa de lançamentos:
  Adição do DatePipe: Usando o  pipe DatePipe, nativo do Angular, p/ format dts no serv DateService.
  O DatePipe deve ser adicionado como provider no CoreModule. Como este pipe trabalha com as definições
  de localização, é necessário configurá-las também para que funcionem corretamente. */
registerLocaleData(localePt, "pt-BR");

// 17.12. Criando um serviço de tratamento de erros:
//   P/ melhor organizarmos a app, moveremos do AppModule p/ o CoreModule a func fábrica HttpLoaderFactory().
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

/* 14.11. Desafio: criando o Core Module:
  Um mód core (core module) duma app NG é um mód q ñ é criado nem p/ agrupar comps por funcionalidades
  (feature modules) e nem p/ ser um mód compartilhado p/ outros móds (shared modules). Ele é basicamente
  um mód p/ agrupar funcs centrais da app NG, usadas pelo comp raiz desta (AppModule). C/ isto, limpa-se
  o mód raiz, p/ ficar apenas c/ o comp incial (AppComponent), deixando a app melhor organizada.

  Nesta app criaremos um core module chamado CoreModule, q conterá o comp de barra de menu (NavbarComponent),
  q será retirado do mód raiz. */
@NgModule({
  declarations: [NavbarComponent, PaginaNaoEncontradaComponent],
  imports: [
    CommonModule,
    // 18.3. Navegando com Router Link:
    //   É preciso importar o mód de roteamento p/ a dir routerLink funcionar no comp de nav.
    RouterModule,

    /* 17.12. Criando um serviço de tratamento de erros:
    Criamos um serv de tratamento de erros, p/ concentrar e padronizar o tratamento de erros da app. Este
    serv será criado e provido no mód Core, q é parte e uma extensão do AppModule (mód raiz), pois pode apenas
    ser importado p/ este. Este é um design de app recomendado no guia de estilo da documentação do NG.

    P/ melhor organizarmos a app, tb moveremos do AppModule p/ o CoreModule os seguintes móds: ToastModule,
    ConfirmDialogModule, TranslateModule. Tb os provedores de serv: MessageService, ConfirmationService, LOCALE_ID
    (na vdd, este já tinha uma cópia no CoreModule, apenas removi do mód raiz) e TranslateService. */
    ToastModule,
    ConfirmDialogModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
/* 17.12. Criando um serviço de tratamento de erros:
    Devemos exportar os móds de msg (toast) e caixa de confirm, pois agora eles foram movidos p/ o mód
    core, a partir do mód raiz (AppModule), porém ainda serão referenciados p/ este último. */
    ToastModule,
    ConfirmDialogModule,

    NavbarComponent
  ],
  providers: [
/*  17.4. Adicionando filtro por datas na pesquisa de lançamentos:
      Adição do DatePipe: O DatePipe do Angular deve ser adicionado como provider no CoreModule. Como este pipe
      trabalha com as definições de localização, é necessário configurá-las também para que funcionem corretamente. */
    DatePipe,
    // 18.12. Definindo o título da página dinamicamente:
    //   Importo o serv Title, p/ manipulação do título das págs, no mód core, pois ele será usado em td a app.
    Title,
    {provide: LOCALE_ID, useValue: "pt-BR"},

    MessageService,
    ConfirmationService,
    TranslateService,

    ErrorHandlerService,
    // 19.4. Implementando o serviço de autenticação com OAuth 2
    //   Registra cls de serv p/ auth usando OAuth 2 na lst de providers do mód core.
    AuthService
  ]
})
export class CoreModule { }
