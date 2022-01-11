import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt'

import { NavbarComponent } from './navbar/navbar.component';

/* 17.4. Adicionando filtro por datas na pesquisa de lançamentos:
  Adição do DatePipe: Usando o  pipe DatePipe, nativo do Angular, p/ format dts no serv DateService.
  O DatePipe deve ser adicionado como provider no CoreModule. Como este pipe trabalha com as definições
  de localização, é necessário configurá-las também para que funcionem corretamente. */
registerLocaleData(localePt, "pt-BR");

/* 14.11. Desafio: criando o Core Module:
  Um mód core (core module) duma app NG é um mód q ñ é criado nem p/ agrupar comps por funcionalidades
  (feature modules) e nem p/ ser um mód compartilhado p/ outros móds (shared modules). Ele é basicamente
  um mód p/ agrupar funcs centrais da app NG, usadas pelo comp raiz desta (AppModule). C/ isto, limpa-se
  o mód raiz, p/ ficar apenas c/ o comp incial (AppComponent), deixando a app melhor organizada.

  Nesta app criaremos um core module chamado CoreModule, q conterá o comp de barra de menu (NavbarComponent),
  q será retirado do mód raiz. */
@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule
  ],
  exports: [NavbarComponent],
  providers: [
/*  17.4. Adicionando filtro por datas na pesquisa de lançamentos:
      Adição do DatePipe: O DatePipe do Angular deve ser adicionado como provider no CoreModule. Como este pipe
      trabalha com as definições de localização, é necessário configurá-las também para que funcionem corretamente. */
    DatePipe,
    {provide: LOCALE_ID, useValue: "pt-BR"}
  ]
})
export class CoreModule { }
